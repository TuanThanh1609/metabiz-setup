const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function main() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();

  const sql = `
    INSERT INTO projects (
      id, name, currency, smax_biz, smax_page_pid, access_pin,
      botapi_success_url, botapi_success_token,
      botapi_demand_url, botapi_demand_token,
      ai_endpoint, ai_token, ai_model, ai_enabled,
      ads_currency, revenue_currency, rate_ads_to_vnd, rate_rev_to_vnd, currency_sync_note
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8,
      $9, $10,
      $11, $12, $13, $14,
      $15, $16, $17, $18, $19
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      currency = EXCLUDED.currency,
      smax_biz = EXCLUDED.smax_biz,
      smax_page_pid = EXCLUDED.smax_page_pid,
      access_pin = EXCLUDED.access_pin,
      botapi_success_url = EXCLUDED.botapi_success_url,
      botapi_success_token = EXCLUDED.botapi_success_token,
      botapi_demand_url = EXCLUDED.botapi_demand_url,
      botapi_demand_token = EXCLUDED.botapi_demand_token,
      ai_endpoint = EXCLUDED.ai_endpoint,
      ai_token = EXCLUDED.ai_token,
      ai_model = EXCLUDED.ai_model,
      ai_enabled = EXCLUDED.ai_enabled,
      ads_currency = EXCLUDED.ads_currency,
      revenue_currency = EXCLUDED.revenue_currency,
      rate_ads_to_vnd = EXCLUDED.rate_ads_to_vnd,
      rate_rev_to_vnd = EXCLUDED.rate_rev_to_vnd,
      currency_sync_note = EXCLUDED.currency_sync_note,
      updated_at = NOW()
    RETURNING *;
  `;

  const values = [
    'redgold',
    'REDGOLD Super Vitamin B12 Philippines',
    'PHP',
    'tai-ngoc-wa',
    'wa1389794807542803',
    '1609',
    'https://api.smax.ai/public/bizs/tai-ngoc-wa/triggers/6ab7ecdaf4a6fa0d59ac683f',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmlnZ2VyX2lkIjoiNmFiN2VjZGFmNGE2ZmEwZDU5YWM2ODNmIiwiaWF0IjoxNzkwNDM4NjE4LCJleHAiOjMxNzMzNDg4MTAxOH0.65rjtnuskUuYHyK03W_J7YI0aiOW4lJpZkK3Meu3_hY',
    'https://api.smax.ai/public/bizs/tai-ngoc-wa/triggers/6ab7ec813719cf92fe160b6f',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmlnZ2VyX2lkIjoiNmFiN2VjODEzNzE5Y2Y5MmZlMTYwYjZmIiwiaWF0IjoxNzkwNDM4NTI5LCJleHAiOjMxNzMzNDg4MDkyOX0.roBa-n3_cafnCvNDO6CXZmFRIPcui5hV11YvgYVn1nw',
    'https://token.ai.vn/v1',
    'sk-LEd49hmmEG9L4kB_aYYGhHHJirAsbtLkmyNReBe_yYgv3IRtAIhp8vJ_hjE',
    'gpt-5',
    true,
    'VND',
    'PHP',
    1.0,
    445.0,
    '1 PHP ≈ 445 ₫ | 1 VND = 1 ₫ (Token.ai GPT-5)'
  ];

  const res = await client.query(sql, values);
  console.log('SUCCESS! Upserted Project:', JSON.stringify(res.rows[0], null, 2));
  await client.end();
}

main().catch(console.error);
