/**
 * ==============================================================================
 * LADIPAGE WEBHOOK TO WHATSAPP MINI-CRM & DEEP LINK CONFIRMATION
 * ==============================================================================
 * Endpoint: POST /api/ladipage-webhook?project_id={project_id}
 * Projects: abera (Indonesia), fitgum (Malaysia), or any project in Neon DB
 * Description:
 *   1. Hứng dữ liệu đơn hàng khi khách submit Form trên LadiPage (Tên, SĐT, Đ/c, Gói).
 *   2. Tự động chuẩn hóa số điện thoại quốc tế (+62 Indonesia, +60 Malaysia, +84 VN).
 *   3. Lưu đơn hàng vào Neon Postgres (bảng leads) với trạng thái 'Đã chốt đơn' (Step 7).
 *   4. Sinh mã đơn hàng và tạo link WhatsApp Pre-filled (https://wa.me/...) chứa đầy đủ
 *      thông tin đơn hàng + hashtag #XACNHANDON để Smax Bot gửi tin xác nhận tức thì.
 *   5. Trả về JSON cho LadiPage hiển thị nút mở WhatsApp hoặc tự động Redirect.
 * ==============================================================================
 */

const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

// Helper to extract fields from standard LadiPage form_data array or flat JSON
function extractLadiFormData(body) {
  let name = '';
  let phone = '';
  let address = '';
  let combo = '';
  let note = '';
  let amount = 0;
  let adId = '';
  let utmSource = '';
  let utmCampaign = '';

  if (!body || typeof body !== 'object') {
    return { name, phone, address, combo, note, amount, adId, utmSource, utmCampaign };
  }

  // 1. If LadiPage sends nested form_data array
  if (Array.isArray(body.form_data)) {
    for (const item of body.form_data) {
      if (!item || !item.name) continue;
      const key = String(item.name).toLowerCase().trim().replace(/[\s_-]/g, '');
      const val = item.value != null ? String(item.value).trim() : '';

      if (key === 'name' || key === 'fullname' || key === 'hoten' || key === 'nama' || key === 'namalengkap') {
        name = val;
      } else if (key === 'phone' || key === 'tel' || key === 'sdt' || key === 'whatsapp' || key === 'nohp' || key === 'nowa' || key === 'telepon') {
        phone = val;
      } else if (key === 'address' || key === 'diachi' || key === 'alamat' || key === 'street' || key === 'alamatpengiriman') {
        address = val;
      } else if (key === 'combo' || key === 'product' || key === 'sanpham' || key === 'paket' || key === 'package' || key === 'item') {
        combo = val;
      } else if (key === 'note' || key === 'ghichu' || key === 'catatan' || key === 'message' || key === 'pesan') {
        note = val;
      } else if (key === 'price' || key === 'amount' || key === 'gia' || key === 'total' || key === 'totalrevenue') {
        const num = parseFloat(String(val).replace(/[^0-9.]/g, ''));
        if (!isNaN(num) && num > 0) amount = num;
      }
    }
  }

  // 2. Fallback to top-level object fields (flat JSON)
  if (!name) name = body.name || body.full_name || body.fullname || body.customer_name || body.nama || '';
  if (!phone) phone = body.phone || body.phone_number || body.tel || body.sdt || body.whatsapp || body.no_hp || '';
  if (!address) address = body.address || body.street_address || body.dia_chi || body.alamat || '';
  if (!combo) combo = body.combo || body.product || body.package || body.san_pham || body.paket || '';
  if (!note) note = body.note || body.ghi_chu || body.catatan || body.message || '';
  if (!amount && body.total_revenue) amount = parseFloat(body.total_revenue) || 0;
  if (!amount && body.amount) amount = parseFloat(body.amount) || 0;
  if (!amount && body.price) amount = parseFloat(body.price) || 0;

  // 3. Extract Tracking / Ads parameters
  adId = body.ad_id || body.utm_content || body.utm_term || '';
  utmSource = body.utm_source || '';
  utmCampaign = body.utm_campaign || '';

  return { name, phone, address, combo, note, amount, adId, utmSource, utmCampaign };
}

// Helper to normalize international phone numbers
function normalizePhoneNumber(rawPhone, projectId) {
  if (!rawPhone) return { cleanPhone: '', displayPhone: '', tidPrefix: 'wa' };
  let digits = String(rawPhone).replace(/[^0-9]/g, '');

  if (projectId === 'abera') {
    // Indonesia: starts with 08 -> 628
    if (digits.startsWith('0')) digits = '62' + digits.slice(1);
    if (!digits.startsWith('62') && digits.startsWith('8')) digits = '62' + digits;
    return {
      cleanPhone: digits,
      displayPhone: `+${digits.slice(0, 2)} ${digits.slice(2, 5)}-${digits.slice(5, 9)}-${digits.slice(9)}`.trim(),
      tidPrefix: 'waID'
    };
  } else if (projectId === 'fitgum') {
    // Malaysia: starts with 01 -> 601
    if (digits.startsWith('0')) digits = '60' + digits.slice(1);
    if (!digits.startsWith('60') && digits.startsWith('1')) digits = '60' + digits;
    return {
      cleanPhone: digits,
      displayPhone: `+${digits.slice(0, 2)} ${digits.slice(2, 4)}-${digits.slice(4, 8)} ${digits.slice(8)}`.trim(),
      tidPrefix: 'waMY'
    };
  } else {
    // Vietnam / Default: starts with 09/08/03 -> 84
    if (digits.startsWith('0')) digits = '84' + digits.slice(1);
    return {
      cleanPhone: digits,
      displayPhone: `+${digits}`,
      tidPrefix: 'waVN'
    };
  }
}

