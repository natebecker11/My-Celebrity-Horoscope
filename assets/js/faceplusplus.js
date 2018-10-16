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

module.exports.getToken('https://storage.googleapis.com/my-celebrity-horoscope.appspot.com/celebImages%2F1234567.png?GoogleAccessId=firebase-adminsdk-io82f%40my-celebrity-horoscope.iam.gserviceaccount.com&Expires=16447035600&Signature=I1A53N4sW%2FWLsyWZvTGtzXarYgmOqyO7V%2FtUjHbBBlY%2B%2FZ0gUsNzqjV%2BhpwDqxPJyKiH6kIlRs3D3bbj8cDQixItjzQ7jeaXLdESmtSYnrbqg2vna1UIqam%2B0JuFhwxeH8mD5Lj%2BramH2ZQJKyAC6XN%2F9dorDDRovwQ%2BV3A04n1LR3wiE8LdZxtZMhLTQ8JQpof4ix7qsVoTZ9%2BysI6kZfKTf1jipwhwdDORmAZRwpzY%2BG0EX9u5ZJJDFZS2rCpl%2F1U2iPDk07m95XBC5fsn%2BxcMoF2RP060DT9eVhIeCCIgvMFjwo0B10BnpqLY%2BqgBhuKkvbxNvCdgcIVvem7%2ByQ%3D%3D')