const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

module.exports = async (req, res) => {
  // Polyfill for res.status / res.json
  if (!res.status) res.status = function(code) { this.statusCode = code; return this; };
  if (!res.json) res.json = function(data) {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(data));
    return this;
  };

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const projectId = (req.query?.project_id || req.body?.project_id || 'fitgum').toLowerCase().trim();

  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // 1. Fetch project BotAPI configuration
    const projRes = await client.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    if (projRes.rows.length === 0) {
      await client.end();
      return res.status(404).json({ success: false, error: `Dự án '${projectId}' không tồn tại` });
    }
    const project = projRes.rows[0];

    let taggedSuccessCount = 0;
    let taggedDemandCount = 0;
    const errors = [];

    const defaultPageId = (project.smax_page_pid || '').split(',')[0].trim();

    // 2. TAG THÀNH CÔNG (CHỐT ĐƠN)
    // Chỉ chọn những đơn đã chốt và CHƯA TỪNG gắn tag (tagged_success_at IS NULL)
    if (project.botapi_success_url && project.botapi_success_token) {
      const successLeads = await client.query(`
        SELECT id, tid, customer_name, phone, order_details, order_combo, order_amount
        FROM leads
        WHERE project_id = $1 
          AND conversation_result = 'Đã chốt đơn'
          AND tagged_success_at IS NULL
      `, [projectId]);

      for (const l of successLeads.rows) {
        try {
          const customerObj = { id: l.tid, page_id: defaultPageId };
          const attrsObj = [
            { name: 'order_status', value: 'Thành công' },
            { name: 'thong_tin_chot_don', value: String(l.order_details || l.order_combo || 'Đã chốt đơn').slice(0, 100) },
            { name: 'nhu_cau_chinh', value: 'Chốt đơn thành công' }
          ];

          const targetUrl = project.botapi_success_url +
            '?customer=' + encodeURIComponent(JSON.stringify(customerObj)) +
            '&attrs=' + encodeURIComponent(JSON.stringify(attrsObj)) +
            '&access_token=' + project.botapi_success_token;

          const r = await fetch(targetUrl);
          if (r.ok) {
            taggedSuccessCount++;
            // Mark as tagged atomically in Neon
            await client.query(`
              UPDATE leads 
              SET tagged_success_at = NOW(),
                  tags = (COALESCE(tags, '[]'::jsonb) || '["Thành công"]'::jsonb)
              WHERE id = $1
            `, [l.id]);
          } else {
            errors.push(`BotAPI Success failed for ${l.tid}: HTTP ${r.status}`);
          }
        } catch (e) {
          errors.push(`Error tagging success ${l.tid}: ${e.message}`);
        }
      }
    }

    // 3. TAG CÓ NHU CẦU (TIỀM NĂNG CAO)
    // Chỉ chọn khách gửi >= 3 tin, có nhu cầu cao, CHƯA TỪNG gắn tag nhu cầu VÀ CHƯA TỪNG gắn tag thành công
    if (project.botapi_demand_url && project.botapi_demand_token) {
      const demandLeads = await client.query(`
        SELECT id, tid, customer_name, phone, main_intent, customer_messages
        FROM leads
        WHERE project_id = $1 
          AND conversation_result = 'Có nhu cầu'
          AND customer_messages >= 3
          AND tagged_demand_at IS NULL
          AND tagged_success_at IS NULL
      `, [projectId]);

      for (const l of demandLeads.rows) {
        try {
          const customerObj = { id: l.tid, page_id: defaultPageId };
          const attrsObj = [
            { name: 'nhu_cau_chinh', value: String(l.main_intent || 'Tìm hiểu combo').slice(0, 80) },
            { name: 'so_tin_nhan_kh', value: String(l.customer_messages || 3) },
            { name: 'danh_gia_tiem_nang', value: 'CAO' }
          ];

          const targetUrl = project.botapi_demand_url +
            '?customer=' + encodeURIComponent(JSON.stringify(customerObj)) +
            '&attrs=' + encodeURIComponent(JSON.stringify(attrsObj)) +
            '&access_token=' + project.botapi_demand_token;

          const r = await fetch(targetUrl);
          if (r.ok) {
            taggedDemandCount++;
            // Mark as tagged atomically in Neon
            await client.query(`
              UPDATE leads 
              SET tagged_demand_at = NOW(),
                  tags = (COALESCE(tags, '[]'::jsonb) || '["Có nhu cầu"]'::jsonb)
              WHERE id = $1
            `, [l.id]);
          } else {
            errors.push(`BotAPI Demand failed for ${l.tid}: HTTP ${r.status}`);
          }
        } catch (e) {
          errors.push(`Error tagging demand ${l.tid}: ${e.message}`);
        }
      }
    }

    // 4. Get stats of already tagged leads (Protected from duplicate calls)
    const statsRes = await client.query(`
      SELECT 
        COUNT(CASE WHEN tagged_success_at IS NOT NULL THEN 1 END)::int as total_tagged_success,
        COUNT(CASE WHEN tagged_demand_at IS NOT NULL THEN 1 END)::int as total_tagged_demand,
        COUNT(*)::int as total_leads
      FROM leads
      WHERE project_id = $1
    `, [projectId]);

    const stats = statsRes.rows[0];

    await client.end();

    return res.status(200).json({
      success: true,
      projectId,
      taggedThisRun: {
        success: taggedSuccessCount,
        demand: taggedDemandCount
      },
      cumulativeTaggedInDb: {
        totalSuccess: stats.total_tagged_success,
        totalDemand: stats.total_tagged_demand,
        totalLeads: stats.total_leads
      },
      idempotencyNote: 'Tất cả các hội thoại đã gắn tag đều có timestamp trong Neon và được bỏ qua 100% trong các lần quét tiếp theo.',
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    if (client) {
      try { await client.end(); } catch (e) {}
    }
    console.error('BotAPI Tagger Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
