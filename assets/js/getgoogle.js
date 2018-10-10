require('dotenv').config()
const keys = require('./keys.js')
const gKeys = keys.google
const request = require('request')
const rp = require('request-promise-native')
const apiKey = gKeys.key
const cx = gKeys.cx
// rp('https://www.google.com/search?as_rights=(cc_publicdomain|cc_attribute|cc_sharealike).-(cc_noncommercial|cc_nonderived)&q=danny%20devito&hl=')
//   .then(resp => console.log(resp))

//  https://www.googleapis.com/customsearch/v1
// public url: https://cse.google.com/cse?cx=012157156437842315643:mvefv_qtasg

    
const grabImage = (query) => {

  rp(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&fileType=.png&num=1&q=${query}`)
    .then(body => console.log(body))
    .catch(err => console.log(err))
}


const grabTwo = query => {
  return rp(`https://www.googleapis.com/customsearch/v1?fileType=.png&imgSize=large&imgType=face&num=1&rights=cc_publicdomain%20cc_attribute%20cc_sharealike%20cc_noncommercial%20cc_nonderived&safe=active&searchType=image&key=${apiKey}&cx=${cx}&q=${query}`)
    .then(body => JSON.parse(body).items[0].link)
    .catch(err => console.log(err))
}


grabTwo(process.argv[2])

module.exports = grabTwo