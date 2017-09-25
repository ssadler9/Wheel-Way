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
// storing firebase inside variable
var database = firebase.database();
//console.log(database);


// Weather API/AJAX call
var weatherAPIKey = "a910455ef73b594f1148b29789a79ba8";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
      "q=austin,us&units=imperial&appid=" + weatherAPIKey;

$.ajax({
  url: queryURL,
  method: "GET"
})
.done(function(response) {

  $("#city").html(response.name);
  $("#description").html(response.weather[0].description);
  $("#weather_img").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
  $("#temp").prepend(response.main.temp);

})

// labels and labelindex set for pins on google mpas
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;
      var markerArray = [];
// function that displays the map
    function initMap() {

      // Instantiate a directions service.
      var directionsService = new google.maps.DirectionsService;

      // adding center location to UT Tower
      var utTower = { lat: 30.286235, lng: -97.739396 };
         map = new google.maps.Map(document.getElementById('gmap'), {
          zoom: 15,
          center: utTower
        });


         // Create a renderer for directions and bind it to the map.
        var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
        // Instantiate an info window to hold step text.
        var stepDisplay = new google.maps.InfoWindow;
        // Display the route between the initial start and end selections.
        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, map);
          var onChangeHandler = function() {
          calculateAndDisplayRoute(
              directionsDisplay, directionsService, markerArray, stepDisplay, map);
        };


        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
          addMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          }, map);
        });
        // Add a marker at the center of the map.
        // addMarker(utTower, map);

        // copied from google for navigation
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);

      }

      // Adds a marker to the map.
      function addMarker(location, map) {
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        var marker = new google.maps.Marker({
          position: location,
          // label: labels[labelIndex++ % labels.length],
          map: map
          });

        // store the lat/lng into firebase
        database.ref().push({
          lat: location.lat,
          lng: location.lng,
          // marker: marker.label,
        })

      }
     
      database.ref().on('child_added', function(snapshot, userInput) {
         // pulling pins from database and assign to varible
         var barLat = snapshot.val().lat;
         var barLng = snapshot.val().lng;
         var location = { lat: barLat, lng: barLng };
         var marker = new google.maps.Marker({
             position: location,
             // label: labels[labelIndex++ % labels.length],
             map: map,
         });

         var contentString = '<div id="content">' +
             '<div id="siteNotice">' +
             '</div>' +
             '<form>' +
             '<form class="form-group">' +
             '<h5 id="firstHeading" class="firstHeading">Choose Obstacle:</h5>' +
             '<div id="bodyContent">' +
             '<fieldset class="form-group">' +
             '<div class="form-check">' +
             '<label class="form-check-label">' +
             '<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1">' +
             '<p><b>Stairs</b>' +
             '</label>' +
             '</div>' +
             '<div class="form-check">' +
             '<label class="form-check-label">' +
             '<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2">' +
             '<p><b>Construction</b>' +
             '</label>' +
             '</div>' +
             '<div class="form-check">' +
             '<label class="form-check-label">' +
             '<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3">' +
             '<p><b>Rough Road</b>' +
             '</label>' +
             '</div>' +
             '<div class="form-check">' +
             '<label class="form-check-label">' +
             '<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios4" value="option4">' +
             '<p><b>Ramp</b>' +
             '</label>' +
             '</div>' +
             '<div class="form-check">' +
             '<label class="form-check-label">' +
             '<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios5" value="option5">' +
             '<p><b>Obstruction</b>' +
             '</label>' +
             '</div>' +
             '<button type="submit" class="btn btn-primary">Submit</button>' +
             '</form>' +
             '</div>' +
             '</div>';


         var stairs = '<div id="content">' +
             '<div id="siteNotice">' +
             '</div>' +
             '<h1 id="firstHeading" class="firstHeading">Stairs</h1>'+
             '<div id="bodyContent">' +
             '<p><b>Stairs</b>' +
             '</div>'+
             '</div>';

        var construction = '<div id="content">' +
             '<div id="siteNotice">' +
             '</div>' +
             '<h1 id="firstHeading" class="firstHeading">Construction</h1>'+
             '<div id="bodyContent">' +
             '<p><b>Construction</b>' +
             '</div>'+
             '</div>';

        var roughRoad = '<div id="content">' +
             '<div id="siteNotice">' +
             '</div>' +
             '<h1 id="firstHeading" class="firstHeading">Rough Road</h1>'+
             '<div id="bodyContent">' +
             '<p><b>Rough Road</b>' +
             '</div>'+
             '</div>';

        var ramp = '<div id="content">' +
             '<div id="siteNotice">' +
             '</div>' +
             '<h1 id="firstHeading" class="firstHeading">Ramp</h1>'+
             '<div id="bodyContent">' +
             '<p><b>Ramp</b>' +
             '</div>'+
             '</div>';

        var obstruction = '<div id="content">' +
             '<div id="siteNotice">' +
             '</div>' +
             '<h1 id="firstHeading" class="firstHeading">Obstruction</h1>'+
             '<div id="bodyContent">' +
             '<p><b>Obstruction</b>' +
             '</div>'+
             '</div>';
   
        console.log(userInput);

         // sets variable into infoWindow
        var infowindowSubmit = new google.maps.InfoWindow({
             content: contentString
          });
        var infowindowStairs = new google.maps.InfoWindow ({
            content: stairs
          });
        var infowindowConstruction = new google.maps.InfoWindow ({
            content: construction
          });
        var infowindowRR = new google.maps.InfoWindow ({
            content: roughRoad
          });
        var infowindowRamp = new google.maps.InfoWindow ({
            content: ramp
          });
        var infowindowObstruction = new google.maps.InfoWindow ({
            content: obstruction
          });



         // marker listens for click to display infoWindow
         marker.addListener('click', function() {
             infowindowSubmit.open(map, marker);
         })

        })

        // rest of code from google for navigation
      function calculateAndDisplayRoute(directionsDisplay, directionsService,
          markerArray, stepDisplay, map) {
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(null);
        }

        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: 'WALKING'
        }, function(response, status) {
          // Route the directions and pass the response to a function to create
          // markers for each step.
          if (status === 'OK') {
            document.getElementById('warnings-panel').innerHTML =
                '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setDirections(response);
        // commented out line 136 to clear remainder of errors from showSteps
            // showSteps(response, markerArray, stepDisplay, map);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }


      function attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function() {
          // Open an info window when the marker is clicked on, containing the text
          // of the step.
          stepDisplay.setContent(text);
          stepDisplay.open(map, marker);
        });
      }







