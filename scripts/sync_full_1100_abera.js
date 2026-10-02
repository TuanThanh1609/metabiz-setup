/**
 * ==============================================================================
 * SYNC FULL ABERA THREADS (1100+ CONVERSATIONS) TO NEON POSTGRES
 * ==============================================================================
 * Target: hv-group / wa1360084207181848 (Abera Main Shikika) + wa1338606729337754 (Abera Serum)
 * Database: Neon Postgres (table: leads)
 * Idempotency: Strict ON CONFLICT (project_id, tid) DO UPDATE
 * Zero Duplicate BotAPI: Historical backfill does not trigger BotAPI
 * ==============================================================================
 */

const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const SMAX_CONFIG = {
  email: process.env.SMAX_EMAIL || 'tuante00@gmail.com',
  password: process.env.SMAX_PASSWORD || 'TuanThanh@160990',
  bizAlias: 'hv-group',
  pagePids: ['wa1360084207181848', 'wa1338606729337754']
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

const SIX_REGIONS_KEYWORDS = [
  'dki jakarta', 'jakarta', 'jakbar', 'jakpus', 'jaksel', 'jaktim', 'jakut',
  'jawa barat', 'jabar', 'bogor', 'sukabumi', 'cianjur', 'bandung', 'garut', 
  'tasikmalaya', 'ciamis', 'kuningan', 'cirebon', 'majalengka', 'sumedang', 
  'indramayu', 'subang', 'purwakarta', 'karawang', 'bekasi', 'pangandaran', 
  'banjar', 'cimahi', 'depok',
  'jawa tengah', 'jateng', 'cilacap', 'banyumas', 'purbalingga', 'banjarnegara', 
  'kebumen', 'purworejo', 'wonosobo', 'magelang', 'boyolali', 'klaten', 
  'sukoharjo', 'wonogiri', 'karanganyar', 'sragen', 'grobogan', 'blora', 
  'rembang', 'pati', 'kudus', 'jepara', 'demak', 'semarang', 'temanggung', 
  'kendal', 'batang', 'pekalongan', 'pemalang', 'tegal', 'brebes', 'surakarta', 
  'solo', 'salatiga',
  'di yogyakarta', 'yogyakarta', 'jogja', 'kulon progo', 'bantul', 'gunungkidul', 
  'gunung kidul', 'sleman',
  'jawa timur', 'jatim', 'pacitan', 'ponorogo', 'trenggalek', 'tulungagung', 
  'blitar', 'kediri', 'malang', 'lumajang', 'jember', 'banyuwangi', 'bondowoso', 
  'situbondo', 'probolinggo', 'pasuruan', 'sidoarjo', 'mojokerto', 'jombang', 
  'nganjuk', 'madiun', 'magetan', 'ngawi', 'bojonegoro', 'tuban', 'lamongan', 
  'gresik', 'bangkalan', 'sampang', 'pamekasan', 'sumenep', 'surabaya', 'batu',
  'banten', 'pandeglang', 'lebak', 'tangerang', 'serang', 'cilegon', 'tangsel'
];

function checkSixRegions(addrText) {
  if (!addrText) return { isEligible: false, matched: '' };
  const lower = addrText.toLowerCase();
  for (let i = 0; i < SIX_REGIONS_KEYWORDS.length; i++) {
    const kw = SIX_REGIONS_KEYWORDS[i];
    const regex = new RegExp('\\b' + kw.replace(/\s+/g, '\\s+') + '\\b', 'i');
    if (regex.test(lower)) {
      return { isEligible: true, matched: kw.toUpperCase() };
    }
  }
  return { isEligible: false, matched: '' };
}

function isValidAddress(text) {
  if (!text || text.length < 10) return false;
  if (/bolak balik|di jalan|jalan santai|kenapa|tunda|menginap|promo|harga|mimin|berapa|paket|ongkir|kak/i.test(text)) return false;
  const hasStreet = /\b(?:jl\.|jalan|jln|gang|gg\.)\s+[a-z0-9]/i.test(text);
  const hasRegion = /\b(?:rt\s*\d|rw\s*\d|kelurahan|kel\.|desa|dusun|kecamatan|kec\.|kabupaten|kab\.|kota|provinsi|prov\.|kode\s*pos|\b\d{5}\b|perum(?:ahan)?|komplek)\b/i.test(text);
  const hasKnownCity = /\b(?:jakarta|bekasi|bogor|tangerang|depok|bandung|semarang|solo|surabaya|malang|yogyakarta|jogja|garut|cirebon|sukabumi|tasikmalaya|karawang|serang|banten)\b/i.test(text);
  return (hasStreet && (hasRegion || hasKnownCity)) || (hasRegion && hasKnownCity) || (hasStreet && text.length > 25) || (hasRegion && text.length > 20);
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

  if (dropoff.includes('địa chỉ') || dropoff.includes('alamat') || transcript.includes('address') || transcript.includes('alamat') || transcript.includes('kodepos') || transcript.includes('poskod') || transcript.includes('kirim ke')) {
    return { num: 6, step: 'Step 6: Thu thập địa chỉ COD' };
  }

  if (dropoff.includes('im lặng sau khi báo') || dropoff.includes('im lặng sau báo giá') || dropoff.includes('chê đắt') || dropoff.includes('suy nghĩ') || dropoff.includes('cân nhắc') || dropoff.includes('mahal') || dropoff.includes('ragu')) {
    return { num: 5, step: 'Step 5: Xử lý từ chối' };
  }

  if (intent.includes('giá') || intent.includes('combo') || intent.includes('khuyến mãi') || intent.includes('harga') || intent.includes('promo') || intent.includes('paket') || transcript.includes('179') || transcript.includes('273') || transcript.includes('297') || transcript.includes('350') || transcript.includes('harga') || transcript.includes('paket')) {
    if (cMsgs >= 1) {
      return { num: 4, step: 'Step 4: Báo giá & Combo' };
    }
  }

  if (transcript.includes('feedback') || transcript.includes('testimoni') || transcript.includes('review') || transcript.includes('berkesan') || transcript.includes('bpom') || transcript.includes('bukti')) {
    if (cMsgs >= 1) {
      return { num: 3, step: 'Step 3: Bằng chứng xã hội' };
    }
  }

  if (cMsgs >= 1 || intent.includes('tư vấn') || intent.includes('flek') || intent.includes('nám') || intent.includes('kulit')) {
    return { num: 2, step: 'Step 2: Tư vấn vóc dáng/tình trạng da & USP' };
  }

  return { num: 1, step: 'Step 1: Tiếp cận & Chào mừng' };
}

async function loginSmax() {
  const basic = Buffer.from(SMAX_CONFIG.email + ':' + SMAX_CONFIG.password).toString('base64');
  const loginRes = await fetch('https://api.smax.ai/auth/login', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + basic, 'Content-Type': 'application/json' }
  });
  const data = await loginRes.json();
  const token = data.data?.access_token;
  if (!token) throw new Error('Không thể đăng nhập vào Smax API: ' + JSON.stringify(data));
  return token;
}

