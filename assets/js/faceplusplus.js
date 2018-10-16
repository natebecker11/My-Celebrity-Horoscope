const request = require('request')
const rp = require('request-promise-native')
require('dotenv').config()
const keys = require('./keys.js')
const facePlusKey = keys.faceplus.key
const facePlusSecret = keys.faceplus.secret
const faceSetToken = keys.faceplus.faceset



module.exports = {};




module.exports.getToken = (imageUrl) => {
  let encodedURI = encodeURI(imageUrl)
  // let encodedURI = imageUrl
  return rp({
    method: 'POST',
    url: `https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${facePlusKey}&api_secret=${facePlusSecret}&faceset_token=${faceSetToken}&image_url=${encodedURI}`,
    json: true
  })
  // .then(resp => console.log(resp))
  .then(resp => {
    if (resp.faces.length !== 1) throw new Error('Too many/few faces in image')
    let token = resp.faces[0]['face_token'];
    console.log(`Generated token from ${imageUrl}: ${token}`)
    return token
  })  
}

module.exports.searchToken = (imageUrl) => {
  let encodedURI = encodeURI(imageUrl)
  return rp({
    method: 'POST',
    url: `https://api-us.faceplusplus.com/facepp/v3/search?api_key=${facePlusKey}&api_secret=${facePlusSecret}&faceset_token=${faceSetToken}&image_url=${encodedURI}`,
    json: true
  }).then(resp => {
    if (resp['results'].length === 0) throw new Error('No match found.')
    let matchedToken = resp['results'][0]['face_token']
    console.log(matchedToken)
    return matchedToken
  })
}

module.exports.addToken = (token) => {
  return rp({
    method: 'POST',
    url: `https://api-us.faceplusplus.com/facepp/v3/faceset/addface?api_key=${facePlusKey}&api_secret=${facePlusSecret}&faceset_token=${faceSetToken}&face_tokens=${token}`,
    json: true
  }).then(resp => {
    if (resp['face_added'] !== 1) throw new Error('Too many/few faces added')
    console.log(`Added ${resp['face_added']} face(s) to faceset. Total faces in faceset: ${resp['face_count']}`)
    return 1;
  })
}

// module.exports.getToken('https://storage.googleapis.com/my-celebrity-horoscope.appspot.com/celebImages/1234567891234.png')