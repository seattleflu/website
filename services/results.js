const axios = require('axios')
const urljoin = require('url-join')

var client = require('./contentful').client

async function getContentfulResults(contentType, resultType){
    try{
        const result = await client.getEntries({
            content_type: contentType,
            'fields.id': resultType
        })
        return result
    } catch (error) {
        console.log('ERROR in getContentfulResults(): ', error)
    }
}

async function getBarcodeResults(barcode){
    const baseUrl = process.env.ID3C_URL
    const apiUrl = `/v2/shipping/return-results/${barcode}`
    const username = process.env.ID3C_ROR_USERNAME
    const password = process.env.ID3C_ROR_PASSWORD
    try {
        const response = await axios({
            method: 'get',
            url: urljoin(baseUrl, apiUrl),
            auth: {
                username: username,
                password: password
            },
            crossDomain: true
        })
        return response.data
    } catch (error) {
        console.log('ERROR in getBarcodeResults(): ', error)
    }
}

async function getBarcodeFaqs (barcodeFaqType) {
    try {
      const result = await client.getEntries({
        content_type: barcodeFaqType,
        order: 'fields.id',
      })
      return result
    } catch (error) {
      console.log('ERROR in getBarcodeFaqs(): ', error)
    }
  }

module.exports = {
    getContentfulResults,
    getBarcodeResults,
    getBarcodeFaqs
}
