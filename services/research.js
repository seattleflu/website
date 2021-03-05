var client = require('./contentful').client

async function getResearch () {
  try {
    const result = await client.getEntries({
      content_type: 'research',
      order: '-fields.publishDate',
      include: 10
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getResearch 
}