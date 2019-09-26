var client = require('./contentful').client

async function getBarcodeFaq () {
  try {
    const result = await client.getEntries({
      content_type: 'barcodeFaqs',
      order: 'fields.id',
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getBarcodeFaq
}
