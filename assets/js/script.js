var apiKey = 'pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP'
var apiSecret = 'NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j'
var database = firebase.database();


var ajaxTest = function() {
  $.ajax({
    method: 'POST',
    url: 'https://api-us.faceplusplus.com/facepp/v3/detect?api_key=' + apiKey +  '&api_secret=' + apiSecret + '&image_url=' + 'https://i.imgur.com/goSHzjB.png'
    
  }).then(function(result) {
    console.log(result);
  }).catch(function(error) {
    console.log(error)
  })
}


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
// function createCols(newCol){
//   var newCol = $("th").append(
//     $("<td>").text(),
//   );
//   $("#userResults > tbody > th").append(newCol);
// }


// function to create and append a row (We can change this if our intention is to add multiple rows with one table heading. )
// function createRow(newRow){
//   var newRow = $("<tr>").append(
//     $("<td>").text(newCol),
//     $("<td>").text(newCol),
//     $("<td>").text(newCol),
//   );
//   $("#userResults > tbody").append(newRow);
// }


// object 

var testObject = {
  userImg: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/1200px-CNN.svg.png',
  horoscope: 'this is a horoscope'
}


var takeObject = function(object){

  //making variables to connect to the certain key value pairs i want.
    var userURL= object.userImg;
    var celebURL= object.celebImg;
    var hororscopeString= object.horoscope;
    
    var image = $("<img>");
    var image2 = $("<img>");
    

    //created an element of image with a source of the variable i made
  $(image).attr('src', userURL);
  $(image2).attr('src', celebURL);
  $('#horoscopeID').attr(hororscopeString);

  var col = $("<div>");
  $(col).addClass('col-4');
  $(col).append(image);

  var col2 = $("<div>");
  $(col).addClass('col-4');
  $(col).append(image2);

  var col3 = $("<div>");
  $(col).addClass('col-4');
  $(col).append(horoscopeID);

  console.log(object);

  var createRow = $("<div>");
};

takeObject(testObject);
// create elements from an ojbect of data$("<>").text().val();
 // define a function that takes an object  as an argument
   // parse the data inside
     // run column and row creation functions
       // run row maker
         // run column creator for userImg
         // run col creator for celebImg
         // run col creator for horoscope

// create a new column

// append a column to a row

// create a row comprised of columns, and append it to a target div`