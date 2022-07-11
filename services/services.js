var client = require('./contentful').client

async function getServices () {
  try {
    const result = await client.getEntries({
      content_type: 'services'
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getServices
}