// Generate tailored WhatsApp pre-filled text per project & language
function buildWhatsAppMessage(projectId, orderId, name, phone, address, combo, amount, currency) {
  if (projectId === 'abera') {
    // Bahasa Indonesia
    return `Halo Abera Indonesia! 🌸 Saya baru saja pesan melalui Website:
📋 ID Pesanan: #${orderId}
📦 Paket: ${combo} (Rp ${amount.toLocaleString()})
👤 Nama: ${name}
📞 No HP: +${phone}
📍 Alamat: ${address}
🚚 Pengiriman: Gratis Ongkir COD (Bayar di Tempat)

#KONFIRMASI_PESANAN - Mimin mohon konfirmasi pesanan saya & kirimkan nomor resinya ya! 🙏`;
  } else if (projectId === 'fitgum') {
    // Bahasa Melayu / English
    return `Hi Fitgum Malaysia! 🍇 I just placed an order via Website:
📋 Order ID: #${orderId}
📦 Combo: ${combo} (RM ${amount})
👤 Name: ${name}
📞 Phone: +${phone}
📍 Address: ${address}
🚚 Delivery: Free Shipping COD (Cash on Delivery)

#CONFIRM_ORDER - Please confirm my order and send tracking details! 🙏`;
  } else {
    // Tiếng Việt
    return `Chào shop! Tôi vừa đặt hàng qua Website:
📋 Mã đơn hàng: #${orderId}
📦 Sản phẩm/Combo: ${combo} (${amount.toLocaleString()} ${currency})
👤 Người nhận: ${name}
📞 Số điện thoại: +${phone}
📍 Địa chỉ giao hàng: ${address}
🚚 Hình thức: Giao hàng kiểm tra thanh toán tận nơi (COD)

#XACNHANDON - Shop xác nhận đơn và gửi mã vận đơn sớm giúp mình nhé! 🙏`;
  }
}

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Determine Project ID from query parameter or body payload
  const projectId = (req.query?.project_id || req.body?.project_id || req.query?.project || 'abera').toLowerCase().trim();

  // Connect to Neon Postgres
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // 1. Fetch Project Config
    const projRes = await client.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    if (projRes.rows.length === 0) {
      await client.end();
      return res.status(404).json({
        success: false,
        error: `Dự án '${projectId}' không tồn tại trên hệ thống CRM. Vui lòng kiểm tra lại tham số ?project_id=`
      });
    }
    const project = projRes.rows[0];
    const currency = project.currency || (projectId === 'abera' ? 'IDR' : 'RM');
    const waPhone = project.whatsapp_phone || (projectId === 'abera' ? '6285284828469' : '601170078728');

    // Handle GET Request (Health check & documentation for setup)
    if (req.method === 'GET') {
      await client.end();
      return res.status(200).json({
        success: true,
        endpoint: `/api/ladipage-webhook?project_id=${projectId}`,
        project: {
          id: project.id,
          name: project.name,
          currency: currency,
          whatsapp_phone: waPhone
        },
        instruction: 'Gửi request POST từ LadiPage Webhook tới URL này. Hệ thống tự động lưu đơn và sinh WhatsApp Deep Link xác nhận đơn.',
        sample_post_payload: {
          form_data: [
            { name: 'name', value: 'Siti Rahma' },
            { name: 'phone', value: '08123456789' },
            { name: 'address', value: 'Jl. Sudirman No. 12, RT 01/RW 02, Jakarta Selatan' },
            { name: 'combo', value: 'Paket 2 Botol (Beli 2 Gratis 1)' }
          ],
          total_revenue: 297000,
          utm_source: 'facebook',
          utm_campaign: 'CTWA_Abera_Indo',
          ad_id: '23860449379260793'
        }
      });
    }

    // 2. Parse Incoming LadiPage Data
    const rawData = req.body || {};
    const extracted = extractLadiFormData(rawData);

    let customerName = extracted.name || 'Khách hàng LadiPage';
    let rawPhone = extracted.phone || '';
    let address = extracted.address || 'Đã đăng ký địa chỉ qua LadiPage';
    let combo = extracted.combo;
    let amount = extracted.amount;
    let adId = extracted.adId || 'Organic/LadiPage';

    // Normalizing phone
    const { cleanPhone, displayPhone, tidPrefix } = normalizePhoneNumber(rawPhone, projectId);
    const finalPhone = displayPhone || rawPhone || '+62';

    // Auto-detect combo & price defaults if empty
    if (projectId === 'abera') {
      if (!combo) {
        if (/350|paket 3|3 botol/i.test(JSON.stringify(rawData))) {
          combo = 'Paket 3 Botol (Beli 3 Gratis 1 - Tổng 4 chai)';
          amount = 350000;
        } else if (/179|1 botol/i.test(JSON.stringify(rawData))) {
          combo = '1 Botol Abera Serum';
          amount = 179000;
        } else {
          combo = 'Paket 2 Botol (Beli 2 Gratis 1 - Tổng 3 chai)';
          amount = 297000;
        }
      } else if (!amount) {
        if (/350|paket 3|3 botol/i.test(combo)) amount = 350000;
        else if (/179|1 botol/i.test(combo)) amount = 179000;
        else amount = 297000;
      }
    } else if (projectId === 'fitgum') {
      if (!combo) {
        combo = 'Combo 2 (Buy 4 Get 4 FREE)';
        amount = 229;
      } else if (!amount) {
        if (/329|combo 3/i.test(combo)) amount = 329;
        else if (/179|combo 1/i.test(combo)) amount = 179;
        else amount = 229;
      }
    } else {
      if (!combo) combo = 'Đơn hàng LadiPage';
      if (!amount) amount = 0;
    }

    // Generate Order ID & TID
    const datePrefix = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderPrefix = projectId.slice(0, 3).toUpperCase();
    const orderId = `${orderPrefix}-${datePrefix}-${randomSuffix}`;

    // Unique Thread ID in CRM (matches WhatsApp customer ID if phone is known)
    const tid = cleanPhone ? `${tidPrefix}.${cleanPhone}` : `lp_${datePrefix}_${randomSuffix}`;

    // 3. Build WhatsApp Deep Link & Pre-filled text
    const messageText = buildWhatsAppMessage(
      projectId,
      orderId,
      customerName,
      cleanPhone,
      address,
      combo,
      amount,
      currency
    );
    const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(messageText)}`;

    // Order Details Summary
    const orderDetails = `📦 ${combo} (${currency} ${amount.toLocaleString()}) | 👤 Người nhận: ${customerName} | 📞 ${finalPhone} | 📍 Địa chỉ: ${address} | 🚚 COD Free Shipping (Nguồn: LadiPage #${orderId})`;
    const mainIntent = `Đặt hàng từ LadiPage: ${combo}`;
    const keyEvidence = `Đơn đặt hàng LadiPage #${orderId} - Khách để lại thông tin đầy đủ`;

    // 4. Save/Upsert into Neon DB leads table
    const upsertSql = `
      INSERT INTO leads (
        project_id, tid, customer_name, phone, ad_id,
        total_messages, customer_messages, main_intent, conversation_result,
        order_combo, order_amount, order_details, dropoff_reason,
        last_customer_msg, last_ai_msg, key_evidence,
        first_msg_at, last_msg_at, updated_at,
        funnel_step, funnel_step_num, tags
      ) VALUES (
        $1, $2, $3, $4, $5,
        1, 1, $6, 'Đã chốt đơn',
        $7, $8, $9, 'Đang chờ khách bấm gửi xác nhận trên WhatsApp',
        $10, 'Hệ thống đã tạo đơn LadiPage', $11,
        NOW(), NOW(), NOW(),
        'Step 7: Chốt đơn thành công', 7, $12
      )
      ON CONFLICT (project_id, tid) DO UPDATE SET
        customer_name = EXCLUDED.customer_name,
        phone = EXCLUDED.phone,
        ad_id = COALESCE(NULLIF(EXCLUDED.ad_id, ''), leads.ad_id),
        main_intent = EXCLUDED.main_intent,
        conversation_result = 'Đã chốt đơn',
        order_combo = EXCLUDED.order_combo,
        order_amount = EXCLUDED.order_amount,
        order_details = EXCLUDED.order_details,
        key_evidence = EXCLUDED.key_evidence,
        last_msg_at = NOW(),
        updated_at = NOW(),
        funnel_step = 'Step 7: Chốt đơn thành công',
        funnel_step_num = 7,
        tags = (COALESCE(leads.tags, '[]'::jsonb) || '["LadiPage", "Đã chốt đơn"]'::jsonb);
    `;

    await client.query(upsertSql, [
      projectId,
      tid,
      customerName,
      finalPhone,
      adId,
      mainIntent,
      combo,
      amount,
      orderDetails,
      messageText,
      keyEvidence,
      JSON.stringify(['LadiPage', 'Đã chốt đơn'])
    ]);

    await client.end();

    // 5. Response back to LadiPage
    return res.status(200).json({
      success: true,
      message: 'Đơn hàng LadiPage đã được lưu thành công vào CRM.',
      order_id: orderId,
      project_id: projectId,
      project_name: project.name,
      customer_name: customerName,
      phone: finalPhone,
      clean_phone: cleanPhone,
      combo: combo,
      amount: amount,
      currency: currency,
      address: address,
      whatsapp_phone: waPhone,
      whatsapp_url: whatsappUrl,
      whatsapp_text_preview: messageText,
      action: 'REDIRECT_TO_WHATSAPP'
    });

  } catch (error) {
    if (client) {
      try { await client.end(); } catch (e) {}
    }
    console.error('LadiPage Webhook Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
