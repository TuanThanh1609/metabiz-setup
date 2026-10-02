const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

// Standard 7 Funnel Steps definition for WhatsApp Sales Funnel
const FUNNEL_STEPS_METADATA = [
  {
    num: 1,
    name: 'Step 1: Tiếp cận & Chào mừng',
    short: '1. Chào mừng',
    objective: 'Thu hút khách hàng từ Ad, kích hoạt nút bấm nhu cầu (concern-buttons)',
    bottleneckAction: 'Kiểm tra tốc độ phản hồi tin chào (< 3s) và tối ưu hóa 3 nút chọn tình trạng vóc dáng.',
    color: 'slate'
  },
  {
    num: 2,
    name: 'Step 2: Tư vấn vóc dáng & USP',
    short: '2. Tư vấn & USP',
    objective: 'Đồng cảm vóc dáng, giải thích cơ chế chiết xuất quả Acai Berry tự nhiên',
    bottleneckAction: 'Giữ tin nhắn dưới 50 từ/tin, gửi ảnh USP trực quan để tăng độ tin cậy.',
    color: 'purple'
  },
  {
    num: 3,
    name: 'Step 3: Bằng chứng xã hội',
    short: '3. Review/Proof',
    objective: 'Cung cấp feedback, review thực tế từ khách hàng đã giảm cân an toàn',
    bottleneckAction: 'Tự động gửi ảnh review khách hàng người thật việc thật sau khi khách chia sẻ số cân cần giảm.',
    color: 'indigo'
  },
  {
    num: 4,
    name: 'Step 4: Báo giá & Combo',
    short: '4. Báo giá Combo',
    objective: 'Báo giá 3 gói Decoy Pricing: Gói dùng thử, Combo khuyên dùng (tặng quà) và Combo chuyên sâu',
    bottleneckAction: 'Giới hạn tin nhắn báo giá dưới 80 từ, làm nổi bật gói giữa (Best Value) kèm đồng hồ khẩn cấp 2h.',
    color: 'blue'
  },
  {
    num: 5,
    name: 'Step 5: Xử lý từ chối',
    short: '5. Xử lý từ chối',
    objective: 'Hóa giải lo ngại đắt, sợ tác dụng phụ, hoặc khôi phục khách im lặng sau báo giá',
    bottleneckAction: 'Chia nhỏ chi phí (ví dụ: chỉ 6 RM/ngày), nhắc lại chính sách quà tặng giới hạn và cam kết an toàn.',
    color: 'amber'
  },
  {
    num: 6,
    name: 'Step 6: Thu thập địa chỉ COD',
    short: '6. Thu thập COD',
    objective: 'Thu thập Họ tên, SĐT, Địa chỉ giao hàng và củng cố 3 Cam Kết Vàng COD',
    bottleneckAction: 'TUYỆT ĐỐI KHÔNG UPSELL khi khách đã chọn gói. Nhắc cam kết: Nhận hàng kiểm tra thoải mái rồi mới trả tiền.',
    color: 'teal'
  },
  {
    num: 7,
    name: 'Step 7: Chốt đơn thành công',
    short: '7. Chốt đơn COD',
    objective: 'Xác nhận đơn hàng thành công, kích hoạt BotAPI gắn tag Thành công và chuyển giao vận chuyển',
    bottleneckAction: 'Gửi tin nhắn xác nhận lịch giao hàng dự kiến 2-3 ngày và dặn khách chú ý số lạ shipper gọi.',
    color: 'emerald'
  }
];

