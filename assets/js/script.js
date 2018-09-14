var apiKey = 'pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP'
var apiSecret = 'NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j'

$.ajax({
  method: 'POST',
  url: 'https://api-us.faceplusplus.com/facepp/v3/detect?api_key=pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP&api_secret=NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j&image_url=https://i.imgur.com/goSHzjB.png'
  
}).then(function(result) {
  console.log(result);
}).catch(function(error) {
  console.log(error)
})