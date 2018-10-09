const rp = require('request-promise-native')


// $.ajax({
//   method: 'GET',
//   url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&origin=*&format=json&prop=info&inprop=url&srsearch=Bradley%20Cooper'
// })
//   .then(resp => resp.query.search[0].pageid)
//   .then(data => {
    
//     $.ajax({
//       method: 'GET',
//       url: 'http://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&origin=*&titles=Bradley%20Cooper&piprop=original'
//     }).then(resp => {
//       console.log(resp.query.pages[data].original.source)
//       return resp.query.pages[data].original.source
//     })
//   })

// rp('https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&origin=*&format=json&prop=info&inprop=url&srsearch=Bradley%20Cooper')
//   .then((resp) => JSON.parse(resp).query.search[0].pageid)
//   .then(data => {
//     rp('http://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&origin=*&titles=Bradley%20Cooper&piprop=original')
//       .then(resp => JSON.parse(resp).query.pages[data].original.source)
//     })
//   .catch((err) => {
//     console.error(err)
//   })

// rp('https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&origin=*&format=json&prop=info&inprop=url&srsearch=Bradley%20Cooper')
//   .then((resp) => console.log(JSON.parse(resp).query.search[0].pageid))


const getImage = celebName => {

  const wikiReq = (celeb) => {
    return rp(`http://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&origin=*&titles=${celeb}&piprop=original`)
  }

  const extractPageID = (resp) => {
    let pageKey = Object.keys(JSON.parse(resp).query.pages)
    let celebObj = JSON.parse(resp).query.pages[pageKey]
    return celebObj.original ? celebObj.original.source : null
  }

  return wikiReq(celebName)
    .then(resp => extractPageID(resp))
    .then(data => {
      console.log(data)
      return data
    })
    .catch(err => console.log(err))
}

module.exports = getImage


// getImage('Danny Devito')