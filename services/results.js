var client = require('./contentful').client

async function getResults(contentType, resultType){
    try{
        const result = await client.getEntries({
            content_type: contentType,
            'fields.id': resultType
        })
        return result
    } catch (error) {
        console.log('ERROR: ', error)
    }
}

module.exports = {
    getResults
}
