$(document).ready(function(){
    $("#event-search").on("click", function(event) {
      event.preventDefault();
  
      let eventName = $('#name-input').val().trim();
      let city = $('#city-input').val().trim();
      let state = $('#state-input').val().trim();
      let country = $('#state-input').val().trim();
  
  
  
      let queryURL = 'https://app.ticketmaster.com/discovery/v2/events.response?size=20&city=' + city + '&state=' + state + '&keyword=' + eventName + '&country=' + country + '&apikey=gKIFF1XQOpOt3rOCV2VA3fZ41bBzgIUQ';
      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function(response){
        
  
        for(let events = 0; events < response.page.size; events++){
          let image = $('<img>').attr('src', response._embedded.events[events].images[0].url);
          let eventName = $('<h2>').text('Event: ' + response._embedded.events[events].name);
          let genre = $('<h3>').text('Genre: ' + response._embedded.events[events].classifications[0].genre.name);
          let date = $('<h3>').text('Start date: ' + response._embedded.events[events].dates.start.localDate);
          let time = $('<h3>').text('Start time: ' + response._embedded.events[events].dates.start.localTime);
          let tickets = $("<a>").attr('href', response._embedded.events[events].url).text('Get your tickets!');
          tickets.attr("target", "_blank")
          let venue = $('<h5>').text('Venue: ' + response._embedded.events[events]._embedded.venues[0].name);
  
          $('#venue-div').append(image, eventName, genre, date, time, tickets, venue);
  
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
  
        $('#weather-div').append(name, farenheit, condition);
      })
  
      clearFunction();
  
      });
  
    
    });
  
    let clearFunction = function(){
      $('#weather-div').empty();
      $('#venue-div').empty();
    }
  