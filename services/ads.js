var client = require('./contentful').client

async function getAds (url) {
  try {
    const result = await client.getEntries({
      content_type: 'adLandingPages',
      'fields.url': url
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getAds
}
