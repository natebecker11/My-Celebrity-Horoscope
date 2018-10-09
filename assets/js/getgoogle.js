const request = require('request')
const rp = require('request-promise-native')

rp('https://www.google.com/search?as_rights=(cc_publicdomain|cc_attribute|cc_sharealike).-(cc_noncommercial|cc_nonderived)&q=danny%20devito&hl=')
  .then(resp => console.log(resp))

//  https://www.googleapis.com/customsearch/v1
// public url: https://cse.google.com/cse?cx=012157156437842315643:mvefv_qtasg
// var cx = '012157156437842315643:mvefv_qtasg';
    