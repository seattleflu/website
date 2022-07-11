var client = require('./contentful').client

async function getFaq () {
  try {
    const result = await client.getEntries({
      content_type: 'faQs',
      order: 'fields.id',
      include: 10
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getFaq
}
