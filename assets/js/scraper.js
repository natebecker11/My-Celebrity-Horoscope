// let rawZod = Array.from(document.querySelectorAll('a.lienPosition')).filter(elm => elm.href.includes('0'))[0].textContent
// let rawZod = '25-7 Capricorn';
// let zod = rawZod.slice(rawZod.indexOf(' ') + 1);

$.ajax({
  method: 'GET',
  url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&origin=*&format=json&srsearch=Bradley%20Cooper'
}).then(resp => console.log(resp.query.search[0]))



// todo:
  // redo ajax in as fetch req
  // more wiki api research