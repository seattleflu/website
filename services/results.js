const axios = require('axios')

var client = require('./contentful').client

async function getContentfulResults(contentType, resultType){
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

async function getBarcodeResults(barcode){
    // TODO: replace url, username, password values
    const baseUrl = 'http://localhost:5000'
    const apiUrl = `/v1/shipping/return-results/${barcode}`
    const username = 'test'
    const password = '123'
    try {
        const response = await axios({
            method: 'get',
            url: new URL(apiUrl, baseUrl),
            auth: {
                username: username,
                password: password
            },
            crossDomain: true
        })
        return response.data
    } catch (error) {
        console.log('ERROR: ', error)
    }
}

module.exports = {
    getContentfulResults,
    getBarcodeResults
}
