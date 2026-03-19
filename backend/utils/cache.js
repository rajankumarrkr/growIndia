const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // Default TTL is 60 seconds

module.exports = cache;
