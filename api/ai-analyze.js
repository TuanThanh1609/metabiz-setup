const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function callTokenAi(aiEndpoint, aiToken, aiModel, transcript, customerName, currency = 'RM', project = {}) {
  let productContext = '';
  if (project.id === 'abera') {
    productContext = `
Dự án: Abera Anti Dark Spot Serum (Serum mờ thâm nám Abera - Indonesia).
Đơn vị tiền tệ: IDR (Rupiah Indonesia, ví dụ: 179000, 297000, 350000).
Bảng giá & Combo sản phẩm:
- 1 Botol (Chai): Rp 179.000
- Paket 2 Botol (Beli 2 Gratis 1 - Tổng 3 chai): Rp 297.000
- Paket 3 Botol (Beli 3 Gratis 1 - Tổng 4 chai): Rp 350.000
- Miễn phí vận chuyển COD toàn Indonesia (Gratis Ongkir).
Nhu cầu chính: Mờ thâm nám (flek hitam), đốm nâu (bintik hitam), tàn nhang, đồi mồi, dưỡng sáng da.`;
  } else {
    productContext = `
Dự án: Fitgum Acai Berry Drink Malaysia.
Đơn vị tiền tệ: RM (Ringgit Malaysia).
Bảng giá & Combo sản phẩm:
- Combo 1 (Buy 3 Get 3 FREE): RM 179
- Combo 2 (Buy 4 Get 4 FREE): RM 229
- Combo 3 (Buy 6 Get 6 FREE): RM 329
- Miễn phí vận chuyển COD toàn Malaysia.
Nhu cầu chính: Giảm cân, giảm mỡ bụng (belly fat/bloat), thon gọn vóc dáng.`;
  }

  const systemPrompt = `Bạn là chuyên gia AI phân tích hội thoại bán hàng WhatsApp (Meta Business Agent).
${productContext}

Phân tích lịch sử trò chuyện và trả về ĐÚNG định dạng JSON với các trường:
{
  "main_intent": "Nhu cầu cốt lõi của khách (5-10 từ, ví dụ: 'Trị nám mảng đốm nâu' hoặc 'Hỏi giá Combo 2')",
  "conversation_result": "Một trong 4 giá trị: 'Đã chốt đơn' | 'Có nhu cầu' | 'Đang tư vấn' | 'Chưa phản hồi'",
  "is_order_closed": true/false (chỉ true khi khách chốt mua combo và đã cung cấp địa chỉ nhận hàng COD / thông tin giao hàng),
  "is_high_intent": true/false (true khi khách hỏi giá cụ thể, hỏi ship COD, chọn combo hoặc gửi thông tin nhận hàng, hoặc đã nhắn >= 3 tin có nội dung),
  "order_combo": "Tên combo chốt (ví dụ: 'Paket 2 Botol (Beli 2 Gratis 1)' hoặc 'Combo 1 (Buy 3 Get 3 FREE)') hoặc rỗng nếu chưa chốt",
  "order_amount": số tiền COD (${currency}) dạng số (ví dụ: 297000 hoặc 179) hoặc 0 nếu chưa chốt,
  "recipient_name": "Tên người nhận",
  "recipient_phone": "Số điện thoại nhận hàng",
  "shipping_address": "Địa chỉ giao hàng đầy đủ",
  "order_details": "Tóm tắt đơn hàng định dạng: 📦 [Combo] ([Tiền]) | 👤 Người nhận: [Tên] | 📞 [SĐT] | 📍 Địa chỉ: [Địa chỉ] | 🚚 COD Free Shipping (hoặc rỗng nếu chưa chốt)",
  "dropoff_reason": "Điém nghẽn hoặc lý do khách chưa mua / im lặng",
  "key_evidence": "Trích dẫn 1 câu nguyên văn quan trọng nhất của khách hoặc địa chỉ giao hàng",
  "funnel_step": "Tên bước trong 7 bước phễu ('Step 1: Tiếp cận & Chào mừng' | 'Step 2: Tư vấn vóc dáng/tình trạng da & USP' | 'Step 3: Bằng chứng xã hội' | 'Step 4: Báo giá & Combo' | 'Step 5: Xử lý từ chối' | 'Step 6: Thu thập địa chỉ COD' | 'Step 7: Chốt đơn thành công')",
  "funnel_step_num": số nguyên từ 1 đến 7
}`;

  const url = aiEndpoint.endsWith('/chat/completions') ? aiEndpoint : `${aiEndpoint.replace(/\/+$/, '')}/chat/completions`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

  try {
    const res = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${aiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: aiModel || 'gpt-5',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Đơn vị tiền: ${currency}\nKhách hàng: ${customerName}\n\nLịch sử chat WhatsApp:\n${transcript}` }
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      })
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`Token.ai returned ${res.status}: ${errText}`);
      return null;
    }
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content);
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Token.ai call failed:', err.message);
    return null;
  }
}

module.exports = async (req, res) => {
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

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const projectId = (req.query?.project_id || req.body?.project_id || 'fitgum').toLowerCase().trim();
  const force = req.query?.force === 'true' || req.body?.force === true;
  const targetTid = req.query?.tid || req.body?.tid || null;
  const limit = Math.min(parseInt(req.query?.limit || req.body?.limit || '10', 10), 50);

  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // 1. Fetch Project AI Settings
    const projectRes = await client.query('SELECT * FROM projects WHERE id = $1;', [projectId]);
    if (projectRes.rows.length === 0) {
      await client.end();
      return res.status(404).json({ success: false, error: `Project '${projectId}' không tồn tại.` });
    }
    const project = projectRes.rows[0];

    const aiEndpoint = project.ai_endpoint || 'https://token.ai.vn/v1';
    const aiToken = project.ai_token || 'sk-LEd49hmmEG9L4kB_aYYGhHHJirAsbtLkmyNReBe_yYgv3IRtAIhp8vJ_hjE';
    const aiModel = project.ai_model || 'gpt-5';

    // 2. Select unanalyzed leads
    let selectSql = `
      SELECT id, tid, customer_name, phone, raw_transcript, customer_messages
      FROM leads
      WHERE project_id = $1 AND customer_messages > 0
    `;
    const params = [projectId];

    if (targetTid) {
      params.push(targetTid);
      selectSql += ` AND tid = $${params.length}`;
    } else if (!force) {
      selectSql += ` AND ai_analyzed_at IS NULL`;
    }

    selectSql += ` ORDER BY last_msg_at DESC LIMIT $${params.length + 1};`;
    params.push(limit);

    const leadsToAnalyze = await client.query(selectSql, params);

    if (leadsToAnalyze.rows.length === 0) {
      await client.end();
      return res.status(200).json({
        success: true,
        message: 'Tất cả hội thoại đều đã được phân tích bằng Token.ai GPT-5.',
        analyzedCount: 0
      });
    }

    const results = [];
    for (const lead of leadsToAnalyze.rows) {
      const transcriptArr = Array.isArray(lead.raw_transcript) ? lead.raw_transcript : [];
      const transcriptStr = transcriptArr.map(m => `[${m.sender || m.role}]: ${m.text || ''}`).join('\n');

      if (!transcriptStr.trim()) continue;

      const aiData = await callTokenAi(
        aiEndpoint,
        aiToken,
        aiModel,
        transcriptStr,
        lead.customer_name || 'Khách WhatsApp',
        project.currency || 'RM',
        project
      );

      if (aiData) {
        let convResult = aiData.conversation_result;
        if (aiData.is_order_closed) convResult = 'Đã chốt đơn';
        else if (aiData.is_high_intent && convResult !== 'Đã chốt đơn') convResult = 'Có nhu cầu';

        const updateSql = `
          UPDATE leads
          SET
            main_intent = COALESCE($1, main_intent),
            conversation_result = COALESCE($2, conversation_result),
            order_combo = COALESCE($3, order_combo),
            order_amount = COALESCE($4, order_amount),
            order_details = COALESCE($5, order_details),
            dropoff_reason = COALESCE($6, dropoff_reason),
            key_evidence = COALESCE($7, key_evidence),
            funnel_step = COALESCE($8, funnel_step),
            funnel_step_num = COALESCE($9, funnel_step_num),
            ai_analyzed_at = NOW(),
            ai_raw_analysis = $10,
            updated_at = NOW()
          WHERE project_id = $11 AND tid = $12;
        `;

        await client.query(updateSql, [
          aiData.main_intent || null,
          convResult || null,
          aiData.order_combo || null,
          aiData.order_amount ? parseFloat(aiData.order_amount) : 0,
          aiData.order_details || null,
          aiData.dropoff_reason || null,
          aiData.key_evidence || null,
          aiData.funnel_step || null,
          aiData.funnel_step_num || null,
          JSON.stringify(aiData),
          projectId,
          lead.tid
        ]);

        results.push({
          tid: lead.tid,
          customer_name: lead.customer_name,
          funnel_step: aiData.funnel_step,
          result: convResult,
          order_amount: aiData.order_amount
        });
      }
    }

    await client.end();

    return res.status(200).json({
      success: true,
      projectId: projectId,
      modelUsed: aiModel,
      analyzedCount: results.length,
      results: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (client) {
      try { await client.end(); } catch (e) {}
    }
    console.error('AI Analyze Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
