var apiKey = 'pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP'
var apiSecret = 'NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j'

$.ajax({
  method: 'POST',
  url: 'https://api-us.faceplusplus.com/facepp/v3/detect?api_key=' + apiKey +  '&api_secret=' + apiSecret + '&image_url=' + 'https://i.imgur.com/goSHzjB.png'
  
}).then(function(result) {
  console.log(result);
}).catch(function(error) {
  console.log(error)
})


// when the submit photo button is pressed
  // prompt user to submit a photo - TODO: How does this work?
  // run validation function on input to ensure it's a photo (binary?)
  // grab today's date in a var, send to firebase DB
  // store user face in firebase DB
  // api call to face++ search api
  // get celebrity name and image url from result
    // celebrity name goes to astrology api
      // return horoscope info, goes to user results
    // celebrity face url goes to user results
      // also send celeb face to firebase db
  // hide the submit screen, show the result screen
    // intermediate graphic? setTimeout?

// populate the usermatches div on page load
  // call the firebase db in the usermatches ref, limit to 10, sort by date added
  // for/in loop to create elements for each


// function to create columns

// function to create and append a row


