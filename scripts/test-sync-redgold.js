const syncHandler = require('../api/sync.js');
const leadsHandler = require('../api/leads.js');

async function testSync() {
  console.log('=== 1. TESTING API/SYNC FOR REDGOLD ===');
  const req = {
    method: 'GET',
    query: {
      project_id: 'redgold',
      force: 'true',
      limit: '10'
    }
  };

  let syncResult = null;
  const res = {
    setHeader: () => {},
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      syncResult = data;
      console.log('Sync Response Status:', this.statusCode || 200);
      console.log('Sync Result:', JSON.stringify(data, null, 2));
      return this;
    },
    end: function() {
      return this;
    }
  };

  await syncHandler(req, res);

  console.log('\n=== 2. TESTING API/LEADS FOR REDGOLD ===');
  const reqLeads = {
    method: 'GET',
    query: {
      project_id: 'redgold',
      pin: '1609',
      sort_by: 'last_msg_desc'
    }
  };

  let leadsResult = null;
  const resLeads = {
    setHeader: () => {},
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      leadsResult = data;
      console.log('Leads Response Status:', this.statusCode || 200);
      console.log('KPI:', JSON.stringify(data.kpi, null, 2));
      console.log('Funnel Stats:', JSON.stringify(data.funnelStats, null, 2));
      console.log('Total Leads Returned:', data.leads?.length);
      if (data.leads && data.leads.length > 0) {
        console.log('Sample Lead:', JSON.stringify(data.leads[0], null, 2));
      }
      return this;
    },
    end: function() {
      return this;
    }
  };

  await leadsHandler(reqLeads, resLeads);
}

testSync().catch(console.error);
