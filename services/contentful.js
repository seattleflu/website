var contentful = require('contentful')

 var config = {
   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "BgyukT7O55hreFWQux8hmwkXmdn2ytl5SQk64P4U0Cw",
   space: process.env.CONTENTFUL_SPACE || "mw94neez9vid",
   host: "preview.contentful.com",
   insecure: false
 }

// var config = {
//  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "OzpJ8zbBPkh0ypL3EIwJSZpIV2BAiHJERFUk4mjzsrc",
//  space: process.env.CONTENTFUL_SPACE || "mw94neez9vid",
//  host: "cdn.contentful.com",
//  insecure: false
// }

var client = contentful.createClient(config)

exports.client = client

