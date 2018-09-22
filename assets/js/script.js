// API keys for face++
var apiKey = 'pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP'
var apiSecret = 'NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j'
// call the database
var database = firebase.database();
// global var for user photo uploads
var selectedFile;


// define validation criteria
var validate = simplyValid({
  schema: 'isNotTooShort',
  minLen: 16
})

// hide certain elements on page load
$(document).ready(function() {
  $('#uploadBtn').hide();
  $('#submitBtnDiv').hide();
})


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
var showMatch = function (celebName, horoscope, celebUrl, userUrl, sign) {
  console.log('celebname= ' + celebName + ' horoscope= ' + horoscope + ' celebUrl= ' + celebUrl + ' userUrl= ' + userUrl)
  $('#userPhoto').attr('src', userUrl).addClass('resultBox');
  $('#celebPhoto').attr('src', celebUrl).addClass('resultBox');
  // $('<h3>').text('YOU MATCHED WITH ' + celebName.toUpperCase() + '!!!').appendTo($('#celebPhotoDiv'));
  // $('#celebHoroscope')
  $('#celebNameDisplay').text(celebName);
  $('#celebHoroscope').text(horoscope);
  $('#celebZodiac').text(sign);
}

// function to call the aztro API for a horoscope
var passAztro = function (name, sign, celebUrl, userUrl, date) {
  // var for whether the consent checkbox is checked  
  var consentChecked = $('#consentToggle')[0].checked
  // make a call to the aztro db with the sign
  $.ajax({
    method: 'POST',
    url: 'https://aztro.sameerkumar.website?sign=' + sign +'&day=today'
  }).then(function(response) {
    // bind the horoscope
    var horoscope = response['description'];
    // call the user display function to display the relevant data to the user
    showMatch(name, horoscope, celebUrl, userUrl, sign)
    // check whether the user consents to their photo being added to gallery
    if (consentChecked) {    
      // call the data update function to update the db
      dbPush(name, horoscope, celebUrl, userUrl, date);
    }
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

// function for the 'submit file from pc' button
var uploadUserPhoto = function() {
  // store file name
  var fileName = selectedFile.name;
  // creat root ref
  var storageRef = firebase.storage().ref('/userImages/' + fileName + '/');
  var uploadTask = storageRef.put(selectedFile);

  // listener for a change in the userImages storage ref
  uploadTask.on('state_changed', function(snapshot) {
    // observe progess, pause, resume
    // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    // switch (snapshot.state) {
    //   case firebase.storage.TaskState.PAUSED: // or 'paused'
    //     console.log('Upload is paused');
    //     break;
    //   case firebase.storage.TaskState.RUNNING: // or 'running'
    //     console.log('Upload is running');
    //     break;
    // }
    
  }, function (error) {
    // handle errors
    console.log(error)
  }, function() {
    // handle successful uploads, eg get the download url

    // retrieve the download URL for the file just added to storage
    uploadTask.snapshot.ref.getDownloadURL().then(function(userImageUrl) {
      // grab and format the date
      var formatDate = dateFns.format;
      var today = formatDate(new Date(), 'MM/DD/YYYY');
      
      // encode the use image URL for the purpose of the API request. This allows for URLs with special characters
      var encodedUserImage = encodeURI(userImageUrl);
      var urlSubmission =
    "https://api-us.faceplusplus.com/facepp/v3/search?api_key=pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP&api_secret=NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j&faceset_token=902643b643b236380ac10248ecd50371&image_url=" + encodedUserImage
    

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
        })
    })
    // console.log(uploadTask.snapshot.downloadURL)
  })
  
}


// event listener for the submit button
$(document).on("click", "#submitBtn", function() {
  // I really still do not understand dates, so potentially inefficient but working code, go:
  var formatDate = dateFns.format;
  var today = formatDate(new Date(), 'MM/DD/YYYY');

  // Here, the URL for the user's image upload is stored if there is a URL submitted.
  var userImageUrl = $('#inputboxID').val().trim();
  console.log(validate(userImageUrl))
  if (typeof userImageUrl === "string" && validate(userImageUrl).isValid && (userImageUrl.endsWith('.jpg') || userImageUrl.endsWith('.jpeg') || userImageUrl.endsWith('.png'))) {
    // var tempimg = $("<img>").attr(src, userImageUrl)
    // if (48 < tempimg[0].clientWidth < 4096 && 48 < tempimg[0].clientHeight < 4096) {

    // encoding User Url, this ensures that URLs with special characters function correctly
    var encodedUserImage = encodeURI(userImageUrl);
    // Just for clarification, that hanging userImageUrl is actually being concat to urlSubmission.
    var urlSubmission =
      "https://api-us.faceplusplus.com/facepp/v3/search?api_key=pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP&api_secret=NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j&faceset_token=902643b643b236380ac10248ecd50371&image_url=" + encodedUserImage
      

    $.ajax({
      method: "POST",
      url: urlSubmission
    })
      .then(function(result) {
        var faceToken = result['results'][0]['face_token']
        console.log(faceToken);
        // publish the results to the firebase db
        grabCelebInfo(faceToken, encodedUserImage, today);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  // } else {$("label[for='inputboxID']").text("The image must be between 48x48 pixels and 4096x4096 pixels OR the image URL is not valid.")} 
  else {
    
    $("label[for='inputboxID']").text("The URL must end with .jpg, .jpeg, or .png.")
    $("label[for='inputboxID']").addClass("elseInputboxID")
  }
});

// database listener for whenever a new match is added to the matches DB
database.ref("userMatches").orderByChild("dateAdded").limitToLast(10).on("value", function(snapshot) {
  $('#userMatchesDiv').empty();
  for (var info in snapshot.val()) {
    takeObject(snapshot.val()[info]);
  }
})






// var testObject = {
//   userImg: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
//   celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/1200px-CNN.svg.png',
//   horoscope: 'this is a horoscope'
// }


var takeObject = function(object){

  //making variables to connect to the certain key value pairs i want.
    var userURL= object.userImg;
    var celebURL= object.celebImg;
    var hororscopeString= object.horoscope;

    var image = $("<img>");
    var image2 = $("<img>");
    var pTag = $("<p>");
    
  
    //created an element of image with a source of the variable i made
  $(image).attr('src', userURL);
  $(image).addClass('resultBox');
  // $(image).attr('alt', userURL);
  $(image2).attr('src', celebURL);
  $(image2).addClass('resultBox');
  $(image2).attr('title', object.celebName)
  $(pTag).text(hororscopeString);
  $(pTag).addClass('resultBox');

  var col = $("<div>");
  $(col).addClass('col offset-1');
  $(col).append(image);

  var col2 = $("<div>");
  $(col2).addClass('col');
  $(col2).append(image2);

  var col3 = $("<div>");
  $(col3).addClass('col');
  $(col3).append(pTag);

  console.log(object);

  var createRow = $("<div>");
  $(createRow).addClass('row betterRow');
  $(createRow).append(col, col2, col3);

  $(createRow).appendTo($("#userMatchesDiv"));
  $("<br>").appendTo($("#userMatchesDiv"));
};

// takeObject(testObject);
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

//Get display looking right
  //get images to reveal as 200 * 200
  //add alt tags

  // event listener for when a user adds a file
  $('#userFile').on('change', function(event) {
    selectedFile = event.target.files[0];
    $("#uploadBtn").show();
    
  })

  // event listeners for when the photo submission method radio toggles
  $('#uploadFromDevice').on('click', function() {
    $('#submitBtnDiv').hide()
    $('#uploadArea').show()
  })

  $('#uploadFromUrl').on('click', function() {
    $('#submitBtnDiv').show();
    $('#uploadArea').hide();
  })



