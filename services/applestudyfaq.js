var client = require('./contentful').client

async function getAppleFaq () {
  try {
    const result = await client.getEntries({
      content_type: 'appleStudyFaq',
      order: 'fields.id',
      include: 10
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getAppleFaq
}
