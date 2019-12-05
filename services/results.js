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
    const baseUrl = process.env.ID3C_URL
    const apiUrl = `/v1/shipping/return-results/${barcode}`
    const username = process.env.ID3C_ROR_USERNAME
    const password = process.env.ID3C_ROR_PASSWORD
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
