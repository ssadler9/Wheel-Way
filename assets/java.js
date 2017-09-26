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
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=austin,us&units=imperial&appid=" + weatherAPIKey;

$.ajax({
  url: queryURL,
  method: "GET"
})
.done(function(response) {

  $("#city").html(response.name);
  $("#description").html(response.weather[0].description);
  $("#weather_img").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
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
          // addMarker({
          //   lat: event.latLng.lat(),
          //   lng: event.latLng.lng()
          // }, map);

            var marker = new google.maps.Marker({
              position: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
              },
              map: map
            })
          google.maps.event.addListener(marker, "click", function(event){
            console.log(event);
            console.log(this);

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
             '<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="Stairs">' +
             '<p><b>Stairs</b>' +
             '</label>' +
             '</div>' +
             '<div class="form-check">' +
             '<label class="form-check-label">' +
             '<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="Construction">' +
             '<p><b>Construction</b>' +
             '</label>' +
             '</div>' +
             '<div class="form-check">' +
             '<label class="form-check-label">' +
             '<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="roughRoad">' +
             '<p><b>Rough Road</b>' +
             '</label>' +
             '</div>' +
             '<div class="form-check">' +
             '<label class="form-check-label">' +
             '<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios4" value="Ramp">' +
             '<p><b>Ramp</b>' +
             '</label>' +
             '</div>' +
             '<div class="form-check">' +
             '<label class="form-check-label">' +
             '<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios5" value="Obstruction">' +
             '<p><b>Obstruction</b>' +
             '</label>' +
             '</div>' +
             '<button type="submit" id="userSubmit" class="btn btn-primary">Submit</button>' +
             '</form>' +
             '</div>' +
             '</div>';

        var infowindowSubmit = new google.maps.InfoWindow({
             content: contentString
          });




            infowindowSubmit.open(map, marker);
                console.log(marker.position.lat());
                var position = {
                  lat: marker.position.lat(),
                  lng: marker.position.lng()
                };

                $("#userSubmit").on('click', function() {
                  var theirChoice = 'input:radio[name=optionsRadios]:checked';
                  console.log(theirChoice);
                  database.ref().push({
                          lat: position.lat,
                          lng: position.lng,
                          // marker: marker.label,
                          userchoice: $(theirChoice).val()
                        })                  
                })
          })
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


      }
     
      database.ref().on('child_added', function(snapshot) {
        console.log(snapshot.val())
         // pulling pins from database and assign to varible
         var barLat = snapshot.val().lat;
         var barLng = snapshot.val().lng;
         var location = { lat: barLat, lng: barLng };
         var marker = new google.maps.Marker({
             position: location,
             // label: labels[labelIndex++ % labels.length],
             thisexists:true,
             map: map,
             // icon:
         });



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

         // sets variable into infoWindow

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

        google.maps.event.addListener(marker, 'click', function(event) {
          // if/else to display correct inforWindow
          if (snapshot.val().userchoice === "Stairs") {
            infowindowStairs.open(map, marker);
            console.log('stairs');
          } else if (snapshot.val().userchoice === "Construction") {
            infowindowConstruction.open(map, marker);
          } else if (snapshot.val().userchoice === "roughRoad") {
            infowindowRR.open(map, marker);
          } else if (snapshot.val().userchoice === "Ramp") {
            infowindowRamp.open(map, marker);
          } else if (snapshot.val().userchoice === "Obstruction") {
            infowindowObstruction.open(map, marker);
          }
        }) 

         // marker listens for click to display infoWindow

         // marker.addListener('click', function() {
         //        infowindowSubmit.open(map, marker);
         //        console.log(marker.position.lat());
         //        var position = {
         //          lat: marker.position.lat(),
         //          lng: marker.position.lng()
         //        };
         //        $("#userSubmit").on('click', function() {
         //          database.ref().push({
         //                  lat: position.lat,
         //                  lng: position.lng,
         //                  // marker: marker.label,
         //                })                  
         //        })
         // })

         // testing if/else to display alternate infoWindows
         // if (document.getElementById('options1')) {
         //     location.addListener('click', function() {
         //      infowindowStairs.open(map, marker);
         //     })
         // }
         // ===
        });




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







