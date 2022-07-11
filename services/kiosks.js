var client = require('./contentful').client

async function getKiosks () {
  try {
    const result = await client.getEntries({
      content_type: 'kiosks',
      order: 'sys.createdAt',
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getKiosks
}