module.exports = async (req, res) => {
  // Ensure res.status and res.json exist for standard Node http compatibility
  if (!res.status) {
    res.status = function(code) { this.statusCode = code; return this; };
  }
  if (!res.json) {
    res.json = function(data) {
      this.setHeader('Content-Type', 'application/json');
      this.end(JSON.stringify(data));
      return this;
    };
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const projectId = (req.query?.project_id || req.body?.project_id || 'fitgum').toLowerCase().trim();
  const pin = (req.query?.pin || req.body?.pin || '').trim();
  const statusFilter = (req.query?.status || 'all').trim();
  const searchKeyword = (req.query?.search || '').trim().toLowerCase();
  const sortBy = (req.query?.sort_by || 'last_msg_desc').trim();
  const adIdFilter = (req.query?.ad_id || '').trim();
  const funnelStepFilter = req.query?.funnel_step ? parseInt(req.query.funnel_step, 10) : null;

  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // 1. Check Project & Verify PIN
    const projectRes = await client.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    if (projectRes.rows.length === 0) {
      await client.end();
      return res.status(404).json({ success: false, error: `Dự án '${projectId}' không tồn tại.` });
    }
    const project = projectRes.rows[0];

    // Verify PIN if required
    if (project.access_pin && project.access_pin !== pin) {
      await client.end();
      return res.status(401).json({
        success: false,
        error: 'Mã PIN bảo mật không chính xác. Vui lòng thử lại.',
        needPin: true,
        projectName: project.name
      });
    }

    // 2. Fetch KPI Statistics for Project
    const kpiSql = `
      SELECT
        COUNT(*) as total_leads,
        COUNT(CASE WHEN conversation_result = 'Đã chốt đơn' THEN 1 END) as closed_orders,
        COALESCE(SUM(CASE WHEN conversation_result = 'Đã chốt đơn' THEN order_amount ELSE 0 END), 0) as total_revenue,
        COUNT(CASE WHEN conversation_result = 'Có nhu cầu' THEN 1 END) as hot_leads,
        COUNT(CASE WHEN conversation_result = 'Đang tư vấn' THEN 1 END) as consulting_leads,
        COUNT(CASE WHEN conversation_result = 'Chưa phản hồi' THEN 1 END) as no_response_leads
      FROM leads
      WHERE project_id = $1;
    `;
    const kpiRes = await client.query(kpiSql, [projectId]);
    const kpi = kpiRes.rows[0];

    // 3. Fetch Daily Aggregation (Mốc Lần đầu nhắn tin)
    const tz = project.id === 'abera' ? 'Asia/Jakarta' : 'Asia/Kuala_Lumpur';
    const dailySql = `
      SELECT 
        TO_CHAR(first_msg_at AT TIME ZONE '${tz}', 'YYYY-MM-DD') as day,
        COUNT(*)::int as total,
        COUNT(CASE WHEN conversation_result = 'Đang tư vấn' THEN 1 END)::int as consulting,
        COUNT(CASE WHEN conversation_result = 'Có nhu cầu' THEN 1 END)::int as hot,
        COUNT(CASE WHEN conversation_result = 'Đã chốt đơn' THEN 1 END)::int as closed
      FROM leads
      WHERE project_id = $1 AND first_msg_at IS NOT NULL
      GROUP BY day
      ORDER BY day ASC;
    `;
    const dailyRes = await client.query(dailySql, [projectId]);
    const dailyStats = dailyRes.rows;

    // 4. Fetch Funnel 7-Step Stats
    const funnelDbRes = await client.query(`
      SELECT 
        COALESCE(funnel_step_num, 1) as funnel_step_num,
        COALESCE(funnel_step, 'Step 1: Tiếp cận & Chào mừng') as funnel_step,
        COUNT(*)::int as count
      FROM leads
      WHERE project_id = $1
      GROUP BY funnel_step_num, funnel_step
      ORDER BY funnel_step_num ASC;
    `, [projectId]);

    const totalLeadsCount = parseInt(kpi.total_leads, 10) || 1;
    const funnelCountMap = {};
    funnelDbRes.rows.forEach(r => {
      funnelCountMap[r.funnel_step_num] = r.count;
    });

    const funnelStats = FUNNEL_STEPS_METADATA.map(stepMeta => {
      const count = funnelCountMap[stepMeta.num] || 0;
      const pct = Math.round((count / totalLeadsCount) * 1000) / 10;
      let obj = stepMeta.objective;
      let action = stepMeta.bottleneckAction;
      if (project.id === 'abera') {
        if (stepMeta.num === 2) {
          obj = 'Đồng cảm vấn đề nám da, tàn nhang, giải thích cơ chế thẩm thấu của Serum Abera';
          action = 'Giữ tin nhắn dưới 50 từ/tin, gửi ảnh phân tích da và chứng nhận BPOM để tạo niềm tin.';
        } else if (stepMeta.num === 3) {
          obj = 'Cung cấp feedback, review thực tế từ khách hàng đã cải thiện nám, sáng da';
          action = 'Tự động gửi ảnh review trước/sau và feedback chân thực của khách hàng đã mờ nám sau 2-4 tuần.';
        } else if (stepMeta.num === 4) {
          obj = 'Báo giá 3 gói: 1 Chai (179k), Combo 2 Tặng 1 (297k) và Combo 3 Tặng 1 (350k)';
          action = 'Làm nổi bật Combo 2 Tặng 1 (Best Seller) kèm ưu đãi Gratis Ongkir toàn Indonesia.';
        } else if (stepMeta.num === 5) {
          obj = 'Hóa giải lo ngại đắt, sợ không mờ nám, hoặc khôi phục khách im lặng sau báo giá';
          action = 'Chia nhỏ chi phí (khoảng 9.900 Rp/ngày), nhấn mạnh chính sách giao hàng COD kiểm tra trước khi trả tiền.';
        }
      }
      return {
        ...stepMeta,
        objective: obj,
        bottleneckAction: action,
        count: count,
        percentage: pct
      };
    });

    // Detect Biggest Bottleneck (Step with highest dropoff/leads stuck in non-closed stage)
    let bottleneckStep = funnelStats[3]; // default Step 4 (Pricing)
    let maxStuck = 0;
    funnelStats.forEach(s => {
      if (s.num >= 2 && s.num <= 5 && s.count > maxStuck) {
        maxStuck = s.count;
        bottleneckStep = s;
      }
    });

    // 5. Fetch Ads Campaign Breakdown Stats (Joined with meta_ads_insights)
    const adsRes = await client.query(`
      WITH lead_summary AS (
        SELECT 
          CASE WHEN ad_id IS NULL OR TRIM(ad_id) = '' THEN 'Organic / Direct' ELSE TRIM(ad_id) END as ad_id,
          COUNT(*)::int as total_leads,
          COUNT(CASE WHEN conversation_result = 'Đã chốt đơn' THEN 1 END)::int as closed_orders,
          COUNT(CASE WHEN conversation_result = 'Có nhu cầu' THEN 1 END)::int as hot_leads,
          COUNT(CASE WHEN conversation_result = 'Đang tư vấn' THEN 1 END)::int as consulting_leads,
          COUNT(CASE WHEN conversation_result = 'Chưa phản hồi' THEN 1 END)::int as no_response_leads,
          COALESCE(SUM(CASE WHEN conversation_result = 'Đã chốt đơn' THEN order_amount ELSE 0 END), 0)::float as revenue
        FROM leads
        WHERE project_id = $1
        GROUP BY CASE WHEN ad_id IS NULL OR TRIM(ad_id) = '' THEN 'Organic / Direct' ELSE TRIM(ad_id) END
      ),
      ads_summary AS (
        SELECT 
          TRIM(ad_id) as ad_id,
          MAX(ad_name) as ad_name,
          MAX(campaign_name) as campaign_name,
          MAX(adset_name) as adset_name,
          COALESCE(SUM(spend), 0)::float as total_spend,
          COALESCE(SUM(impressions), 0)::bigint as total_impressions,
          COALESCE(SUM(clicks), 0)::int as total_clicks,
          COALESCE(SUM(reach), 0)::bigint as total_reach,
          COALESCE(SUM(actions), 0)::float as total_actions,
          CASE WHEN SUM(clicks) > 0 THEN ROUND((SUM(spend) / SUM(clicks))::numeric, 2)::float ELSE 0 END as avg_cpc,
          CASE WHEN SUM(impressions) > 0 THEN ROUND(((SUM(spend) / SUM(impressions)) * 1000)::numeric, 2)::float ELSE 0 END as avg_cpm,
          CASE WHEN SUM(impressions) > 0 THEN ROUND(((SUM(clicks)::numeric / SUM(impressions)) * 100)::numeric, 2)::float ELSE 0 END as avg_ctr
        FROM meta_ads_insights
        WHERE project_id = $1 AND ad_id IS NOT NULL AND TRIM(ad_id) != ''
        GROUP BY TRIM(ad_id)
      )
      SELECT 
        COALESCE(l.ad_id, a.ad_id) as ad_id,
        COALESCE(a.ad_name, '') as ad_name,
        COALESCE(a.campaign_name, '') as campaign_name,
        COALESCE(a.adset_name, '') as adset_name,
        COALESCE(a.total_spend, 0)::float as spend,
        COALESCE(a.total_impressions, 0)::bigint as impressions,
        COALESCE(a.total_clicks, 0)::int as clicks,
        COALESCE(a.total_reach, 0)::bigint as reach,
        COALESCE(a.avg_cpc, 0)::float as cpc,
        COALESCE(a.avg_cpm, 0)::float as cpm,
        COALESCE(a.avg_ctr, 0)::float as ctr,
        COALESCE(l.total_leads, 0)::int as total_leads,
        COALESCE(l.closed_orders, 0)::int as closed_orders,
        COALESCE(l.hot_leads, 0)::int as hot_leads,
        COALESCE(l.consulting_leads, 0)::int as consulting_leads,
        COALESCE(l.no_response_leads, 0)::int as no_response_leads,
        COALESCE(l.revenue, 0)::float as revenue,
        CASE 
          WHEN COALESCE(l.total_leads, 0) > 0 THEN ROUND(((COALESCE(l.closed_orders, 0)::numeric / l.total_leads) * 100), 1)::float 
          ELSE 0 
        END as closing_rate,
        CASE 
          WHEN COALESCE(l.total_leads, 0) > 0 THEN ROUND(((COALESCE(l.hot_leads, 0)::numeric / l.total_leads) * 100), 1)::float 
          ELSE 0 
        END as hot_rate,
        CASE 
          WHEN COALESCE(l.total_leads, 0) > 0 AND COALESCE(a.total_spend, 0) > 0 
          THEN ROUND((a.total_spend / l.total_leads)::numeric, 2)::float 
          ELSE 0 
        END as cost_per_lead,
        CASE 
          WHEN COALESCE(l.closed_orders, 0) > 0 AND COALESCE(a.total_spend, 0) > 0 
          THEN ROUND((a.total_spend / l.closed_orders)::numeric, 2)::float 
          ELSE 0 
        END as cost_per_order,
        CASE 
          WHEN COALESCE(a.total_spend, 0) > 0 
          THEN ROUND((COALESCE(l.revenue, 0) / a.total_spend)::numeric, 2)::float 
          ELSE 0 
        END as roas
      FROM lead_summary l
      FULL OUTER JOIN ads_summary a ON l.ad_id = a.ad_id
      ORDER BY COALESCE(a.total_spend, 0) DESC, COALESCE(l.total_leads, 0) DESC;
    `, [projectId]);

    const adsCurrency = project.ads_currency || 'VND';
    const revCurrency = project.revenue_currency || project.currency || 'RM';
    const rateAdsToVnd = parseFloat(project.rate_ads_to_vnd) || 1.0;
    const rateRevToVnd = parseFloat(project.rate_rev_to_vnd) || 5900.0;

    let totalSpendRaw = 0;
    let totalAdRevenueRaw = 0;
    let totalSpendVnd = 0;
    let totalAdRevenueVnd = 0;
    let totalAdOrders = 0;
    let totalAdLeads = 0;
    let totalImpressions = 0;
    let totalClicks = 0;

    const adsStats = adsRes.rows.map(ad => {
      const spendRaw = parseFloat(ad.spend) || 0;
      const revRaw = parseFloat(ad.revenue) || 0;

      const spendVnd = Math.round(spendRaw * rateAdsToVnd);
      const revVnd = Math.round(revRaw * rateRevToVnd);

      totalSpendRaw += spendRaw;
      totalAdRevenueRaw += revRaw;
      totalSpendVnd += spendVnd;
      totalAdRevenueVnd += revVnd;

      totalAdOrders += ad.closed_orders || 0;
      totalAdLeads += ad.total_leads || 0;
      totalImpressions += parseInt(ad.impressions || 0, 10);
      totalClicks += parseInt(ad.clicks || 0, 10);

      // Normalized calculations in VND
      const roasVnd = spendVnd > 0 ? parseFloat((revVnd / spendVnd).toFixed(2)) : 0;
      const cpaVnd = ad.closed_orders > 0 ? Math.round(spendVnd / ad.closed_orders) : 0;
      const cplVnd = ad.total_leads > 0 ? Math.round(spendVnd / ad.total_leads) : 0;

      return {
        ...ad,
        spend_raw: spendRaw,
        revenue_raw: revRaw,
        spend_vnd: spendVnd,
        revenue_vnd: revVnd,
        roas_vnd: roasVnd,
        cost_per_order_vnd: cpaVnd,
        cost_per_lead_vnd: cplVnd,
        // Standard unified fields
        spend: spendVnd,
        revenue: revVnd,
        roas: roasVnd,
        cost_per_order: cpaVnd,
        cost_per_lead: cplVnd
      };
    });

    const adsOverview = {
      // Unified metrics (VNĐ)
      totalSpend: totalSpendVnd,
      totalRevenue: totalAdRevenueVnd,
      blendedRoas: totalSpendVnd > 0 ? (totalAdRevenueVnd / totalSpendVnd).toFixed(2) : '0.00',
      totalOrders: totalAdOrders,
      blendedCpa: totalAdOrders > 0 ? Math.round(totalSpendVnd / totalAdOrders) : 0,
      totalLeads: totalAdLeads,
      blendedCpl: totalAdLeads > 0 ? Math.round(totalSpendVnd / totalAdLeads) : 0,

      // Raw metrics
      totalSpendRaw: Math.round(totalSpendRaw * 100) / 100,
      totalRevenueRaw: Math.round(totalAdRevenueRaw * 100) / 100,
      adsCurrency: adsCurrency,
      revenueCurrency: revCurrency,

      totalImpressions,
      totalClicks,
      avgCtr: totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00',
      avgCpc: totalClicks > 0 ? Math.round(totalSpendVnd / totalClicks) : 0,
      avgCpm: totalImpressions > 0 ? Math.round((totalSpendVnd / totalImpressions) * 1000) : 0,
      activeAdsCount: adsStats.filter(a => a.ad_id !== 'Organic / Direct').length,

      // Currency sync metadata
      currencySync: {
        adsCurrency: adsCurrency,
        revenueCurrency: revCurrency,
        targetCurrency: 'VND',
        rateAdsToVnd: rateAdsToVnd,
        rateRevToVnd: rateRevToVnd,
        syncedAt: project.currency_synced_at,
        note: project.currency_sync_note || `1 ${revCurrency} ≈ ${rateRevToVnd.toLocaleString()} ₫ | 1 ${adsCurrency} = ${rateAdsToVnd.toLocaleString()} ₫`
      }
    };

    // 6. Fetch Leads list with optional filters and flexible sorting
    let querySql = `
      SELECT 
        id, project_id, tid, customer_name, phone, ad_id,
        total_messages, customer_messages, main_intent, conversation_result,
        order_combo, order_amount, order_details, dropoff_reason,
        last_customer_msg, last_ai_msg, key_evidence,
        first_msg_at, last_msg_at, updated_at, raw_transcript,
        tags, tagged_success_at, tagged_demand_at,
        funnel_step, funnel_step_num
      FROM leads
      WHERE project_id = $1
    `;
    const params = [projectId];

    if (statusFilter && statusFilter !== 'all') {
      params.push(statusFilter);
      querySql += ` AND conversation_result = $${params.length}`;
    }

    if (funnelStepFilter) {
      params.push(funnelStepFilter);
      querySql += ` AND funnel_step_num = $${params.length}`;
    }

    if (adIdFilter && adIdFilter !== 'all') {
      if (adIdFilter === 'organic' || adIdFilter === 'Organic / Direct') {
        querySql += ` AND (ad_id IS NULL OR TRIM(ad_id) = '')`;
      } else {
        params.push(adIdFilter);
        querySql += ` AND ad_id = $${params.length}`;
      }
    }

    if (searchKeyword) {
      params.push(`%${searchKeyword}%`);
      const pIdx = params.length;
      querySql += ` AND (
        LOWER(customer_name) LIKE $${pIdx} OR 
        LOWER(phone) LIKE $${pIdx} OR 
        LOWER(COALESCE(ad_id, '')) LIKE $${pIdx} OR
        LOWER(order_details) LIKE $${pIdx} OR 
        LOWER(main_intent) LIKE $${pIdx} OR
        LOWER(dropoff_reason) LIKE $${pIdx} OR
        LOWER(COALESCE(funnel_step, '')) LIKE $${pIdx}
      )`;
    }

    // Determine Sort Order: Default is "Lần tương tác cuối cùng" (Mới nhất trước)
    let orderClause = ' ORDER BY last_msg_at DESC NULLS LAST, updated_at DESC, id DESC;';
    if (sortBy === 'last_msg_asc') {
      orderClause = ' ORDER BY last_msg_at ASC NULLS LAST, updated_at ASC, id ASC;';
    } else if (sortBy === 'first_msg_desc') {
      orderClause = ' ORDER BY first_msg_at DESC NULLS LAST, id DESC;';
    } else if (sortBy === 'first_msg_asc') {
      orderClause = ' ORDER BY first_msg_at ASC NULLS LAST, id ASC;';
    }

    querySql += orderClause;

    const leadsRes = await client.query(querySql, params);

    await client.end();

    return res.status(200).json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        currency: project.currency,
        smax_biz: project.smax_biz,
        smax_page_pid: project.smax_page_pid,
        ads_currency: adsCurrency,
        revenue_currency: revCurrency,
        rate_ads_to_vnd: rateAdsToVnd,
        rate_rev_to_vnd: rateRevToVnd,
        currency_synced_at: project.currency_synced_at,
        currency_sync_note: project.currency_sync_note
      },
      kpi: {
        totalLeads: parseInt(kpi.total_leads, 10),
        closedOrders: parseInt(kpi.closed_orders, 10),
        totalRevenue: parseFloat(kpi.total_revenue),
        hotLeads: parseInt(kpi.hot_leads, 10),
        consultingLeads: parseInt(kpi.consulting_leads, 10),
        noResponseLeads: parseInt(kpi.no_response_leads, 10)
      },
      dailyStats: dailyStats,
      funnelStats: {
        steps: funnelStats,
        bottleneck: bottleneckStep,
        summary: `Điểm nghẽn lớn nhất nằm ở '${bottleneckStep.name}' với ${bottleneckStep.count} leads (${bottleneckStep.percentage}%). Cần áp dụng giải pháp: ${bottleneckStep.bottleneckAction}`
      },
      adsOverview: adsOverview,
      adsStats: adsStats,
      leads: leadsRes.rows
    });
  } catch (error) {
    if (client) {
      try { await client.end(); } catch (e) {}
    }
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
