const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function main() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('Connected to Neon Postgres.');

  await client.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS whatsapp_phone VARCHAR(50);');
  await client.query("UPDATE projects SET whatsapp_phone = '6285284828469' WHERE id = 'abera';");
  await client.query("UPDATE projects SET whatsapp_phone = '601170078728' WHERE id = 'fitgum';");

  const res = await client.query('SELECT id, name, currency, whatsapp_phone FROM projects;');
  console.table(res.rows);

  await client.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
