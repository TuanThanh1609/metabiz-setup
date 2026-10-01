const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nfGwU7DE1lZh@ep-solitary-bird-b3coqeu6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

// Helper to parse numeric values safely (handles commas, currency symbols, percentages)
function parseNumber(val, defaultVal = 0) {
  if (val === null || val === undefined || val === '') return defaultVal;
  if (typeof val === 'number') return isNaN(val) ? defaultVal : val;
  const cleaned = String(val).replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? defaultVal : parsed;
}

function parseInteger(val, defaultVal = 0) {
  if (val === null || val === undefined || val === '') return defaultVal;
  if (typeof val === 'number') return Math.round(val);
  const cleaned = String(val).replace(/[^0-9-]/g, '');
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? defaultVal : parsed;
}

// Helper to parse dates into 'YYYY-MM-DD'
function parseDate(val) {
  if (!val) {
    return new Date().toISOString().split('T')[0];
  }
  const str = String(val).trim();
  // If DD/MM/YYYY or DD-MM-YYYY
  if (/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/.test(str)) {
    const [, d, m, y] = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  // If YYYY/MM/DD or YYYY-MM-DD
  if (/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/.test(str)) {
    const [, y, m, d] = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  try {
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0];
    }
  } catch (e) {
    // fallback
  }
  return new Date().toISOString().split('T')[0];
}

// Normalize record from various key conventions (exact Smax headers, snake_case, camelCase)
function normalizeRecord(raw, defaultProjectId = 'fitgum') {
  if (!raw || typeof raw !== 'object') return null;

  // Case-insensitive key lookup helper
  const getField = (...keys) => {
    for (const k of keys) {
      if (raw[k] !== undefined && raw[k] !== null) return raw[k];
      // Try lowercase matching
      const lowerKey = k.toLowerCase().replace(/[\s_-]/g, '');
      for (const rawKey of Object.keys(raw)) {
        if (rawKey.toLowerCase().replace(/[\s_-]/g, '') === lowerKey) {
          if (raw[rawKey] !== undefined && raw[rawKey] !== null) return raw[rawKey];
        }
      }
    }
    return '';
  };

  const projectId = getField('project_id', 'projectId', 'project') || defaultProjectId;
  const rawDate = getField('Date', 'date', 'report_date', 'day', 'created_time');
  const date = parseDate(rawDate);

  const accountId = String(getField('Account ID', 'account_id', 'accountId', 'act_id')).trim();
  const campaignId = String(getField('Campaign ID', 'campaign_id', 'campaignId')).trim();
  const campaignName = String(getField('Campaign Name', 'campaign_name', 'campaignName')).trim();
  const adsetId = String(getField('Adset ID', 'adset_id', 'adsetId', 'ad_set_id')).trim();
  const adsetName = String(getField('Adset Name', 'adset_name', 'adsetName', 'ad_set_name')).trim();
  const adId = String(getField('Ad ID', 'ad_id', 'adId')).trim();
  const adName = String(getField('Ad Name', 'ad_name', 'adName')).trim();

  // Metrics
  const actions = parseNumber(getField('Actions', 'actions', 'action', 'conversions'), 0);
  const spend = parseNumber(getField('Spend', 'spend', 'amount_spent', 'cost'), 0);
  const clickRate = parseNumber(getField('Click Rate', 'click_rate', 'clickRate', 'ctr'), 0);
  const cpc = parseNumber(getField('CPC', 'cpc', 'cost_per_click'), 0);
  const reach = parseInteger(getField('Reach', 'reach'), 0);
  const frequency = parseNumber(getField('Frequency', 'frequency'), 1.0);
  const inlineLinkClicks = parseInteger(getField('Inline Link Clicks', 'inline_link_clicks', 'inlineLinkClicks'), 0);
  const inlinePostEngagement = parseInteger(getField('Inline Post Engagement', 'inline_post_engagement', 'inlinePostEngagement'), 0);
  const clicks = parseInteger(getField('Clicks', 'clicks'), 0);
  const impressions = parseInteger(getField('Impressions', 'impressions'), 0);
  const cpm = parseNumber(getField('CPM', 'cpm', 'cost_per_mille'), 0);

  return {
    projectId,
    date,
    accountId,
    campaignId,
    campaignName,
    adsetId,
    adsetName,
    adId,
    adName,
    actions,
    spend,
    clickRate,
    cpc,
    reach,
    frequency,
    inlineLinkClicks,
    inlinePostEngagement,
    clicks,
    impressions,
    cpm,
    rawData: raw
  };
}

