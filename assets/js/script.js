var apiKey = "pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP";
var apiSecret = "NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j";
var config = {
  apiKey: "AIzaSyDKgQaOVe3BdoFNvJXVGwcrRiBdRnsvV5k",
  authDomain: "namegoeshere-f1eb4.firebaseapp.com",
  databaseURL: "https://namegoeshere-f1eb4.firebaseio.com",
  projectId: "namegoeshere-f1eb4",
  storageBucket: "namegoeshere-f1eb4.appspot.com",
  messagingSenderId: "134110809293"
};
firebase.initializeApp(config);
var database = firebase.database()

$.ajax({
  method: "POST",
  url:
    "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP&api_secret=NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j&image_url=https://i.imgur.com/goSHzjB.png"
})
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.log(error);
  });


$(document).on("click", "#submitBtn", function() {
  // I really still do not understand dates, so potentially inefficient but working code, go:
  var formatDate = dateFns.format;
  var today = formatDate(new Date());

  // Here, the URL for the user's image upload is stored if there is a URL submitted.
  var userImageUrl = $('#inputboxID').val().trim();
  // Basic placeholder validator for until I understand the basics of Dustin's library...
  if (userImageUrl || typeof userImageUrl === "string") {

    // Just for clarification, that hanging userImageUrl is actually being concat to urlSubmission.
    var urlSubmission =
      "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=pekZASxRDE4SRyviUuybxZZ1e8N_Y1DP&api_secret=NnQHMnRp3lRKQDwhhEHdDXEZ2ZEy2c7j&faceset_token=902643b643b236380ac10248ecd50371&image_url=" +
      userImageUrl;

    $.ajax({
      method: "POST",
      url: urlSubmission
    })
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});


database.ref().orderByChild("dateAdded").limitToLast(10).on("value", function(snapshot) {

})