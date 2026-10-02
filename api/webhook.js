const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const SMAX_CONFIG = {
  email: 'tuante00@gmail.com',
  password: 'TuanThanh@160990'
};

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const payload = req.body || req.query || {};
    const tid = payload.tid || payload.thread_id || payload.customer_pid;
    const projectId = (payload.project_id || payload.project || 'fitgum').toLowerCase().trim();

    if (!tid) {
      return res.status(200).json({ ok: true, message: 'No tid provided in webhook payload' });
    }

    // Connect to Neon
    const client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    await client.connect();

    // Check project config
    const projRes = await client.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    const project = projRes.rows[0];
    if (!project) {
      await client.end();
      return res.status(404).json({ error: 'Project not found' });
    }

    // Login Smax to fetch fresh thread
    const basic = Buffer.from(SMAX_CONFIG.email + ':' + SMAX_CONFIG.password).toString('base64');
    const loginRes = await fetch('https://api.smax.ai/auth/login', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + basic, 'Content-Type': 'application/json' }
    });
    const token = (await loginRes.json()).data?.access_token;
    if (!token) throw new Error('Cannot login to Smax');

    // Fetch messages for thread
    const msgRes = await fetch(`https://api.smax.ai/bizs/${project.smax_biz}/pages/${project.smax_page_pid}/threads/${tid}/messages?sort=created_at&limit=100`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const rawMsgs = (await msgRes.json()).data || [];

    // Filter clean messages
    const cleanMsgs = rawMsgs.filter(m => {
      if (m.type === 'system' || m.platform === 'internal') return false;
      if (m.message && m.message.includes('Đã chuyển sang chế độ Meta Business AI')) return false;
      return true;
    });

    const totalMessages = cleanMsgs.length;
    let customerMessages = 0;
    let lastCustomerMsg = '';
    let lastAiMsg = '';
    const rawTranscript = [];

    let customerName = payload.customer_name || 'WhatsApp Customer';
    let phone = payload.phone || (tid.startsWith('waMY.') ? tid.replace('waMY.', '+60 ') : tid);

    for (const m of cleanMsgs) {
      const isCustomer = m.from_user || (m.sender_pid && m.sender_pid.startsWith('waMY.'));
      let text = m.message || '';
      if (!text && m.whatsapp?.interactive) {
        const inter = m.whatsapp.interactive[0] || m.whatsapp.interactive;
        text = `[Interactive: ${inter.text || ''} - Buttons: ${(inter.buttons || []).join(' | ')}]`;
      }
      if (m.whatsapp?.from?.name && customerName === 'WhatsApp Customer') {
        customerName = m.whatsapp.from.name;
      }
      if (isCustomer) {
        customerMessages++;
        if (text) lastCustomerMsg = text;
        rawTranscript.push({ time: m.created_at, sender: customerName, role: 'customer', text });
      } else {
        if (text) lastAiMsg = text;
        rawTranscript.push({ time: m.created_at, sender: 'Fitgum AI', role: 'assistant', text });
      }
    }

    const allCustomerText = rawTranscript.filter(r => r.role === 'customer').map(r => r.text).join(' \n ');
    const allText = rawTranscript.map(r => `${r.role}: ${r.text}`).join('\n');

    let conversationResult = 'Đang tư vấn';
    let orderCombo = '';
    let orderAmount = 0;
    let orderDetails = '';
    let dropoffReason = '';
    let mainIntent = 'Hỏi thông tin sản phẩm / Giá';
    let keyEvidence = lastCustomerMsg;

    if (/belly|bloat|perut|buncit/i.test(allCustomerText)) {
      mainIntent = 'Giảm mỡ bụng & Tiêu sưng đầy hơi (Belly & Bloat)';
    } else if (/lose|berat|weight|3-5kg|6-10kg/i.test(allCustomerText)) {
      mainIntent = 'Giảm cân tự nhiên (Natural Weight Loss)';
    }

    const isOrderConfirmed = /Confirm Order|✅ Confirm Order|proceed with order|Order Summary|BASE CAMP USAHA/i.test(allText) &&
      /telupid|sabah|sarawak|poskod|jalan|taman|kampung|block|lot/i.test(allCustomerText);

    if (isOrderConfirmed) {
      conversationResult = 'Đã chốt đơn';
      if (/Combo 2|Buy 4 Get 4|229/i.test(allText)) {
        orderCombo = 'Combo 2 (Buy 4 Get 4 FREE)'; orderAmount = 229.00;
      } else if (/Combo 3|Buy 6 Get 6|329/i.test(allText)) {
        orderCombo = 'Combo 3 (Buy 6 Get 6 FREE)'; orderAmount = 329.00;
      } else if (/Combo 4|Buy 8 Get 8|419/i.test(allText)) {
        orderCombo = 'Combo 4 (Buy 8 Get 8 FREE)'; orderAmount = 419.00;
      } else {
        orderCombo = 'Combo 1 (Buy 3 Get 3 FREE)'; orderAmount = 179.00;
      }
      orderDetails = `Combo: ${orderCombo} (RM ${orderAmount}) - COD Free Shipping`;
    } else if (customerMessages >= 3) {
      conversationResult = 'Có nhu cầu';
      if (/dont have trial|trial pack|mahal|expensive/i.test(allCustomerText)) {
        dropoffReason = 'Muốn gói dùng thử / Chưa sẵn sàng mua combo';
      } else {
        dropoffReason = 'Khách dừng sau khi báo giá (Cần Follow-up)';
      }
    }

    const firstMsgAt = cleanMsgs[0]?.created_at || new Date().toISOString();
    const lastMsgAt = cleanMsgs[cleanMsgs.length - 1]?.created_at || new Date().toISOString();

    const upsertSql = `
      INSERT INTO leads (
        project_id, tid, customer_name, phone, ad_id,
        total_messages, customer_messages, main_intent, conversation_result,
        order_combo, order_amount, order_details, dropoff_reason,
        last_customer_msg, last_ai_msg, key_evidence,
        first_msg_at, last_msg_at, updated_at, raw_transcript
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW(), $19)
      ON CONFLICT (project_id, tid) DO UPDATE SET
        customer_name = EXCLUDED.customer_name,
        phone = EXCLUDED.phone,
        total_messages = EXCLUDED.total_messages,
        customer_messages = EXCLUDED.customer_messages,
        main_intent = EXCLUDED.main_intent,
        conversation_result = EXCLUDED.conversation_result,
        order_combo = EXCLUDED.order_combo,
        order_amount = EXCLUDED.order_amount,
        order_details = EXCLUDED.order_details,
        dropoff_reason = EXCLUDED.dropoff_reason,
        last_customer_msg = EXCLUDED.last_customer_msg,
        last_ai_msg = EXCLUDED.last_ai_msg,
        key_evidence = EXCLUDED.key_evidence,
        last_msg_at = EXCLUDED.last_msg_at,
        updated_at = NOW(),
        raw_transcript = EXCLUDED.raw_transcript;
    `;

    await client.query(upsertSql, [
      projectId, tid, customerName, phone, payload.ad_id || '',
      totalMessages, customerMessages, mainIntent, conversationResult,
      orderCombo, orderAmount, orderDetails, dropoffReason,
      lastCustomerMsg, lastAiMsg, keyEvidence,
      firstMsgAt, lastMsgAt, JSON.stringify(rawTranscript)
    ]);

    await client.end();
    return res.status(200).json({ ok: true, synced: tid, result: conversationResult });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: err.message });
  }
};
