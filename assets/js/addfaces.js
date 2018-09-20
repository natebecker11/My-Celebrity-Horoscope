// API keys for face++
var apiKey = 'pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP';
var apiSecret = 'NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j';
// identifiers for our faceSet
var faceSetID = 'CWRU-Ilvermorny-2018-Faceset2';
var faceSetToken = '902643b643b236380ac10248ecd50371';
// firebase DB refs
var database = firebase.database();

var createFaceset = function() {
  $.ajax({
    method: 'POST',
    url: 'https://api-us.faceplusplus.com/facepp/v3/faceset/create?api_key=' + apiKey + '&api_secret=' + apiSecret + '&display_name=CelebHoroscopeFaceset2&outer_id=CWRU-Ilvermorny-2018-Faceset2'
  }).then(function(response) {
    console.log(response)
  })
}

// function to add a face to our faceset
var faceAdder = function(token, name, sign, imageUrl) {
  // api call to the addFace API
  $.ajax({
    method: 'POST',
    url: 'https://api-us.faceplusplus.com/facepp/v3/faceset/addface?api_key=' + apiKey + '&api_secret=' + apiSecret + '&faceset_token=' + faceSetToken + '&face_tokens=' + token
  }).then(function(response) {
    // console.log(response['face_added'])
    // returns number of faces added for validation purposes
    if (response['face_added'] === 1) {
      // set the image url, celeb name, zodiac sign, and face token to firebase DB
    // in the firebase database celebs ref, inside a subref named after the face token
    database.ref('/celebsRef/' + token + '/')
    // set the url, name, sign, and face token
    .set({
      url: imageUrl,
      name: name,
      sign: sign,
      token: token
    })
  // give confirmation
  $('#confirmationBox').text('Added a celebrity.');
  $('#celebPic').attr('src', imageUrl);
  $('#celebName').text('Name: ' + name);
  $('#celebSign').text('Sign: ' + sign);
  $('#celebToken').text('Token: ' + token);
    }
  })
}

// function to detect a face in a supplied image url and return a token
var createToken = function(imageUrl, name, sign) {  
  // api call to the detect API
  $.ajax({
      method: 'POST',
      url: 'https://api-us.faceplusplus.com/facepp/v3/detect?api_key=' + apiKey + '&api_secret=' + apiSecret + '&image_url=' + imageUrl
    }).then(function(response) {
      let token = response.faces[0]['face_token'];
      console.log(token);
      faceAdder(token, name, sign, imageUrl);
    })
  
}


// function to clear all face tokens in the faceset, COMMENT THIS OUT BEFORE DEPLOYING
// var clearFaceSet = function() {
//   $.ajax({
//     method: 'POST',
//     url: 'https://api-us.faceplusplus.com/facepp/v3/faceset/removeface?api_key=' + apiKey + '&api_secret=' + apiSecret + '&faceset_token=' + faceSetToken + '&face_tokens=' + 'RemoveAllFaceTokens'
//   }).then(function(response) {
//     console.log('Removed tokens: ' + response['face_removed'])
//   })
// }

// function to see the faceSet details
var faceSetDetail = function() {
  $.ajax({
    method: 'POST',
    url: 'https://api-us.faceplusplus.com/facepp/v3/faceset/getdetail?api_key=' + apiKey + '&api_secret=' + apiSecret + '&faceset_token=' + faceSetToken
  }).then(function(response) {
    console.log(response['face_tokens'])
  })
}


// // // DEPRECATED!!!
// // function to add a new face to the face set, taking an image url, a celeb name, and a zodiac sign as the parameters
// var faceSetter = function(imageUrl, name, sign) {
//   // generate a token for the linked image
//   var token = createToken(imageUrl);
//   // add that token to the face set, returns 1 if the face was added successfully
//   var faceAdded = faceAdder(token);
//   // check to see if the face was added successfully
//   if (faceAdded === 1) {        
//     // set the image url, celeb name, zodiac sign, and face token to firebase DB
//     // in the firebase database celebs ref, inside a subref named after the face token
//     celebsRef.ref('/' + token + '/')
//       // set the url, name, sign, and face token
//       .set({
//         url: imageUrl,
//         name: name,
//         sign: sign,
//         token: token
//       })
//     // give confirmation
//     $('#confirmationBox').text('Added a celebrity. Name: ' + name + ' url: ' + imageUrl + ' sign: ' + sign + ' token: ' + token)
//   }
//   else {
//     // error message
//     $('#confirmationBox').text('Error, operation not complete');
//   }   
// }



// event listener for submit button
$('#submitBtn').on('click', function() {
  var url = $('#urlInput').val();
  var name = $('#nameInput').val();
  var sign = $('#signInput').val();
  if (url && name && sign) {
    createToken(url, name, sign);
    url = '';
    name = '';
    sign = '';
    $('#urlInput').empty();
    $('#nameInput').empty();
    $('#signInput').empty();
  }
})






//sample face token for reference: a0cdbe3d8b94ec7e0623fd74bedaac9c