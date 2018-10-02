
const fetch = require('node-fetch');

// import fetch from 'node-fetch';

// let wikiPic = Array.from(document.querySelectorAll('.infobox.biography img'))[0].src
// let rawZod = Array.from(document.querySelectorAll('a.lienPosition')).filter(elm => elm.href.includes('0'))[0].textContent
// let rawZod = '25-7 Capricorn';
// let zod = rawZod.slice(rawZod.indexOf(' ') + 1);

const fetchData = url => {
  fetch(url)
    .then(resp => resp.json())
    // .then(resp => resp['batchcomplete'])
    // .then(resp => JSON.stringify(resp))
    .then(resp => console.log(resp['query']['search'][0]['pageid']))
}

// $.ajax({
//   method: 'GET',
//   url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&origin=*&format=json&prop=info&inprop=url&srsearch=Bradley%20Cooper'
// })
//   // .then(resp => console.log(resp.query.search[0]))
//     .then(resp => console.log(resp))



fetchData('https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&origin=*&format=json&prop=info&inprop=url&srsearch=Bradley%20Cooper')

// todo:
  // redo ajax in as fetch req
  // more wiki api research