var client = require('./contentful').client

async function getHome () {
  try {
    const result = await client.getEntries({
      content_type: 'homepage',
      'fields.name': 'Home (Live)',
      include: 10
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getHome 
}