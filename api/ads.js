const adsWebhookHandler = require('./ads-webhook');

module.exports = async function handler(req, res) {
  return adsWebhookHandler(req, res);
};
