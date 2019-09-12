var contentful = require('contentful')

function required_env (name) {
  if (!process.env[name]) { throw new Error(`The required environment variable ${name} is not set.`) }
  return process.env[name]
}

var config = {
  accessToken: required_env('CONTENTFUL_ACCESS_TOKEN'),
  space: required_env('CONTENTFUL_SPACE'),
  host: process.env.CONTENTFUL_HOST,
  insecure: false
}

var client = contentful.createClient(config)

exports.client = client
