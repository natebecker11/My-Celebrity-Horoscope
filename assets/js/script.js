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

// function to update the database after a user match has been made, to record that match
var dbPush = function (celebName, horoscope, celebUrl, userUrl, date) {
  console.log('celebname= ' + celebName + ' horoscope= ' + horoscope + ' celebUrl= ' + celebUrl + ' userUrl= ' + userUrl + ' date added= ' + date)
  // push to the usermatches ref on the firebase db
  database.ref('userMatches').push({
    celebImg: celebUrl,
    horoscope: horoscope,
    userImg: userUrl,
    dateAdded: date,
    celebName: celebName
  })
}
// function to display the user match 
var showMatch = function (celebName, horoscope, celebUrl, userUrl) {
  console.log('celebname= ' + celebName + ' horoscope= ' + horoscope + ' celebUrl= ' + celebUrl + ' userUrl= ' + userUrl)
  $('<img>').attr('src', userUrl).appendTo($('#userPhotoDiv'));
  $('<img>').attr('src', celebUrl).appendTo($('#celebPhotoDiv'));
  $('<h3>').text('YOU MATCHED WITH ' + celebName.toUpperCase() + '!!!').appendTo($('#celebPhotoDiv'));
  $('<p>').text(horoscope).appendTo($('#celebHoroscope'));
}

// function to call the aztro API for a horoscope
var passAztro = function (name, sign, celebUrl, userUrl, date) {
  // make a call to the aztro db with the sign
  $.ajax({
    method: 'POST',
    url: 'https://aztro.sameerkumar.website?sign=' + sign +'&day=today'
  }).then(function(response) {
    // bind the horoscope
    var horoscope = response['description'];
    // call the data update function to update the db
    dbPush(name, horoscope, celebUrl, userUrl, date);
    // call the user display function to display the relevant data to the user
    showMatch(name, horoscope, celebUrl, userUrl)
  })
}

// function to call the FB database after a token is generated, to retreive appropriate celeb info
var grabCelebInfo = function (token, userUrl, date) {
  // call the db for the celeb token provided by face++
  database.ref('/celebsRef/' + token + '/').once('value', function(snap) {
    var celeb = snap.val();
    // send the name, sign and info on to the function that queries Aztro
    passAztro(celeb.name, celeb.sign, celeb.url, userUrl, date)
  })     
}





// function to process the data from the returned AJAX and the user input
var processUserMatch = function () {

}

$(document).on("click", "#submitBtn", function() {
  // I really still do not understand dates, so potentially inefficient but working code, go:
  var formatDate = dateFns.format;
  var today = formatDate(new Date());

  // Here, the URL for the user's image upload is stored if there is a URL submitted.
  var userImageUrl = $('#inputboxID').val().trim();
  // Basic placeholder validator for until I understand the basics of Dustin's library...
  if (userImageUrl && typeof userImageUrl === "string") {

    // Just for clarification, that hanging userImageUrl is actually being concat to urlSubmission.
    var urlSubmission =
      "https://api-us.faceplusplus.com/facepp/v3/search?api_key=pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP&api_secret=NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j&faceset_token=902643b643b236380ac10248ecd50371&image_url=" + userImageUrl
      

    $.ajax({
      method: "POST",
      url: urlSubmission
    })
      .then(function(result) {
        var faceToken = result['results'][0]['face_token']
        console.log(faceToken);
        // publish the results to the firebase db
        grabCelebInfo(faceToken, userImageUrl, today);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});

// The userMatches may need to change if you have a different file system in mind...
database.ref("userMatches").orderByChild("dateAdded").limitToLast(10).on("value", function(snapshot) {
  for (var info in snapshot.val()) {
    // takeObject(snapshot[i])}
    // console.log(snapshot.val()[info]);
  }
})

// function to create columns
function createCols(newCol){
  var newCol = $("th").append(
    $("<td>").text(),
  );
  $("#userResults > tbody > th").append(newCol);
}


// function to create and append a row (We can change this if our intention is to add multiple rows with one table heading. )
function createRow(newRow){
  var newRow = $("<tr>").append(
    $("<td>").text(newCol),
    $("<td>").text(newCol),
    $("<td>").text(newCol),
  );
  $("#userResults > tbody").append(newRow);
}


