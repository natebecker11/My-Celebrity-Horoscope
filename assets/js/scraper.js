const grabber = require('./download.js')
// // fetch api setup

// const fetch = require('node-fetch');

// const fetchData = url => {
//   fetch(url)
//     .then(resp => resp.json())
//     .then(resp => console.log(resp['query']['search'][0]['pageid']))
// }
// fetchData('https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&origin=*&format=json&prop=info&inprop=url&srsearch=Bradley%20Cooper')


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

    

// todo:
  // figure out puppeteer

grabber('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
    console.log('done');
  })