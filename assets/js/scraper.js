const request = require('request')

const getImage = require('./getimage.js')
const getZodiac = require('./getzodiac.js')
const getImgUrl = require('./getimgurl.js')
const getGoogleUrl = require('./getgoogle.js')




// let wikiPic = Array.from(document.querySelectorAll('.infobox.biography img'))[0].src
// let rawZod = Array.from(document.querySelectorAll('a.lienPosition')).filter(elm => elm.href.includes('0'))[0].textContent
// let rawZod = '25-7 Capricorn';
// let zod = rawZod.slice(rawZod.indexOf(' ') + 1);


// let theImageUrl = '';
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


// $.ajax({
//   method: 'GET',
//   url: 'http://en.wikipedia.org//w/api.php?action=query&format=json&prop=pageimages&origin=*&titles=Bradley%20Cooper&piprop=original'
// })
//   // .then(resp => console.log(resp.query.search[0]))
//     .then(resp => console.log(resp.query.pages))

    


// getImage('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//     console.log('done');
//   })


const getImgZod = (target) => {
  let zodTarg = target.replace(' ', '_')
  return Promise.all([
    getZodiac(zodTarg),
    // getImgUrl(target),
    getGoogleUrl(target)
  ]).then(values => {
    let imageUrl = values[1]
    if (!imageUrl) return null
    // console.log (!imageUrl)
    return getImage(values[1], 'test/test.png', (thing) => {
      console.log('done')
      return thing
    })
  }).then(resp => console.log(!!resp))
}

// Promise.all([
//   getZodiac('Bradley_Cooper'),
//   getImgUrl('Bradley Cooper')
// ]).then(values => getImage(values[1], 'test.png', () => {
//   console.log('done')
// }))

// console.log('zodiac works:' + getZodiac('Bradley_Cooper'))
// console.log('image url works: ' + getImgUrl('Bradley Cooper'))

// const proofOfConcept = (name) => {
//   return getImgUrl(name)
//           .then(url => getImage(url, 'test.png', () => {
//             console.log('done')
//           }))
// }

// proofOfConcept(process.argv[2])

getImgZod(process.argv[2])