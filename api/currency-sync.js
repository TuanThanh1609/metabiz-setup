const { Client } = require('pg');
const https = require('https');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

// Fallback market exchange rates to VND (VND = 1)
const FALLBACK_RATES_TO_VND = {
  VND: 1.0,
  VNĐ: 1.0,
  USD: 25450.0,
  RM: 5900.0,
  MYR: 5900.0,
  IDR: 1.58,
  THB: 745.0,
  SGD: 19350.0,
  EUR: 27800.0,
  PHP: 445.0
};

function normalizeCurrencyCode(code) {
  if (!code) return 'VND';
  const c = String(code).trim().toUpperCase();
  if (c === 'RM') return 'RM';
  if (c === 'MYR') return 'RM';
  if (c === 'VNĐ' || c === 'VND') return 'VND';
  if (c === '$') return 'USD';
  if (c === 'RP') return 'IDR';
  return c;
}

// Call Token.ai GPT-5 for live market exchange rate estimation
async function fetchRatesFromTokenAI(adsCurrency, revCurrency, aiEndpoint, aiToken, aiModel) {
  return new Promise((resolve) => {
    const endpoint = aiEndpoint || 'https://token.ai.vn/v1';
    const token = aiToken || 'sk-LEd49hmmEG9L4kB_aYYGhHHJirAsbtLkmyNReBe_yYgv3IRtAIhp8vJ_hjE';
    const model = aiModel || 'gpt-5';

    const url = new URL(endpoint.endsWith('/chat/completions') ? endpoint : `${endpoint.replace(/\/+$/, '')}/chat/completions`);

    const prompt = `Bạn là chuyên gia tài chính và tỷ giá tiền tệ quốc tế. 
Hãy cho biết tỷ giá chuyển đổi sang VNĐ (Việt Nam Đồng):
1. Đơn vị tiền tài khoản Ads là ${adsCurrency} -> 1 ${adsCurrency} bằng bao nhiêu VNĐ?
2. Đơn vị tiền Doanh thu CRM là ${revCurrency} -> 1 ${revCurrency} bằng bao nhiêu VNĐ?

Trả về DUY NHẤT một JSON Object hợp lệ (không kèm markdown râu ria) theo cấu trúc:
{
  "rate_ads_to_vnd": <số thực, ví dụ 1 hoặc 25450 hoặc 5900>,
  "rate_rev_to_vnd": <số thực, ví dụ 5900 hoặc 1.58>,
  "explanation": "<chú thích ngắn về tỷ giá, ví dụ: '1 RM ≈ 5.900 VNĐ | 1 VND = 1 VNĐ'>"
}`;

    const payload = JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: 'Bạn là chuyên gia tài chính ngân hàng quốc tế. Luôn trả lời bằng định dạng JSON object duy nhất.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.1
    });

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 12000 // 12 seconds timeout
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.message?.content;
            if (content) {
              const result = JSON.parse(content);
              if (result.rate_ads_to_vnd > 0 && result.rate_rev_to_vnd > 0) {
                return resolve({
                  success: true,
                  rateAds: parseFloat(result.rate_ads_to_vnd),
                  rateRev: parseFloat(result.rate_rev_to_vnd),
                  note: result.explanation || `1 ${revCurrency} ≈ ${parseFloat(result.rate_rev_to_vnd).toLocaleString()} ₫ | 1 ${adsCurrency} ≈ ${parseFloat(result.rate_ads_to_vnd).toLocaleString()} ₫ (Token.ai GPT-5)`,
                  source: 'Token.ai GPT-5'
                });
              }
            }
          }
          resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

module.exports = async (req, res) => {
  // Polyfill helper methods for standard http
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

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let body = {};
  if (req.body) {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }

  const projectId = (req.query?.project_id || body.project_id || 'fitgum').toLowerCase().trim();
  const adsCurrency = normalizeCurrencyCode(req.query?.ads_currency || body.ads_currency || 'VND');
  const revCurrency = normalizeCurrencyCode(req.query?.revenue_currency || body.revenue_currency || 'RM');

  const manualRateAds = req.query?.manual_rate_ads || body.manual_rate_ads;
  const manualRateRev = req.query?.manual_rate_rev || body.manual_rate_rev;

  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // 1. Fetch project info
    const projRes = await client.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    if (projRes.rows.length === 0) {
      await client.end();
      return res.status(404).json({ success: false, error: `Dự án '${projectId}' không tồn tại.` });
    }
    const project = projRes.rows[0];

    let rateAds = 1.0;
    let rateRev = 5900.0;
    let source = 'Default Fallback';
    let note = '';

    // 2. If manual rate provided
    if (manualRateAds && manualRateRev && !isNaN(parseFloat(manualRateAds)) && !isNaN(parseFloat(manualRateRev))) {
      rateAds = parseFloat(manualRateAds);
      rateRev = parseFloat(manualRateRev);
      source = 'Manual Input';
      note = `1 ${revCurrency} = ${rateRev.toLocaleString()} ₫ | 1 ${adsCurrency} = ${rateAds.toLocaleString()} ₫ (Thiết lập thủ công)`;
    } else {
      // 3. Try calling Token.ai GPT-5 for live rate
      const aiResult = await fetchRatesFromTokenAI(
        adsCurrency,
        revCurrency,
        project.ai_endpoint,
        project.ai_token,
        project.ai_model
      );

      if (aiResult) {
        rateAds = aiResult.rateAds;
        rateRev = aiResult.rateRev;
        source = aiResult.source;
        note = aiResult.note;
      } else {
        // Fallback to reference table
        rateAds = FALLBACK_RATES_TO_VND[adsCurrency] || 1.0;
        rateRev = FALLBACK_RATES_TO_VND[revCurrency] || 5900.0;
        source = 'Reference Market Rates';
        note = `1 ${revCurrency} ≈ ${rateRev.toLocaleString()} ₫ | 1 ${adsCurrency} = ${rateAds.toLocaleString()} ₫ (Tỷ giá tham chiếu)`;
      }
    }

    // 4. Update project in Neon DB
    await client.query(`
      UPDATE projects 
      SET ads_currency = $1,
          revenue_currency = $2,
          rate_ads_to_vnd = $3,
          rate_rev_to_vnd = $4,
          currency_synced_at = NOW(),
          currency_sync_note = $5
      WHERE id = $6;
    `, [adsCurrency, revCurrency, rateAds, rateRev, note, projectId]);

    await client.end();

    return res.status(200).json({
      success: true,
      message: `Đã đồng bộ đơn vị tiền tệ và chuẩn hóa về VNĐ thành công (${source}).`,
      project_id: projectId,
      ads_currency: adsCurrency,
      revenue_currency: revCurrency,
      target_currency: 'VND',
      rate_ads_to_vnd: rateAds,
      rate_rev_to_vnd: rateRev,
      currency_synced_at: new Date().toISOString(),
      note: note,
      source: source
    });

  } catch (error) {
    if (client) await client.end().catch(() => {});
    return res.status(500).json({
      success: false,
      error: error.message || 'Lỗi xử lý đồng bộ tiền tệ'
    });
  }
};
