const botTaggerHandler = require('../api/botapi-tagger.js');

async function testBotTagger() {
  console.log('=== TESTING API/BOTAPI-TAGGER FOR REDGOLD ===');
  const req = {
    method: 'GET',
    query: {
      project_id: 'redgold'
    }
  };

  const res = {
    setHeader: () => {},
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      console.log('BotAPI Tagger Response Status:', this.statusCode || 200);
      console.log('BotAPI Tagger Result:', JSON.stringify(data, null, 2));
      return this;
    },
    end: function() {
      return this;
    }
  };

  await botTaggerHandler(req, res);
}

testBotTagger().catch(console.error);
