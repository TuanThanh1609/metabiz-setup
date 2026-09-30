let cachedToken = null;
let tokenExpiry = null;

const SMAX_EMAIL = process.env.SMAX_EMAIL || 'tuante00@gmail.com';
const SMAX_PASSWORD = process.env.SMAX_PASSWORD || 'TuanThanh@160990';

async function loginToSmax() {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }
  
  const credentials = Buffer.from(`${SMAX_EMAIL}:${SMAX_PASSWORD}`).toString('base64');
  
  const response = await fetch('https://api.smax.ai/auth/login', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credentials}`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Referer': 'https://smax.ai/'
    }
  });
  
  const text = await response.text();
  let json;
  try { json = JSON.parse(text); } catch(e) {
    throw new Error(`Smax login parse error: ${response.status} - ${text.substring(0, 200)}`);
  }
  
  if (json.data && json.data.access_token) {
    cachedToken = json.data.access_token;
    tokenExpiry = Date.now() + 60 * 60 * 1000;
    return cachedToken;
  }
  throw new Error(`Smax login failed: ${response.status} - ${JSON.stringify(json).substring(0, 300)}`);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const token = await loginToSmax();

    // Parse time range filter: 'cycle' (default), 'today', '24h', 'all'
    const url = new URL(req.url, 'http://localhost');
    const range = req.query?.range || url.searchParams.get('range') || 'cycle';

    const now = new Date();
    let startTime = null;
    let rangeLabel = 'Chu kỳ kịch bản v1.5 (Gần nhất)';

    if (range === 'today') {
      const utc7Time = new Date(now.getTime() + (7 * 60 * 60 * 1000));
      const startOfDayUtc7 = new Date(utc7Time);
      startOfDayUtc7.setUTCHours(0, 0, 0, 0);
      startTime = new Date(startOfDayUtc7.getTime() - (7 * 60 * 60 * 1000));
      rangeLabel = 'Hôm nay (30/09)';
    } else if (range === '24h') {
      startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      rangeLabel = '24 giờ qua';
    } else if (range === 'all') {
      startTime = null;
      rangeLabel = 'Toàn bộ dữ liệu (200 hội thoại)';
    } else {
      // Default: 'cycle' (Từ thời điểm deploy kịch bản v1.4 / v1.5 lúc 15:30 29/09)
      startTime = new Date('2026-09-29T08:30:00.000Z');
      rangeLabel = 'Chu kỳ v1.5 (từ 29/09 15:30 đến nay)';
    }

    // Pull threads from Smax
    const threadsRes = await fetch('https://api.smax.ai/bizs/hv-group/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "page_pids": ["wa1360084207181848"], "sort": "desc", "limit": 200, "after": "", "before": "", 
        "tags": [], "tags_to_exclude": [], "tags_empty": false, "tags_condition": "OR", "types": [], 
        "isnew": false, "newtop": false, "reply": false, "phone": false, "nophone": false, "customers": false, 
        "is_group": false, "is_business": false, "is_message": false, "auto_group_new_message_bubble": false, 
        "ai_control": false, "sort_by_created_at": false, "dateRange": [], "post_ids": null, "ad_ids": [], 
        "users": [], "seen": false, "ads": false, "no_user": false
      })
    });
    
    const threadsJson = await threadsRes.json();
    let allThreads = threadsJson.data || [];
    
    // Filter threads based on selected time range
    let threads = allThreads;
    if (startTime) {
      threads = allThreads.filter(t => {
        const lastMsg = t.last_message_at || t.updated_at || t.created_at;
        return new Date(lastMsg) >= startTime;
      });
    }

    // Cap at 100 threads to guarantee response within Vercel execution limit
    if (threads.length > 100) {
      threads = threads.slice(0, 100);
    }

    const totalConversations = threads.length;
    let stageCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    let confirmedOrders = [];

    // Concurrently fetch and analyze messages for each thread
    const threadPromises = threads.map(async (t) => {
      try {
        const msgsRes = await fetch(`https://api.smax.ai/bizs/hv-group/pages/wa1360084207181848/threads/${t.tid}/messages?limit=100`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const msgsJson = await msgsRes.json();
        const messages = msgsJson.data || [];

        const botMsgs = messages.filter(m => m.ai_generated === true || m.sender_pid === 'wa1360084207181848');
        const custMsgs = messages.filter(m => !m.ai_generated && m.sender_pid !== 'wa1360084207181848');

        const botText = botMsgs.map(m => (m.message || '').toLowerCase()).join(' ');
        const custText = custMsgs.map(m => (m.message || '').toLowerCase()).join(' ');
        const tags = (t.tag_aliases || []).map(x => typeof x === 'string' ? x.toLowerCase() : (x.alias || x.name || '').toLowerCase());

        // Stage 1: Welcome/Hook (nút chẩn đoán da)
        const hasStage1 = botText.includes('selamat datang') || botText.includes('halo kak') || botText.includes('menyapa') || botMsgs.length > 0;
        if (hasStage1) stageCounts[1]++;

        // Stage 2: Chọn vấn đề da
        const skinKeywords = ['kerutan', 'flek', 'kusam', 'kendur', 'jerawat', 'penuaan', 'garis halus', 'anti aging', 'kulit'];
        const hasStage2 = skinKeywords.some(k => custText.includes(k)) || botText.includes('masalah kulit');
        if (hasStage2) stageCounts[2]++;

        // Stage 3: USP Product Image (keunggulan sản phẩm)
        const uspKeywords = ['keunggulan abera', 'formula premium', 'keunggulan', 'usp', 'diformulasi khusus', 'dibanding produk lain'];
        const hasStage3 = uspKeywords.some(k => botText.includes(k)) || botText.includes('464457-uspproduct');
        if (hasStage3) stageCounts[3]++;

        // Stage 4: Tư vấn ngắn + Social Proof
        const consultKeywords = ['collagen', 'hyaluronic', 'peptide', 'testimoni', 'pelanggan', 'pemakaian rutin'];
        const hasStage4 = consultKeywords.some(k => botText.includes(k));
        if (hasStage4) stageCounts[4]++;

        // Stage 5: Xem giá Decoy Pricing
        const priceKeywords = ['273.000', '350.000', '179.000', 'paket 2', 'paket 3', 'paket 1', 'beli 2 gratis 1', 'promo spesial', 'gratis ongkir'];
        const hasStage5 = priceKeywords.some(k => botText.includes(k));
        if (hasStage5) stageCounts[5]++;

        // Stage 6: Checkout + 3 Cam kết vàng
        const hasGuarantees = botText.includes('cod') && (botText.includes('cek barang') || botText.includes('bpom') || botText.includes('cek dulu'));
        const hasForm = botText.includes('nama penerima') || botText.includes('alamat lengkap');
        const hasCustChosePackage = custText.includes('paket 1') || custText.includes('paket 2') || custText.includes('paket 3') || custText.includes('ambil promo');
        const hasStage6 = hasGuarantees || hasForm || hasCustChosePackage;
        if (hasStage6) stageCounts[6]++;

        // Stage 7: Thu thập địa chỉ
        const addrKeywords = ['jalan', 'jl.', 'jl ', 'alamat', 'rt', 'rw', 'kelurahan', 'kecamatan', 'kabupaten', 'desa', 'kode pos'];
        const hasAddr = addrKeywords.some(k => custText.includes(k));
        const hasPhone = /(?:08|\+?628)\d{8,12}/.test(custText);
        const hasStage7 = (hasAddr && custMsgs.length >= 2) || (hasPhone && hasAddr);
        if (hasStage7) stageCounts[7]++;

        // Stage 8: Xác nhận đơn hàng
        const confirmKeywords = ['ya', 'benar', 'betul', 'sudah benar', 'ok kirim', 'data benar', 'iya', 'ok'];
        const hasCustConfirm = confirmKeywords.some(k => custText.includes(k));
        const hasOrderSummary = botText.includes('ringkasan pesanan') || botText.includes('pesanan diteruskan') || botText.includes('terima kasih kak') || botText.includes('tim gudang');
        const hasSuccessTag = tags.some(x => x.includes('thanh_cong') || x.includes('thành công') || x.includes('order'));
        const hasStage8 = (hasStage7 && (hasCustConfirm || hasOrderSummary)) || hasSuccessTag;
        
        if (hasStage8) {
          stageCounts[8]++;
          
          let custName = t.customer?.name || t.customers?.[0]?.name || t.whatsapp?.from?.name || 'Khách hàng';
          confirmedOrders.push({
            tid: t.tid,
            name: custName,
            tags: t.tag_aliases || [],
            time: t.last_message_at || t.updated_at || t.created_at,
            status: hasSuccessTag ? 'Đã gắn tag thành công' : 'Đã chốt (chờ tag)'
          });
        }
      } catch (e) {
        console.error(`Error processing thread ${t.tid}:`, e.message);
      }
    });

    await Promise.all(threadPromises);

    const getRate = (stage) => totalConversations > 0 ? parseFloat(((stageCounts[stage] / totalConversations) * 100).toFixed(1)) : 0;

    const funnel = [
      { stage: 1, name: "Welcome/Hook (nút chẩn đoán da)", count: stageCounts[1], rate: getRate(1), target: 90 },
      { stage: 2, name: "Chọn vấn đề da", count: stageCounts[2], rate: getRate(2), target: 70 },
      { stage: 3, name: "USP Product Image (keunggulan)", count: stageCounts[3], rate: getRate(3), target: 60 },
      { stage: 4, name: "Tư vấn ngắn + Social Proof", count: stageCounts[4], rate: getRate(4), target: 50 },
      { stage: 5, name: "Xem giá Decoy Pricing", count: stageCounts[5], rate: getRate(5), target: 45 },
      { stage: 6, name: "Checkout + 3 Cam kết vàng", count: stageCounts[6], rate: getRate(6), target: 25 },
      { stage: 7, name: "Thu thập địa chỉ", count: stageCounts[7], rate: getRate(7), target: 15 },
      { stage: 8, name: "Xác nhận đơn hàng", count: stageCounts[8], rate: getRate(8), target: 10 }
    ];

    // Data from CHANGELOG-META-AGENT.md
    const cycles = [
      { cycle: "#0", time: "29/09 00:00–09:30", convos: 57, orders: 2, rate: "3.5%", target: "10%", status: "Chưa đạt", isCurrent: false },
      { cycle: "#1", time: "29/09 15:30 – 30/09 11:30", convos: 46, orders: 5, rate: "10.9%", target: "10%", status: "Đạt KPI", isCurrent: range === 'cycle' },
      { cycle: "#2", time: "30/09 ~17:30", convos: totalConversations, orders: stageCounts[8], rate: `${getRate(8)}%`, target: "10%", status: getRate(8) >= 10 ? "Đạt mục tiêu" : "Đang chạy...", isCurrent: range !== 'cycle' }
    ];

    const changelog = [
      {
        version: "v1.5",
        date: "29/09/2026, 18:00",
        title: "Price Inquiry Exit Condition & Anti-Block",
        author: "User + AI Agent",
        problem: "Khách hỏi giá bị AI ép xem testimoni thay vì trả lời (do rule cấm nhắc giá quá chặt).",
        items: [
          "abera-skin-consultation: Thêm EXIT CONDITION khi khách hỏi giá → chuyển ngay sang pricing.",
          "Đổi rule 'DO NOT mention prices' thành 'DO NOT proactively mention prices'.",
          "Thêm guardrail cấm chặn khách hỏi giá. Đã giúp chốt đơn Maria Jenny Paket 2 thành công 100%."
        ]
      },
      {
        version: "v1.4",
        date: "29/09/2026, 15:35",
        title: "USP Product Image Integration",
        author: "User + AI Agent",
        problem: "Drop-off lớn nhất ④→⑤ (-46.5%) — khách chưa hiểu giá trị sản phẩm trước khi thấy giá.",
        items: [
          "abera-usp-product-image (🆕 UI Skill): Tạo mới — gửi hình USP keunggulan sản phẩm (Image type).",
          "abera-skin-consultation: +Step 2 mới — trigger hình USP sau tư vấn thành phần, TRƯỚC testimoni & giá.",
          "Flow mới: Welcome → Tư vấn da → 🆕 USP Image → Social Proof → Giá → Checkout."
        ]
      },
      {
        version: "v1.3",
        date: "29/09/2026, 11:10",
        title: "Social Proof + Urgency Timer + Anti-Upsell",
        author: "AI Agent",
        problem: "Mất đơn Yuni Wahyuni do AI chèo kéo upsell combo khi khách đã chốt mua 1 lọ.",
        items: [
          "abera-pricing-promotions: Thêm bước Social Proof (ảnh testimoni) bắt buộc + Urgency timer 2 giờ.",
          "abera-order-checkout: Thêm CRITICAL NO UPSELL — cấm 100% việc gợi ý gói đắt hơn khi đang checkout.",
          "abera-objection-handler: Phân tách rõ 'chê đắt' khi đã chọn gói thì không upsell mà thu địa chỉ ngay."
        ]
      },
      {
        version: "v1.2",
        date: "29/09/2026, 10:45",
        title: "Fix Response Quá Dài & Skill Trigger Order",
        author: "AI Agent",
        problem: "AI dump bảng giá 150-200 từ ở tin nhắn đầu do Meta AI dùng intent matching bỏ qua thứ tự skill.",
        items: [
          "abera-welcome-router: Bắt buộc kích hoạt đầu tiên trên mọi tin nhắn mở đầu, giới hạn 60 từ, loại bỏ hoàn toàn giá.",
          "abera-skin-consultation: Giới hạn 50 từ/tin, 1 câu hỏi/lần, cấm nhắc giá.",
          "abera-pricing-promotions: Chuyển sang dạng Compact (~40 từ), giới hạn tối đa 80 từ."
        ]
      },
      {
        version: "v1.1",
        date: "29/09/2026, 09:40",
        title: "Fix Thứ Tự Trigger Phễu & 3 Cam Kết Vàng",
        author: "AI Agent",
        problem: "Báo giá quá sớm (70% cuộc trò chuyện) và thiếu cam kết vàng khi checkout (36%).",
        items: [
          "abera-welcome-router: Khách hỏi giá vẫn ưu tiên chào và hiển thị nút chẩn đoán da.",
          "abera-pricing-promotions: Thêm Critical Gate chặn kích hoạt ở tin đầu.",
          "abera-order-checkout: Bắt buộc 100% tin nhắn checkout phải có 3 Cam kết vàng (COD, Cek Barang, BPOM)."
        ]
      },
      {
        version: "v1.0",
        date: "29/09/2026, 00:00",
        title: "Khởi Tạo Kịch Bản Mới Lần 1",
        author: "User + AI Agent",
        problem: "WhatsApp Flow crash trên nhiều thiết bị khách hàng, form không mở được.",
        items: [
          "Gỡ bỏ hoàn toàn WhatsApp Flow abera-order-flow khỏi Kỹ Năng UI.",
          "Khôi phục abera-order-checkout theo luồng thu thập thông tin trực tiếp qua chat.",
          "Phân nhánh địa lý: Pulau Jawa (100% COD) và Luar Jawa (DP 30% BCA)."
        ]
      }
    ];

    const backlog = [
      { id: "B1", task: "Social Proof (testimoni) bắt buộc giữa Giá & Checkout", status: "Đã triển khai v1.3", impact: "Tăng ③→④ conversion" },
      { id: "B2", task: "Urgency timer ('promo hết trong 2 giờ')", status: "Đã triển khai v1.3", impact: "Tăng ④→⑤ conversion" },
      { id: "B3", task: "Anti-upsell khi khách chê đắt hoặc đã chọn gói", status: "Đã triển khai v1.3", impact: "Giảm rớt đơn tại checkout" },
      { id: "B4", task: "Tối ưu Follow-up sequence cho khách im lặng", status: "Đang theo dõi", impact: "Tăng tỷ lệ re-engagement" },
      { id: "B5", task: "Phân loại khách theo nguồn (CTWA Ads vs Organic)", status: "Chờ triển khai", impact: "Tối ưu chi phí quảng cáo" }
    ];

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      range,
      rangeLabel,
      totalConversations,
      funnel,
      confirmedOrders,
      cycles,
      changelog,
      backlog
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
