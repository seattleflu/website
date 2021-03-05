var client = require('./contentful').client

async function getResearchCat () {
  try {
    const result = await client.getEntries({
      content_type: 'researchCategories',
      order: 'fields.order',
      include: 10
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getResearchCat 
}