module.exports = async function handler(req, res) {
  // 1. CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key, x-project-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Determine project_id
  const projectId = req.query.project_id || req.headers['x-project-id'] || (req.body && req.body.project_id) || 'fitgum';

  // 2. Handle GET request: Diagnostics, healthcheck, and returning recent ads data
  if (req.method === 'GET') {
    const client = new Client({ connectionString: DATABASE_URL });
    try {
      await client.connect();
      const countRes = await client.query(
        'SELECT COUNT(*)::int as total_rows, COALESCE(SUM(spend), 0)::float as total_spend FROM meta_ads_insights WHERE project_id = $1',
        [projectId]
      );
      const recentRes = await client.query(
        `SELECT date, campaign_name, ad_id, ad_name, spend, impressions, clicks, cpc, cpm
         FROM meta_ads_insights 
         WHERE project_id = $1 
         ORDER BY date DESC, spend DESC 
         LIMIT 20`,
        [projectId]
      );
      await client.end();

      return res.status(200).json({
        success: true,
        message: 'Meta Ads Webhook endpoint is active and healthy.',
        project_id: projectId,
        summary: countRes.rows[0],
        recent_records: recentRes.rows,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      if (client) await client.end().catch(() => {});
      return res.status(500).json({
        success: false,
        error: err.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  // 3. Handle POST request: Ingestion from Smax
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // keep as is or string
      }
    }

    // Check if this is an empty test ping from Smax
    if (!body || (typeof body === 'object' && Object.keys(body).length === 0)) {
      return res.status(200).json({
        success: true,
        message: 'Ping acknowledged. Smax connection verified successfully.',
        project_id: projectId
      });
    }

    // Extract list of items
    let items = [];
    if (Array.isArray(body)) {
      items = body;
    } else if (body.data && Array.isArray(body.data)) {
      items = body.data;
    } else if (body.records && Array.isArray(body.records)) {
      items = body.records;
    } else if (body.items && Array.isArray(body.items)) {
      items = body.items;
    } else if (body.rows && Array.isArray(body.rows)) {
      items = body.rows;
    } else if (typeof body === 'object') {
      // Single record
      items = [body];
    }

    if (items.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No data rows found in request, but connection is active.',
        project_id: projectId,
        received: 0
      });
    }

    // Normalize each item
    const normalized = items
      .map(item => normalizeRecord(item, projectId))
      .filter(item => item !== null);

    if (normalized.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Could not parse any valid records from request body.',
        project_id: projectId
      });
    }

    const client = new Client({ connectionString: DATABASE_URL });
    try {
      await client.connect();

      let upsertedCount = 0;
      for (const rec of normalized) {
        const query = `
          INSERT INTO meta_ads_insights (
            project_id, date, account_id, campaign_id, campaign_name,
            adset_id, adset_name, ad_id, ad_name, actions, spend,
            click_rate, cpc, reach, frequency, inline_link_clicks,
            inline_post_engagement, clicks, impressions, cpm, raw_data, updated_at
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10, $11,
            $12, $13, $14, $15, $16,
            $17, $18, $19, $20, $21, NOW()
          )
          ON CONFLICT (project_id, date, ad_id, adset_id, campaign_id)
          DO UPDATE SET
            account_id = EXCLUDED.account_id,
            campaign_name = EXCLUDED.campaign_name,
            adset_name = EXCLUDED.adset_name,
            ad_name = EXCLUDED.ad_name,
            actions = EXCLUDED.actions,
            spend = EXCLUDED.spend,
            click_rate = EXCLUDED.click_rate,
            cpc = EXCLUDED.cpc,
            reach = EXCLUDED.reach,
            frequency = EXCLUDED.frequency,
            inline_link_clicks = EXCLUDED.inline_link_clicks,
            inline_post_engagement = EXCLUDED.inline_post_engagement,
            clicks = EXCLUDED.clicks,
            impressions = EXCLUDED.impressions,
            cpm = EXCLUDED.cpm,
            raw_data = EXCLUDED.raw_data,
            updated_at = NOW();
        `;

        await client.query(query, [
          rec.projectId,
          rec.date,
          rec.accountId,
          rec.campaignId,
          rec.campaignName,
          rec.adsetId,
          rec.adsetName,
          rec.adId,
          rec.adName,
          rec.actions,
          rec.spend,
          rec.clickRate,
          rec.cpc,
          rec.reach,
          rec.frequency,
          rec.inlineLinkClicks,
          rec.inlinePostEngagement,
          rec.clicks,
          rec.impressions,
          rec.cpm,
          JSON.stringify(rec.rawData)
        ]);
        upsertedCount++;
      }

      await client.end();

      return res.status(200).json({
        success: true,
        message: `Successfully received and upserted ${upsertedCount} Meta Ads records.`,
        project_id: projectId,
        received_items: items.length,
        upserted: upsertedCount,
        timestamp: new Date().toISOString()
      });

    } catch (err) {
      if (client) await client.end().catch(() => {});
      console.error('Error inserting meta ads insights:', err);
      return res.status(500).json({
        success: false,
        error: err.message,
        project_id: projectId,
        timestamp: new Date().toISOString()
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed. Use GET or POST.'
  });
};
