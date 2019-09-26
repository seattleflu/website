var client = require('./contentful').client

async function getResultsFaq () {
  try {
    const result = await client.getEntries({
      content_type: 'resultsFaq',
      order: 'fields.id',
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getResultsFaq
}
