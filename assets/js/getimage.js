const fs = require('fs')
const request = require('request')

const download = (uri, filename, callback) => {  
    request.head(uri, function(err, res, body){
      if (err) throw err
      // if (!res.headers['content-type'].includes('image')) throw new Error('Not an image ' + uri)
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
      // console.log(res)
  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  
  // download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
  //   console.log('done');
  // })

  // download('https://edm.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTU3OTQ3NTQ5MDExOTQ1NDIy/b1ba73cb-d420-4123-86a3-f5f63a4fae97.jpg', 'test.png', body => {
  //   console.log(body)
  // })
  module.exports = download


