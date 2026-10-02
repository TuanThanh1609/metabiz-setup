const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const SMAX_CONFIG = {
  email: process.env.SMAX_EMAIL || 'tuante00@gmail.com',
  password: process.env.SMAX_PASSWORD || 'TuanThanh@160990'
};

function isSystemMessage(m) {
  if (!m) return true;
  if (m.type === 'system' || m.platform === 'internal') return true;
  if (m.internal != null || m.is_system === true) return true;
  const text = (m.message || '').trim();
  if (text && (
    text.startsWith('Đã chuyển sang chế độ') ||
    text.startsWith('Đã gán cho') ||
    text.startsWith('Đã đổi trạng thái') ||
    text.startsWith('Hệ thống đã')
  )) return true;
  return false;
}

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
  "dropoff_reason": "Điểm nghẽn hoặc lý do khách chưa mua / im lặng",
  "key_evidence": "Trích dẫn 1 câu nguyên văn quan trọng nhất của khách hoặc địa chỉ giao hàng",
  "funnel_step": "Tên bước trong 7 bước phễu ('Step 1: Tiếp cận & Chào mừng' | 'Step 2: Tư vấn vóc dáng/tình trạng da & USP' | 'Step 3: Bằng chứng xã hội' | 'Step 4: Báo giá & Combo' | 'Step 5: Xử lý từ chối' | 'Step 6: Thu thập địa chỉ COD' | 'Step 7: Chốt đơn thành công')",
  "funnel_step_num": số nguyên từ 1 đến 7
}`;

  const url = (aiEndpoint || 'https://token.ai.vn/v1').endsWith('/chat/completions')
    ? aiEndpoint
    : `${(aiEndpoint || 'https://token.ai.vn/v1').replace(/\/+$/, '')}/chat/completions`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout for serverless safety

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
      console.warn(`Token.ai returned ${res.status}: ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content);
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Token.ai call skipped or timed out:', err.message);
    return null;
  }
}

