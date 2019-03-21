$(document).ready(function(){
  $('.carousel').carousel({interval: 4000});

  $("#event-search").on("click", function(event) {
     event.preventDefault();
     TweenMax.to("#logo", 1, {rotation:360});
     TweenMax.to("#event-search", 1, {rotationx:360});
     TweenMax.to("#jump", 1, {rotationy:360});

     let eventName = $('#name-input').val().trim();
     let city = $('#city-input').val().trim();
     let state = $('#state-input').val().trim();
     let country = $('#state-input').val().trim();
 
   
     let queryURL = 'https://app.ticketmaster.com/discovery/v2/events.response?size=7&city=' + city + '&state=' + state + '&keyword=' + eventName + '&country=' + country + '&apikey=gKIFF1XQOpOt3rOCV2VA3fZ41bBzgIUQ';
     $.ajax({
       url: queryURL,
       method: 'GET'
     }).then(function(response){
       
 
       for(let events = 0; events < response.page.size; events++){
         let image = $('<img>').attr('src', response._embedded.events[events].images[0].url);
         let eventName = $('<h2>').text(response._embedded.events[events].name);
         let genre = $('<h3>').text('Genre: ' + response._embedded.events[events].classifications[0].genre.name);
         let date = $('<h3>').text(response._embedded.events[events].dates.start.localDate);
         let time = $('<h3>').text(response._embedded.events[events].dates.start.localTime);
         let tickets = $("<a>").attr('href', response._embedded.events[events].url).text('Get your tickets!');
         tickets.attr("target", "_blank")
         let venue = $('<h3>').text('Venue: ' + response._embedded.events[events]._embedded.venues[0].name);
 
        var results = $("<div>").addClass("group");

        //console.log(results);
        $(results).append(image, eventName, genre, date, time, tickets, venue);
 
        $("#venue-div").append(results);
        TweenMax.to("#venue-div", 2, {x: 40, ease:Bounce.easeOut});
         
       }

       let lat = (response._embedded.events[0]._embedded.venues[0].location.latitude);
         let long = (response._embedded.events[0]._embedded.venues[0].location.longitude);
     })
 
     $.ajax({
       url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=9d59733d7f86dfa6c2aae70e5cfc0676',
       method: 'GET'
     }).then(function(response){
       
       let temp = 1.8*(response.main.temp - 273) + 32;
       let name = $('<h2>').text(response.name);
       let farenheit = $('<h4>').text(temp.toFixed(0) + '°F');
       let condition = $('<h4>').text('Outlook: ' + response.weather[0].main);
 
      var weatherResults = $("<div>").addClass("weatherGroup");

      $(weatherResults).append(name, farenheit, condition);
 
      $('#weather-div').append(weatherResults);
     })

     clearFunction();
     });
 
   

   let clearFunction = function(){
     $('#weather-div').empty();
     $('#venue-div').empty();
     TweenMax.to("#logo", 1, {rotation:360});
   }

        // Initialize Firebase
var config = {
   apiKey: "AIzaSyBQfmkGwDK9WXg9SwAnbkKYc1sdyovhUqY",
   authDomain: "cityguide-ba6f3.firebaseapp.com",
   databaseURL: "https://cityguide-ba6f3.firebaseio.com",
   projectId: "cityguide-ba6f3",
   storageBucket: "cityguide-ba6f3.appspot.com",
   messagingSenderId: "792326757095"
};
firebase.initializeApp(config);


   // Get the modal for sign up
   var modal = document.getElementById('id01');
   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function (event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
   }
   // Get the modal for sign up
   var modal = document.getElementById('id02');
   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function (event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
   }

   var signOut = $("<button>");
   //signOut.addClass("li");
   signOut.text("Sign Out");
   $(".sign-out").append(signOut);
   signOut.css("display", "none")


   $(".signupbtn").click(function (e) {
       e.preventDefault();
       var email = $("#email").val();
       var password = $("#password").val();
       console.log(email);
       console.log(password);
       firebase.auth().createUserWithEmailAndPassword(email, password)
           .then(function () {
               console.log("made it to then function");
               //window.location.href = "/index.html";
               $('#id01').css("display","none");
               //$(".sign-out").append(signOut);
               $('#sign-up').css("display","none");
               $('#login').css("display","none");
               if($(signOut).css("display", "none")){
                   $(signOut).css("display", "block")
               }

              
           }, function(err) {
               console.log("got an error: "+err);
           })/*.catch(function (error) {
           console.log(error.message);
       })*/

       function saveUser(email, password) {
           var newUserRef = userRef.push();
           newUserRef.set({
               email: email,
               password: password
           })
       }
   })

   $(signOut).click(function(){
       firebase.auth().signOut()
 .then(function() {
   // Sign-out successful.
 })
 .catch(function(error) {
   // An error happened
 });
       $('#sign-up').css("display","block");
       $('#login').css("display","block");
       $(signOut).css("display","none");

   })

   $("#userLogin").click(function (e){
       e.preventDefault();
       var email = $("#loginUser").val();
       console.log("email ="+email);
       var password = $("#loginPassword").val();
       firebase.auth().signInWithEmailAndPassword(email, password)
           .then(function () {
               console.log("made it to then function");
               //window.location.href = "/index.html";
               $('#id02').css("display","none");
               //$(".sign-out").append(signOut);
               $('#sign-up').css("display","none");
               $('#login').css("display","none");
               if($(signOut).css("display", "none")){
                   $(signOut.css("display", "block"))
               }
           })

   })

});

TweenMax.to("#city-input", 1, {y:-10});
 TweenMax.to("#state-input", 1, {y:-10});
 TweenMax.to("#name-input", 1, {y:-20});

TweenMax.to("#jump", 5, {ease:Bounce.easeOut});