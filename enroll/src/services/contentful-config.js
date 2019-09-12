var contentful = require('contentful')

var client = contentful.createClient({
  accessToken: 'khzGbzJg6rnFLJNw6wlkEw_jCNzdza1ZEJAOeyK3Z5o',
  space: 'mw94neez9vid',
  host: 'cdn.contentful.com'
})

exports.client = client
