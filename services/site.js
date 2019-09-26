var client = require('./contentful').client

async function getSiteData () {
  try {
    const result = await client.getEntries({
      content_type: 'websiteSettings'
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getSiteData
}
