var client = require('./contentful').client
async function getHubPage (url) {
  try {
    const result = await client.getEntries({
      content_type: 'categories',
      'fields.url': url,
      include: 10
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getHubPage
}