async function fetchAllThreads(token) {
  console.log(`\n--- BƯỚC 1: QUÉT DANH SÁCH HỘI THOẠI TRÊN SMAX (PAGES: ${SMAX_CONFIG.pagePids.join(', ')}) ---`);
  let allThreads = [];
  let after = '';
  let pageIndex = 1;

  while (true) {
    const payload = {
      page_pids: SMAX_CONFIG.pagePids,
      sort: 'desc',
      limit: 100
    };
    if (after) payload.after = after;

    const r = await fetch(`https://api.smax.ai/bizs/${SMAX_CONFIG.bizAlias}/threads`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      console.error(`Lỗi khi fetch page ${pageIndex}: HTTP ${r.status}`);
      break;
    }

    const json = await r.json();
    const threads = json.data || [];
    if (!threads.length) break;

    allThreads = allThreads.concat(threads);
    console.log(`  [Page ${pageIndex}] Lấy được ${threads.length} threads. (Tổng tích lũy: ${allThreads.length}/${json.total || '?'})`);

    const lastThread = threads[threads.length - 1];
    after = lastThread.last_message_at || lastThread.updated_at;

    if (threads.length < 100) break;
    pageIndex++;
    // Nhẹ nhàng delay 100ms giữa các trang
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n=> TỔNG CỘNG ĐÃ LẤY ĐƯỢC: ${allThreads.length} THREADS TỪ SMAX.`);
  return allThreads;
}

async function main() {
  const startTime = Date.now();
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('Đã kết nối Neon Postgres thành công.');

  const token = await loginSmax();
  console.log('Đăng nhập Smax thành công.');

  // 1. Fetch all threads
  const allThreads = await fetchAllThreads(token);

  // 2. Fetch existing leads from Neon DB
  console.log('\n--- BƯỚC 2: TẢI TRẠNG THÁI HIỆN TẠI TỪ NEON DB ---');
  const existingRes = await client.query('SELECT tid, last_msg_at, updated_at FROM leads WHERE project_id = $1;', ['abera']);
  const existingMap = new Map();
  existingRes.rows.forEach(r => existingMap.set(r.tid, r));
  console.log(`Đã tải ${existingMap.size} leads hiện có trong DB cho dự án 'abera'.`);

  // 3. Process threads in concurrent batches
  console.log('\n--- BƯỚC 3: ĐỒNG BỘ CHI TIẾT TIN NHẮN & PHÂN TÍCH (POOL CHUNKS: 12) ---');
  const BATCH_SIZE = 12;
  let newCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  let orderCount = 0;
  let demandCount = 0;
  let processed = 0;

  for (let i = 0; i < allThreads.length; i += BATCH_SIZE) {
    const chunk = allThreads.slice(i, i + BATCH_SIZE);

    await Promise.all(chunk.map(async (t) => {
      const tid = t.tid || t.customer_pid;
      if (!tid) return;

      const customer = t.customer || {};
      const wa = t.whatsapp || customer.whatsapp || {};
      const customerName = customer.name || wa.name || t.name || 'Pelanggan WhatsApp';
      let phone = customer.phone || wa.id || tid;
      if (phone.startsWith('waID.')) {
        phone = phone.replace('waID.', '+62 ');
      } else if (phone.startsWith('waMY.')) {
        phone = phone.replace('waMY.', '+60 ');
      }
      const adId = wa.ad_id || t.ad_id || '';
      const threadLastMsg = t.last_message_at || t.updated_at;

      const existing = existingMap.get(tid);

      // Smart Change Detection: Skip unchanged threads
      if (existing && existing.last_msg_at && threadLastMsg) {
        const existTime = new Date(existing.last_msg_at).getTime();
        const threadTime = new Date(threadLastMsg).getTime();
        if (Math.abs(existTime - threadTime) < 2000) {
          skippedCount++;
          return;
        }
      }

      const targetPagePid = t.page_pid || SMAX_CONFIG.pagePids[0];

      // Fetch messages for this thread
      let rawMsgs = [];
      try {
        const msgRes = await fetch(`https://api.smax.ai/bizs/${SMAX_CONFIG.bizAlias}/pages/${targetPagePid}/threads/${tid}/messages?sort=created_at&limit=100`, {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        if (msgRes.ok) {
          const msgJson = await msgRes.json();
          rawMsgs = msgJson.data || [];
        }
      } catch (err) {
        // Fallback if failed
      }

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
            sender: 'Abera AI',
            role: 'assistant',
            text: text
          });
        }
      }

      let firstMsgAt = cleanMsgs[0]?.created_at || t.created_at || new Date().toISOString();
      let lastMsgAt = cleanMsgs[cleanMsgs.length - 1]?.created_at || threadLastMsg || new Date().toISOString();

      // Heuristic Intent & Result
      let conversationResult = 'Đang tư vấn';
      let orderCombo = '';
      let orderAmount = 0;
      let orderDetails = '';
      let dropoffReason = '';
      let mainIntent = 'Hỏi thông tin Serum Abera';
      let keyEvidence = '';

      const allCustomerText = rawTranscript.filter(r => r.role === 'customer').map(r => r.text).join(' \n ');
      const allPageText = rawTranscript.filter(r => r.role === 'assistant').map(r => r.text).join(' \n ');
      const allText = rawTranscript.map(r => `${r.role}: ${r.text}`).join('\n');

      const hasSmaxSuccessTag = (t.tag_aliases && (t.tag_aliases.includes('thanh_cong') || t.tag_aliases.includes('thành công'))) || 
                                (t.tags && (t.tags.includes('Thành công') || t.tags.includes('thanh_cong') || t.tags.includes('Đã chốt đơn')));
      const hasSmaxDemandTag = (t.tag_aliases && (t.tag_aliases.includes('co_nhu_cau') || t.tag_aliases.includes('có nhu cầu'))) || 
                               (t.tags && (t.tags.includes('Có nhu cầu') || t.tags.includes('co_nhu_cau')));

      // Main Intent classification
      if (/flek|flak|hitam|noda|melasma|kusam|bintik|bekas jerawat/i.test(allCustomerText)) {
        mainIntent = 'Trị nám, đốm nâu & tàn nhang (Flek Hitam & Noda)';
      } else if (/kerut|keriput|garis|kendur|penuaan/i.test(allCustomerText)) {
        mainIntent = 'Chống lão hóa & Nếp nhăn (Kerutan)';
      } else if (/harga|promo|paket|berapa|ongkir|cod/i.test(allCustomerText)) {
        mainIntent = 'Hỏi giá & Khuyến mãi Serum Abera';
      } else if (/cara pakai|aturan|cocok|aman|bpom/i.test(allCustomerText)) {
        mainIntent = 'Tư vấn công dụng & Cách dùng Serum Abera';
      }

      // Check Order Summary from Smax Bot ("RINGKASAN PESANAN")
      let isOrder = false;
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
          isOrder = true;
        }
      }

      // Fallback: Check customer address in messages
      if (!addrStr && customerMessages > 0) {
        for (const m of cleanMsgs) {
          const isCust = (m.sender_pid !== targetPagePid && m.sender_pid !== m.page_pid) || (m.sender_pid === tid);
          if (isCust && m.message) {
            const txt = m.message.trim();
            const addrM = txt.match(/(?:Alamat\s*(?:lengkap|pengiriman)?)\s*[:\.]\s*([^\n\r]+)/i);
            if (addrM && addrM[1].trim().length > 5 && !/mimin|tunggu|data|kirim data|rekap|berapa/i.test(addrM[1])) {
              addrStr = addrM[1].trim();
              isOrder = true;
            }
            const nmM = txt.match(/(?:Nama\s*(?:lengkap|penerima)?|Atas\s*nama|Nm)\s*[:\.]\s*([^\n\r]+)/i);
            if (nmM && nmM[1].trim().length < 50 && !/mimin|tunggu/i.test(nmM[1])) {
              custOrderName = nmM[1].trim();
            }
            const phM = txt.match(/(?:No\s*(?:HP|WA|telepon|hp)?|Nomor\s*HP|WhatsApp)\s*[:\.]\s*([0-9\+\-\s]{9,16})/i);
            if (phM && !custOrderPhone) {
              custOrderPhone = phM[1].replace(/[^0-9]/g, '');
            }
            if (!addrStr && isValidAddress(txt)) {
              addrStr = txt;
              isOrder = true;
            }
          }
        }
      }

      // Check combo & price
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

      if (isOrder || hasSmaxSuccessTag) {
        conversationResult = 'Đã chốt đơn';
        orderCombo = pkgStr;
        orderAmount = totalAmount;
        if (!addrStr) addrStr = 'Đã xác nhận địa chỉ giao hàng qua chat';
        keyEvidence = addrStr;
        orderDetails = `📦 ${orderCombo} (Rp ${orderAmount.toLocaleString()}) | 👤 Người nhận: ${custOrderName} | 📞 ${custOrderPhone} | 📍 Địa chỉ: ${addrStr} | 🚚 COD Free Shipping`;
        orderCount++;
      } else if (customerMessages >= 3 || hasSmaxDemandTag) {
        conversationResult = 'Có nhu cầu';
        keyEvidence = lastCustomerMsg;
        if (/mahal|kurang|diskon|tanya dulu|belum ada uang/i.test(allCustomerText)) {
          dropoffReason = 'Khách cân nhắc giá / Chưa sẵn sàng mua';
        } else {
          dropoffReason = 'Khách im lặng sau khi báo giá (Cần Follow-up)';
        }
        demandCount++;
      } else if (customerMessages === 0) {
        conversationResult = 'Chưa phản hồi';
        dropoffReason = 'Khách click quảng cáo nhưng chưa nhắn tin';
      } else {
        conversationResult = 'Đang tư vấn';
        if (/harga|berapa|promo/i.test(lastCustomerMsg)) {
          dropoffReason = 'Khách vừa hỏi giá, đang chờ chốt';
        }
      }

      const tempLead = {
        conversation_result: conversationResult,
        order_details: orderDetails,
        raw_transcript: rawTranscript,
        dropoff_reason: dropoffReason,
        main_intent: mainIntent,
        customer_messages: customerMessages
      };
      const { num: funnelNum, step: funnelStep } = determineFunnelStep(tempLead);

      // Upsert lead into Neon
      const upsertSql = `
        INSERT INTO leads (
          project_id, tid, customer_name, phone, ad_id,
          total_messages, customer_messages, main_intent, conversation_result,
          order_combo, order_amount, order_details, dropoff_reason,
          last_customer_msg, last_ai_msg, key_evidence,
          first_msg_at, last_msg_at, updated_at, raw_transcript,
          funnel_step, funnel_step_num,
          tagged_success_at, tagged_demand_at
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9,
          $10, $11, $12, $13,
          $14, $15, $16,
          $17, $18, NOW(), $19,
          $20, $21,
          CASE WHEN $22::boolean THEN NOW() ELSE NULL END,
          CASE WHEN $23::boolean THEN NOW() ELSE NULL END
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
          tagged_demand_at = COALESCE(leads.tagged_demand_at, EXCLUDED.tagged_demand_at);
      `;

      await client.query(upsertSql, [
        'abera', tid, custOrderName, phone, adId,
        totalMessages, customerMessages, mainIntent, conversationResult,
        orderCombo, orderAmount, orderDetails, dropoffReason,
        lastCustomerMsg, lastAiMsg, keyEvidence,
        firstMsgAt, lastMsgAt, JSON.stringify(rawTranscript),
        funnelStep, funnelNum,
        hasSmaxSuccessTag, hasSmaxDemandTag
      ]);

      if (existing) {
        updatedCount++;
      } else {
        newCount++;
      }
    }));

    processed += chunk.length;
    if (processed % 60 === 0 || processed >= allThreads.length) {
      console.log(`  [Tiến độ: ${processed}/${allThreads.length}] Mới: ${newCount} | Cập nhật: ${updatedCount} | Đã chốt đơn: ${orderCount} | Có nhu cầu: ${demandCount} | Bỏ qua: ${skippedCount}`);
    }

    // Nhẹ nhàng delay 60ms giữa các chunk để bảo vệ Smax API
    await new Promise(resolve => setTimeout(resolve, 60));
  }

  // 4. Verify Final Database Stats
  console.log('\n--- BƯỚC 4: THỐNG KÊ DỮ LIỆU ĐÃ ĐỒNG BỘ TRÊN NEON POSTGRES ---');
  const countRes = await client.query('SELECT COUNT(*) as total FROM leads WHERE project_id = $1;', ['abera']);
  const totalInDb = parseInt(countRes.rows[0].total, 10);

  const statusStats = await client.query(`
    SELECT conversation_result, COUNT(*) as count 
    FROM leads 
    WHERE project_id = 'abera' 
    GROUP BY conversation_result 
    ORDER BY count DESC;
  `);

  const funnelStats = await client.query(`
    SELECT funnel_step, COUNT(*) as count 
    FROM leads 
    WHERE project_id = 'abera' 
    GROUP BY funnel_step 
    ORDER BY funnel_step ASC;
  `);

  const orderStats = await client.query(`
    SELECT 
      COUNT(*) as total_orders,
      SUM(order_amount) as total_revenue
    FROM leads 
    WHERE project_id = 'abera' AND conversation_result = 'Đã chốt đơn';
  `);

  const durationSec = Math.round((Date.now() - startTime) / 1000);

  console.log(`\n======================================================`);
  console.log(`🎉 HOÀN TẤT ĐỒNG BỘ TOÀN BỘ HỘI THOẠI ABERA INDONESIA!`);
  console.log(`======================================================`);
  console.log(`- Thời gian thực thi: ${durationSec} giây`);
  console.log(`- Tổng hội thoại trên Smax: ${allThreads.length}`);
  console.log(`- Tổng hội thoại trong Neon DB: ${totalInDb}`);
  console.log(`- Đơn chốt thành công: ${orderStats.rows[0].total_orders} đơn (Tổng doanh thu: Rp ${Number(orderStats.rows[0].total_revenue || 0).toLocaleString()})`);
  console.log(`\nPhân bổ theo trạng thái hội thoại:`);
  statusStats.rows.forEach(r => console.log(`  * ${r.conversation_result}: ${r.count}`));
  console.log(`\nPhân bổ theo 7 Bước Phễu Bán Hàng:`);
  funnelStats.rows.forEach(r => console.log(`  * ${r.funnel_step}: ${r.count}`));
  console.log(`======================================================\n`);

  await client.end();
}

main().catch(err => {
  console.error('Fatal Error in bulk sync:', err);
  process.exit(1);
});
