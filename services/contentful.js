var contentful = require('contentful')
var config = require('../config.json')[process.env.NODE_ENV || 'production']

var client = contentful.createClient({
  accessToken: config.accessToken,
  space: config.space,
  host: config.host
})

exports.client = client
