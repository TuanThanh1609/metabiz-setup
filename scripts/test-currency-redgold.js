const currencySyncHandler = require('../api/currency-sync.js');

async function testCurrencySync() {
  console.log('=== TESTING API/CURRENCY-SYNC FOR REDGOLD ===');
  const req = {
    method: 'POST',
    query: {
      project_id: 'redgold'
    },
    body: {
      ads_currency: 'VND',
      revenue_currency: 'PHP'
    }
  };

  const res = {
    setHeader: () => {},
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      console.log('Currency Sync Response Status:', this.statusCode || 200);
      console.log('Currency Sync Result:', JSON.stringify(data, null, 2));
      return this;
    },
    end: function() {
      return this;
    }
  };

  await currencySyncHandler(req, res);
}

testCurrencySync().catch(console.error);
