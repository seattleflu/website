var client = require('./contentful').client

async function getThankyou (url) {
  try {
    const result = await client.getEntries({
      content_type: 'thankYouReferPages',
      'fields.url': url,
      include: 10
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getThankyou
}
