var contentful = require('contentful')

 var config = {
   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "nNdyqY7yYFAht1SeM-V644PMhHAr2-OxoQM3cAkv1xs",
   space: process.env.CONTENTFUL_SPACE || "mw94neez9vid",
   host: "https://preview.contentful.com",
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

