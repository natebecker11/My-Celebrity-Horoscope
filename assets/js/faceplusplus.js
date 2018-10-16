const request = require('request')
const rp = require('request-promise-native')
require('dotenv').config()
const keys = require('./keys.js')
const facePlusKey = keys.faceplus.key
const facePlusSecret = keys.faceplus.secret
const faceSetToken = keys.faceplus.faceset


const getToken = (imageUrl) => {
  return rp({
    method: 'POST',
    url: `https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${facePlusKey}&api_secret=${facePlusSecret}&faceset_token=${faceSetToken}&image_url=${imageUrl}`
  
  })
}

const searchToken = (imageUrl) => {
  return rp({
    method: 'POST',
    url: `https://api-us.faceplusplus.com/facepp/v3/search?api_key=${facePlusKey}&api_secret=${facePlusSecret}&faceset_token=${faceSetToken}&image_url=${imageUrl}`
  })
}

