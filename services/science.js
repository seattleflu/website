var client = require('./contentful').client

async function getScience () {
  try {
    const result = await client.getEntries({
      content_type: 'science',
      'fields.title': 'Science'
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getScience
}
