
var contentful = require('contentful')
var config = {
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "Wq569GWiYPkDqDz_YUNB0gIMuS06lLsiIHq3a4f7Ce4",
  space: process.env.CONTENTFUL_SPACE || "mw94neez9vid",
  host: "preview.contentful.com",
  insecure: false
}
var client = contentful.createClient(config)
exports.client = client