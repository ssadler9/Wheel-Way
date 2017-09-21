$( document ).ready(function() {

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjr7ERSIfJac4JLYwoRPnxlsgawaArVCs",
    authDomain: "project-1-dd3d4.firebaseapp.com",
    databaseURL: "https://project-1-dd3d4.firebaseio.com",
    projectId: "project-1-dd3d4",
    storageBucket: "project-1-dd3d4.appspot.com",
    messagingSenderId: "747176525785"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Weather API/AJAX call
var weatherAPIKey = "a910455ef73b594f1148b29789a79ba8";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
      "q=austin,us&units=imperial&appid=" + weatherAPIKey;

$.ajax({
  url: queryURL,
  method: "GET"
})
.done(function(response) {
  console.log(queryURL);
  console.log(response);

  $("#city").html(response.name);
  $("#description").html(response.weather[0].description);
  $("#weather_img").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
  $("#temp").prepend(response.main.temp);

})














});

