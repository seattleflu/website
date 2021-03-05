var contentful = require('contentful')

var config = {
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "35Wdx3MeKMga9hd4ZxFDHZa5V-bXhKc9f0u7_MRdA78",
  space: process.env.CONTENTFUL_SPACE || "mw94neez9vid",
  insecure: false
}

var client = contentful.createClient(config)

exports.client = client

