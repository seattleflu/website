var contentful = require('contentful')

// var config = {
//   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "khzGbzJg6rnFLJNw6wlkEw_jCNzdza1ZEJAOeyK3Z5o",
//   space: process.env.CONTENTFUL_SPACE || "mw94neez9vid",
//   host: "cdn.contentful.com",
//   insecure: false
// }

var config = {
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "3WjCDnhn0P6Xlm2-V5grdDPpBCRgpGcMfq7IM-7wld8",
  space: process.env.CONTENTFUL_SPACE || "mw94neez9vid",
  host: "preview.contentful.com",
  insecure: false
}

var client = contentful.createClient(config)

exports.client = client

