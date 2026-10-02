const aiAnalyzeHandler = require('../api/ai-analyze.js');

async function testAiAnalyze() {
  console.log('=== TESTING API/AI-ANALYZE WITH TOKEN.AI GPT-5 FOR REDGOLD ===');
  const req = {
    method: 'GET',
    query: {
      project_id: 'redgold',
      limit: '2'
    }
  };

  const res = {
    setHeader: () => {},
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      console.log('AI Analyze Response Status:', this.statusCode || 200);
      console.log('AI Analyze Result:', JSON.stringify(data, null, 2));
      return this;
    },
    end: function() {
      return this;
    }
  };

  await aiAnalyzeHandler(req, res);
}

testAiAnalyze().catch(console.error);
