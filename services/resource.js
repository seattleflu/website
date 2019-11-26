var client = require('./contentful').client

async function getResource (url) {
  try {
    const result = await client.getEntries({
      content_type: 'resources',
      'fields.url': url
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

async function getResources () {
  try {
    const results = await client.getEntries({
      content_type: 'resources'
    })
    return results
  } catch (error) {
    console.log('ERROR: ', error)
  }
}


module.exports = {
  getResource,
  getResources
}