function determineFunnelStep(lead) {
  const isClosed = lead.conversation_result === 'Đã chốt đơn' || (lead.order_details && lead.order_details.length > 5);
  if (isClosed) {
    return { num: 7, step: 'Step 7: Chốt đơn thành công' };
  }

  const transcript = (lead.raw_transcript ? JSON.stringify(lead.raw_transcript) : '').toLowerCase();
  const dropoff = (lead.dropoff_reason || '').toLowerCase();
  const intent = (lead.main_intent || '').toLowerCase();
  const cMsgs = parseInt(lead.customer_messages || 0, 10);

  // Step 6: Checkout & COD
  if (dropoff.includes('địa chỉ') || dropoff.includes('alamat') || transcript.includes('address') || transcript.includes('alamat') || transcript.includes('poskod') || transcript.includes('kodepos') || transcript.includes('postcode') || transcript.includes('hantar ke') || transcript.includes('kirim ke')) {
    return { num: 6, step: 'Step 6: Thu thập địa chỉ COD' };
  }

  // Step 5: Objection Handling
  if (dropoff.includes('im lặng sau khi báo') || dropoff.includes('im lặng sau báo giá') || dropoff.includes('chê đắt') || dropoff.includes('suy nghĩ') || dropoff.includes('cân nhắc') || dropoff.includes('mahal') || dropoff.includes('fikir') || dropoff.includes('ragu')) {
    return { num: 5, step: 'Step 5: Xử lý từ chối' };
  }

  // Step 4: Pricing & Combo
  if (intent.includes('giá') || intent.includes('combo') || intent.includes('khuyến mãi') || intent.includes('harga') || intent.includes('promo') || intent.includes('paket') || transcript.includes('rm179') || transcript.includes('rm279') || transcript.includes('rm350') || transcript.includes('179') || transcript.includes('297') || transcript.includes('350') || transcript.includes('harga') || transcript.includes('pakej') || transcript.includes('paket')) {
    if (cMsgs >= 1) {
      return { num: 4, step: 'Step 4: Báo giá & Combo' };
    }
  }

  // Step 3: Social Proof & Reviews
  if (transcript.includes('feedback') || transcript.includes('testimoni') || transcript.includes('kesan') || transcript.includes('review') || transcript.includes('berkesan') || transcript.includes('selamat') || transcript.includes('bpom') || transcript.includes('bukti')) {
    if (cMsgs >= 1) {
      return { num: 3, step: 'Step 3: Bằng chứng xã hội' };
    }
  }

  // Step 2: Consultation & USP
  if (cMsgs >= 1 || intent.includes('giảm cân') || intent.includes('vóc dáng') || intent.includes('tư vấn') || intent.includes('flek') || intent.includes('nám') || intent.includes('kulit')) {
    return { num: 2, step: 'Step 2: Tư vấn vóc dáng/tình trạng da & USP' };
  }

  // Step 1: Welcome & Hook
  return { num: 1, step: 'Step 1: Tiếp cận & Chào mừng' };
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
  const limit = Math.min(parseInt(req.query?.limit || req.body?.limit || '50', 10), 100);

  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // 1. Get Project Config
    const projectRes = await client.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    if (projectRes.rows.length === 0) {
      await client.end();
      return res.status(404).json({ success: false, error: `Project '${projectId}' không tồn tại.` });
    }
    const project = projectRes.rows[0];

    // 2. Login Smax
    const basic = Buffer.from(SMAX_CONFIG.email + ':' + SMAX_CONFIG.password).toString('base64');
    const loginRes = await fetch('https://api.smax.ai/auth/login', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + basic, 'Content-Type': 'application/json' }
    });
    const token = (await loginRes.json()).data?.access_token;
    if (!token) throw new Error('Không thể đăng nhập vào Smax API');

    // 3. Fetch latest threads from Smax
    const pagePids = (project.smax_page_pid || '').split(',').map(s => s.trim()).filter(Boolean);
    const threadsRes = await fetch(`https://api.smax.ai/bizs/${project.smax_biz}/threads`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ page_pids: pagePids, sort: 'desc', limit: limit })
    });
    const threadsData = await threadsRes.json();
    const threads = threadsData.data || [];

    if (threads.length === 0) {
      await client.end();
      return res.status(200).json({ success: true, message: 'Không có hội thoại nào trên Smax', syncedCount: 0 });
    }

    // 4. Load existing leads for change detection
    const existingLeadsRes = await client.query(
      'SELECT tid, last_msg_at, updated_at FROM leads WHERE project_id = $1;',
      [projectId]
    );
    const existingMap = new Map();
    existingLeadsRes.rows.forEach(r => existingMap.set(r.tid, r));

    let newLeadsCount = 0;
    let updatedLeadsCount = 0;
    let skippedCount = 0;
    let aiAnalyzedThisSync = 0;
    const MAX_AI_PER_SYNC = 2;

    for (const t of threads) {
      const tid = t.tid || t.customer_pid;
      if (!tid) continue;

      const customer = t.customer || {};
      const wa = t.whatsapp || customer.whatsapp || {};
      const customerName = customer.name || wa.name || t.name || 'WhatsApp Customer';
      let phone = customer.phone || wa.id || tid;
      if (phone.startsWith('waMY.')) {
        phone = phone.replace('waMY.', '+60 ');
      } else if (phone.startsWith('waID.')) {
        phone = phone.replace('waID.', '+62 ');
      }
      const adId = wa.ad_id || t.ad_id || '';
      const threadLastMsg = t.last_message_at || t.updated_at;

      const existing = existingMap.get(tid);

      // Smart Change Detection: Skip if not changed
      if (existing && !force && existing.last_msg_at && threadLastMsg) {
        const existTime = new Date(existing.last_msg_at).getTime();
        const threadTime = new Date(threadLastMsg).getTime();
        if (Math.abs(existTime - threadTime) < 2000) {
          skippedCount++;
          continue;
        }
      }

      // Fetch messages for this thread (using thread's specific page_pid)
      const targetPagePid = t.page_pid || pagePids[0];
      const msgRes = await fetch(`https://api.smax.ai/bizs/${project.smax_biz}/pages/${targetPagePid}/threads/${tid}/messages?sort=created_at&limit=100`, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const rawMsgs = (await msgRes.json()).data || [];
      const cleanMsgs = rawMsgs.filter(m => !isSystemMessage(m));

      const totalMessages = cleanMsgs.length;
      let customerMessages = 0;
      let lastCustomerMsg = '';
      let lastAiMsg = '';
      const rawTranscript = [];

      for (const m of cleanMsgs) {
        const isCustomer = (m.sender_pid !== targetPagePid && m.sender_pid !== m.page_pid) || 
                           (m.sender_pid === tid) || 
                           Boolean(m.customer) || 
                           Boolean(m.from_user);
        let text = m.message || '';
        if (!text && m.whatsapp?.interactive) {
          const inter = m.whatsapp.interactive[0] || m.whatsapp.interactive;
          text = `[Interactive: ${inter.text || ''} - Buttons: ${(inter.buttons || []).join(' | ')}]`;
        }
        if (m.whatsapp?.attachments?.length) {
          text += ` [Image/Attachment]`;
        }

        if (isCustomer) {
          customerMessages++;
          if (text) lastCustomerMsg = text;
          rawTranscript.push({
            time: m.created_at,
            sender: customerName,
            role: 'customer',
            text: text
          });
        } else {
          if (text) lastAiMsg = text;
          rawTranscript.push({
            time: m.created_at,
            sender: `${(project.name || 'AI').split(' ')[0]} AI`,
            role: 'assistant',
            text: text
          });
        }
      }

      let firstMsgAt = cleanMsgs[0]?.created_at || t.created_at || new Date().toISOString();
      let lastMsgAt = cleanMsgs[cleanMsgs.length - 1]?.created_at || threadLastMsg || new Date().toISOString();

      // Heuristics for intent & status
      let conversationResult = 'Đang tư vấn';
      let orderCombo = '';
      let orderAmount = 0;
      let orderDetails = '';
      let dropoffReason = '';
      let mainIntent = 'Hỏi thông tin sản phẩm / Giá';
      let keyEvidence = '';

      const allCustomerText = rawTranscript.filter(r => r.role === 'customer').map(r => r.text).join(' \n ');
      const allText = rawTranscript.map(r => `${r.role}: ${r.text}`).join('\n');

      const hasSmaxSuccessTag = (t.tag_aliases && (t.tag_aliases.includes('thanh_cong') || t.tag_aliases.includes('thành công'))) || (t.tags && (t.tags.includes('Thành công') || t.tags.includes('thanh_cong')));
      const hasSmaxDemandTag = (t.tag_aliases && (t.tag_aliases.includes('co_nhu_cau') || t.tag_aliases.includes('có nhu cầu'))) || (t.tags && (t.tags.includes('Có nhu cầu') || t.tags.includes('co_nhu_cau')));

      if (projectId === 'abera') {
        if (/flek|hitam|noda|melasma|kusam|bintik|bekas jerawat/i.test(allCustomerText)) {
          mainIntent = 'Trị nám, đốm nâu & tàn nhang (Flek Hitam & Noda)';
        } else if (/harga|promo|paket|berapa|ongkir|cod/i.test(allCustomerText)) {
          mainIntent = 'Hỏi giá & Khuyến mãi Serum Abera';
        } else if (/cara pakai|aturan|cocok|aman|bpom/i.test(allCustomerText)) {
          mainIntent = 'Tư vấn công dụng & Cách dùng Serum Abera';
        }

        // Check Order Summary from Smax Bot ("RINGKASAN PESANAN")
        let isAberaOrder = false;
        let custOrderName = customerName;
        let custOrderPhone = phone;
        let addrStr = '';
        let pkgStr = 'Paket 2 Botol (Beli 2 Gratis 1)';
        let totalAmount = 297000;

        const summaryMsg = cleanMsgs.find(m => m.message && /RINGKASAN PESANAN/i.test(m.message));
        if (summaryMsg) {
          const msgTxt = summaryMsg.message;
          const nm = msgTxt.match(/[-*•\s]*(?:Nama\s*Penerima|Penerima)[*:]*\s*:\s*\*?([^\n\*]+)\*?/i);
          const am = msgTxt.match(/[-*•\s]*(?:Alamat\s*Pengiriman|Alamat)[*:]*\s*:\s*\*?([^\n\*]+)\*?/i);
          const pm = msgTxt.match(/[-*•\s]*(?:Produk\s*\/\s*Paket|Produk|Paket)[*:]*\s*:\s*\*?([^\n\*]+)\*?/i);
          const tm = msgTxt.match(/[-*•\s]*(?:Total\s*Pembayaran|Total)[*:]*\s*:\s*\*?([^\n\*]+)\*?/i);

          if (am && am[1].trim().length > 5) {
            addrStr = am[1].trim();
            if (nm) custOrderName = nm[1].trim();
            if (pm) pkgStr = pm[1].trim();
            if (tm) {
              const rawTot = tm[1].replace(/[^0-9]/g, '');
              if (rawTot) totalAmount = parseInt(rawTot, 10);
            }
            isAberaOrder = true;
          }
        }

        // Direct customer message address heuristics
        if (!addrStr && customerMessages > 0) {
          for (const m of cleanMsgs) {
            const isCust = (m.sender_pid !== targetPagePid && m.sender_pid !== m.page_pid) || (m.sender_pid === tid) || Boolean(m.customer) || Boolean(m.from_user);
            if (isCust && m.message) {
              const txt = m.message.trim();
              const addrM = txt.match(/(?:Alamat\s*(?:lengkap|pengiriman)?)\s*[:\.]\s*([^\n\r]+)/i);
              if (addrM && addrM[1].trim().length > 5 && !/mimin|tunggu|data|kirim data|rekap|berapa/i.test(addrM[1])) {
                addrStr = addrM[1].trim();
                isAberaOrder = true;
              }
              const nmM = txt.match(/(?:Nama\s*(?:lengkap|penerima)?|Atas\s*nama|Nm)\s*[:\.]\s*([^\n\r]+)/i);
              if (nmM && nmM[1].trim().length < 50 && !/mimin|tunggu/i.test(nmM[1])) {
                custOrderName = nmM[1].trim();
              }
              const phM = txt.match(/(?:No\s*(?:HP|WA|telepon|hp)?|Nomor\s*HP|WhatsApp)\s*[:\.]\s*([0-9\+\-\s]{9,16})/i);
              if (phM && !custOrderPhone) {
                custOrderPhone = phM[1].replace(/[^0-9]/g, '');
              }
              if (!addrStr && /jalan|jl\.|rt|rw|kecamatan|kabupaten|kota|desa|pos|kodepos|no\.|blok|gang/i.test(txt) && txt.length >= 15) {
                addrStr = txt;
                isAberaOrder = true;
              }
            }
          }
        }

        if (/paket 3|3 botol|beli 3|350/i.test(allText)) {
          pkgStr = 'Paket 3 Botol (Beli 3 Gratis 1 - Tổng 4 chai)';
          totalAmount = 350000;
        } else if (/paket 2|2 botol|beli 2|273|297/i.test(allText)) {
          pkgStr = 'Paket 2 Botol (Beli 2 Gratis 1 - Tổng 3 chai)';
          totalAmount = /273/i.test(allText) ? 273000 : 297000;
        } else if (/1 botol|179/i.test(allText)) {
          pkgStr = '1 Botol Abera Serum';
          totalAmount = 179000;
        }

        if (isAberaOrder || hasSmaxSuccessTag) {
          conversationResult = 'Đã chốt đơn';
          orderCombo = pkgStr;
          orderAmount = totalAmount;
          if (!addrStr) addrStr = keyEvidence || 'Đã xác nhận địa chỉ qua chat';
          keyEvidence = addrStr;
          orderDetails = `📦 ${orderCombo} (Rp ${orderAmount.toLocaleString()}) | 👤 Người nhận: ${custOrderName} | 📞 ${custOrderPhone} | 📍 Địa chỉ: ${addrStr} | 🚚 COD Free Shipping`;
        } else if (customerMessages >= 3 || hasSmaxDemandTag) {
          conversationResult = 'Có nhu cầu';
          keyEvidence = lastCustomerMsg;
          if (/mahal|kurang|diskon|tanya dulu/i.test(allCustomerText)) {
            dropoffReason = 'Khách cân nhắc giá / Chưa sẵn sàng mua';
          } else {
            dropoffReason = 'Khách im lặng sau khi báo giá (Cần Follow-up)';
          }
        } else if (customerMessages === 0) {
          conversationResult = 'Chưa phản hồi';
          dropoffReason = 'Khách click quảng cáo nhưng chưa nhắn tin';
        } else {
          conversationResult = 'Đang tư vấn';
          if (/harga|berapa|promo/i.test(lastCustomerMsg)) {
            dropoffReason = 'Khách vừa hỏi giá, đang chờ chốt';
          }
        }
      } else {
        // Fitgum and default
        if (/belly|bloat|perut|buncit/i.test(allCustomerText)) {
          mainIntent = 'Giảm mỡ bụng & Tiêu sưng đầy hơi (Belly & Bloat)';
        } else if (/lose|berat|weight|3-5kg|6-10kg|slimming/i.test(allCustomerText)) {
          mainIntent = 'Giảm cân tự nhiên (Natural Weight Loss)';
        } else if (/price|promo|how much|berapa|combo/i.test(allCustomerText)) {
          mainIntent = 'Tìm hiểu giá & Khuyến mãi Combo';
        }

        const isOrderConfirmed = /Confirm Order|✅ Confirm Order|proceed with order|Order Summary|BASE CAMP USAHA/i.test(allText) &&
          /telupid|sabah|sarawak|poskod|jalan|taman|kampung|block|lot/i.test(allCustomerText);

        if (isOrderConfirmed || hasSmaxSuccessTag) {
          conversationResult = 'Đã chốt đơn';
          if (/Combo 1|Buy 3 Get 3|179/i.test(allText)) {
            orderCombo = 'Combo 1 (Buy 3 Get 3 FREE)';
            orderAmount = 179.00;
          } else if (/Combo 2|Buy 4 Get 4|229/i.test(allText)) {
            orderCombo = 'Combo 2 (Buy 4 Get 4 FREE)';
            orderAmount = 229.00;
          } else if (/Combo 3|Buy 6 Get 6|329/i.test(allText)) {
            orderCombo = 'Combo 3 (Buy 6 Get 6 FREE)';
            orderAmount = 329.00;
          } else {
            orderCombo = 'Combo 1 (RM 179)';
            orderAmount = 179.00;
          }

          let recipientName = customerName;
          let recipientPhone = phone;
          let shippingAddress = '';

          for (const m of cleanMsgs) {
            const isCust = (m.sender_pid === tid) || Boolean(m.customer) || Boolean(m.from_user);
            if (isCust && m.message) {
              const txt = m.message.trim();
              if (/\b\d{5}\b|jalan|taman|kampung|lorong|telupid|sabah|sarawak|poskod|block|lot|peti surat/i.test(txt)) {
                keyEvidence = txt;
                const lines = txt.split('\n').map(l => l.trim()).filter(Boolean);
                if (lines.length >= 2) {
                  const phoneIdx = lines.findIndex(l => /(\+?60|01)\d/i.test(l.replace(/[\s-]/g, '')));
                  if (phoneIdx >= 0) {
                    recipientPhone = lines[phoneIdx];
                    if (phoneIdx > 0) recipientName = lines.slice(0, phoneIdx).join(' ');
                    shippingAddress = lines.slice(phoneIdx + 1).join(', ');
                  } else {
                    shippingAddress = lines.join(', ');
                  }
                } else {
                  shippingAddress = txt;
                }
                break;
              }
            }
          }
          if (!shippingAddress) shippingAddress = keyEvidence || 'Đã xác nhận địa chỉ qua chat';
          orderDetails = `📦 ${orderCombo} (RM ${orderAmount}) | 👤 Người nhận: ${recipientName} | 📞 ${recipientPhone} | 📍 Địa chỉ: ${shippingAddress} | 🚚 COD Free Shipping`;
        } else if (customerMessages >= 3 || hasSmaxDemandTag) {
          conversationResult = 'Có nhu cầu';
          keyEvidence = lastCustomerMsg;
          if (/dont have trial|trial pack|expensive|mahal/i.test(allCustomerText)) {
            dropoffReason = 'Muốn gói dùng thử / Chưa sẵn sàng mua combo';
          } else if (/asking only|tanya je/i.test(allCustomerText)) {
            dropoffReason = 'Khách chỉ hỏi tham khảo';
          } else {
            dropoffReason = 'Khách im lặng sau khi báo giá (Cần Follow-up)';
          }
        } else if (customerMessages === 0) {
          conversationResult = 'Chưa phản hồi';
          dropoffReason = 'Khách click quảng cáo nhưng chưa nhắn tin';
        } else {
          conversationResult = 'Đang tư vấn';
          if (/price|how much|berapa/i.test(lastCustomerMsg)) {
            dropoffReason = 'Khách vừa hỏi giá, đang chờ chốt';
          }
        }
      }

      // Funnel Step Baseline
      const tempLead = {
        conversation_result: conversationResult,
        order_details: orderDetails,
        raw_transcript: rawTranscript,
        dropoff_reason: dropoffReason,
        main_intent: mainIntent,
        customer_messages: customerMessages
      };
      let { num: funnelNum, step: funnelStep } = determineFunnelStep(tempLead);

      let aiAnalyzedAt = null;
      let aiRawAnalysis = null;

      // Token.ai GPT-5 Integration: If enabled and thread has customer interaction
      const isAiEnabled = project.ai_enabled !== false && Boolean(project.ai_token);
      const shouldRunAi = isAiEnabled && customerMessages > 0 && (aiAnalyzedThisSync < MAX_AI_PER_SYNC || req.query?.ai === 'true');
      if (shouldRunAi) {
        const transcriptStr = rawTranscript.map(r => `[${r.sender}]: ${r.text}`).join('\n');
        if (transcriptStr.trim()) {
          aiAnalyzedThisSync++;
          const aiData = await callTokenAi(
            project.ai_endpoint || 'https://token.ai.vn/v1',
            project.ai_token,
            project.ai_model || 'gpt-5',
            transcriptStr,
            customerName,
            project.currency || 'RM',
            project
          );

          if (aiData) {
            if (aiData.main_intent) mainIntent = aiData.main_intent;
            if (aiData.order_combo) orderCombo = aiData.order_combo;
            if (aiData.order_amount) orderAmount = parseFloat(aiData.order_amount) || orderAmount;
            if (aiData.order_details) orderDetails = aiData.order_details;
            if (aiData.dropoff_reason) dropoffReason = aiData.dropoff_reason;
            if (aiData.key_evidence) keyEvidence = aiData.key_evidence;
            if (aiData.funnel_step) funnelStep = aiData.funnel_step;
            if (aiData.funnel_step_num) funnelNum = parseInt(aiData.funnel_step_num, 10);

            if (aiData.is_order_closed === true) {
              conversationResult = 'Đã chốt đơn';
            } else if (aiData.is_high_intent === true && conversationResult !== 'Đã chốt đơn') {
              conversationResult = 'Có nhu cầu';
            } else if (aiData.conversation_result) {
              conversationResult = aiData.conversation_result;
            }

            aiAnalyzedAt = new Date().toISOString();
            aiRawAnalysis = JSON.stringify(aiData);
          }
        }
      }

      // Upsert lead into Neon
      const upsertSql = `
        INSERT INTO leads (
          project_id, tid, customer_name, phone, ad_id,
          total_messages, customer_messages, main_intent, conversation_result,
          order_combo, order_amount, order_details, dropoff_reason,
          last_customer_msg, last_ai_msg, key_evidence,
          first_msg_at, last_msg_at, updated_at, raw_transcript,
          funnel_step, funnel_step_num,
          tagged_success_at, tagged_demand_at,
          ai_analyzed_at, ai_raw_analysis
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9,
          $10, $11, $12, $13,
          $14, $15, $16,
          $17, $18, NOW(), $19,
          $20, $21,
          CASE WHEN $22::boolean THEN NOW() ELSE NULL END,
          CASE WHEN $23::boolean THEN NOW() ELSE NULL END,
          $24, $25
        )
        ON CONFLICT (project_id, tid) DO UPDATE SET
          customer_name = EXCLUDED.customer_name,
          phone = EXCLUDED.phone,
          ad_id = COALESCE(NULLIF(EXCLUDED.ad_id, ''), leads.ad_id),
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
          raw_transcript = EXCLUDED.raw_transcript,
          funnel_step = EXCLUDED.funnel_step,
          funnel_step_num = EXCLUDED.funnel_step_num,
          tagged_success_at = COALESCE(leads.tagged_success_at, EXCLUDED.tagged_success_at),
          tagged_demand_at = COALESCE(leads.tagged_demand_at, EXCLUDED.tagged_demand_at),
          ai_analyzed_at = COALESCE(EXCLUDED.ai_analyzed_at, leads.ai_analyzed_at),
          ai_raw_analysis = COALESCE(EXCLUDED.ai_raw_analysis, leads.ai_raw_analysis);
      `;

      await client.query(upsertSql, [
        projectId, tid, customerName, phone, adId,
        totalMessages, customerMessages, mainIntent, conversationResult,
        orderCombo, orderAmount, orderDetails, dropoffReason,
        lastCustomerMsg, lastAiMsg, keyEvidence,
        firstMsgAt, lastMsgAt, JSON.stringify(rawTranscript),
        funnelStep, funnelNum,
        hasSmaxSuccessTag, hasSmaxDemandTag,
        aiAnalyzedAt, aiRawAnalysis
      ]);

      if (existing) {
        updatedLeadsCount++;
      } else {
        newLeadsCount++;
      }
    }

    // Get total in DB
    const countRes = await client.query('SELECT COUNT(*) as count FROM leads WHERE project_id = $1;', [projectId]);
    const totalInDb = parseInt(countRes.rows[0].count, 10);

    await client.end();

    return res.status(200).json({
      success: true,
      projectId: projectId,
      syncedThreads: threads.length,
      newLeads: newLeadsCount,
      updatedLeads: updatedLeadsCount,
      skippedUnchanged: skippedCount,
      aiAnalyzedCount: aiAnalyzedThisSync,
      totalInDb: totalInDb,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (client) {
      try { await client.end(); } catch (e) {}
    }
    console.error('Sync Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
