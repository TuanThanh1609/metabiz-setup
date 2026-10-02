const ladiWebhook = require('../api/ladipage-webhook.js');

async function testWebhook() {
  console.log('--- TEST 1: GET Request (Info & Docs) ---');
  let resData = null;
  const req1 = {
    method: 'GET',
    query: { project_id: 'abera' }
  };
  const res1 = {
    statusCode: 200,
    headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    status(c) { this.statusCode = c; return this; },
    json(d) { resData = d; console.log('GET Response:', JSON.stringify(d, null, 2)); },
    end() {}
  };
  await ladiWebhook(req1, res1);

  console.log('\n--- TEST 2: POST Standard LadiPage Payload (Abera Indonesia) ---');
  const req2 = {
    method: 'POST',
    query: { project_id: 'abera' },
    body: {
      form_data: [
        { name: 'name', value: 'Dewi Lestari' },
        { name: 'phone', value: '081298765432' },
        { name: 'address', value: 'Jl. Merdeka No. 45, Kecamatan Gambir, Jakarta Pusat' },
        { name: 'combo', value: 'Paket 2 Botol (Beli 2 Gratis 1)' }
      ],
      total_revenue: 297000,
      utm_source: 'facebook',
      utm_campaign: 'CTWA_Abera_Serum',
      ad_id: '23860449379260793'
    }
  };
  const res2 = {
    statusCode: 200,
    headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    status(c) { this.statusCode = c; return this; },
    json(d) {
      console.log('POST Response Status:', this.statusCode);
      console.log('Order ID:', d.order_id);
      console.log('Customer:', d.customer_name, '| Phone:', d.phone);
      console.log('WhatsApp Phone:', d.whatsapp_phone);
      console.log('WhatsApp URL:\n', d.whatsapp_url);
      console.log('Preview Text:\n', d.whatsapp_text_preview);
    },
    end() {}
  };
  await ladiWebhook(req2, res2);

  console.log('\n--- TEST 3: POST Fitgum Malaysia Payload ---');
  const req3 = {
    method: 'POST',
    query: { project_id: 'fitgum' },
    body: {
      name: 'Nurul Huda',
      phone: '0123456789',
      address: 'No 15, Jalan Telupid, Sandakan, Sabah',
      combo: 'Combo 1 (Buy 3 Get 3 FREE)',
      amount: 179
    }
  };
  const res3 = {
    statusCode: 200,
    headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    status(c) { this.statusCode = c; return this; },
    json(d) {
      console.log('POST Fitgum Response Status:', this.statusCode);
      console.log('Order ID:', d.order_id);
      console.log('WhatsApp URL:\n', d.whatsapp_url);
    },
    end() {}
  };
  await ladiWebhook(req3, res3);

  console.log('\n--- VERIFY DATABASE RECORDS IN NEON POSTGRES ---');
  const { Client } = require('pg');
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  const dbRes = await client.query(`
    SELECT project_id, tid, customer_name, phone, order_combo, order_amount, conversation_result, funnel_step, tags 
    FROM leads 
    WHERE customer_name IN ('Dewi Lestari', 'Nurul Huda')
  `);
  console.table(dbRes.rows);
  await client.end();
}

testWebhook().catch(console.error);
