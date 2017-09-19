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




var update_timeout = null;

google.maps.event.addListener(map, 'click', function(event){
    update_timeout = setTimeout(function(){
        do_something_here();
    }, 200);        
});

google.maps.event.addListener(map, 'dblclick', function(event) {       
    clearTimeout(update_timeout);
});