$(document).ready(function() {

    //https://www.w3schools.com/html/html5_geolocation.asp
    //Check if Geolocation is supported
    //If supported, run the getCurrentPosition() method. If not, display a message to the user
    //If the getCurrentPosition() method is successful, 
    //it returns a coordinates object to the first function - the success function
    
  
    function getLocation() {
        if (navigator.geolocation) {
            console.log("Navigator is supported in this browser!");
            navigator.geolocation.getCurrentPosition(function(position) {
             
              var lat = position.coords.latitude;
              var lon = position.coords.longitude;
              console.log("Latitude is ", lat, " Longitude is ", lon);  

              openWeatherUrl = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon +'&APPID=ab395f4ef9ca67740fc43a818901534f&units=metric';

              $.getJSON(openWeatherUrl, function(data){                                           
                         
                          var celsius = data.main.temp; 
                          var location = data.name; 
                          var pressure = data.main.pressure;     
                          var clouds = data.clouds.all;  
                          var windspeed = data.wind.speed;
                          var weatherCondition = data.weather[0].description;
                          var visibility = data.visibility;
                          var humidity = data.main.humidity;
                          //var icon = data.weather[0].icon;
                                                                                                       
                          $("#temperature").html("Temperature:  " + celsius + "°C");
                          $("#location").html("Your location: " + location);
                          $("#pressure").html("Pressure: " + pressure + " atm");
                          $("#clouds").html("Clouds: " + clouds + "%");
                          $("#wind").html("Wind speed: " + windspeed + " km/h");
                          $("#general").html("General weather condition: " + weatherCondition);
                          $("#visibility").html("Visibility: " + visibility);
                          $("#humidity").html("Humidity: " + humidity + " %");

                          //idea and weather keywords: https://codepen.io/imtoobose/pen/Pzqbxq
                          var sunny = /(sun|clear|calm|hot|few clouds|scattered clouds)+/i;
                          var storm = /(storm|tornado|hurricane)+/i;
                          var cloudy = /(clouds|cloud|fog|dust|haze|smok|bluster)+/i;
                          var rainy = /(rain|drizzl|shower)+/i;
                          var snowy = /(snow|freez|hail|cold|sleet)+/i;
                        
                         
                          var currentWeather = data.weather[0].main + " " + data.weather[0].description;
                          console.log(currentWeather); 
                          if (cloudy.test(currentWeather)) {$("#cloudy").addClass("icon-visible");}                                           
                          if (rainy.test(currentWeather)) {$("#rainy").addClass("icon-visible");}
                          if (sunny.test(currentWeather)) {$("#sunny").addClass("icon-visible");} 
                          if (storm.test(currentWeather)) {$("#thunder-storm").addClass("icon-visible");} 
                          if (snowy.test(currentWeather)) {$("#flurries").addClass("icon-visible");}  
                          if ($("#sunny").hasClass("icon-visible") && $("#rainy").hasClass("icon-visible")) {
                            $("#sun-shower").addClass("icon-visible");
                          } 
                                                                       
                          $("#convertToCelsiusButton").click(function(){                                                                               
                              $("#temperature").html("Temperature:  " + celsius + "°C"); 
                              $("#convertToCelsiusButton").hide();
                              $("#convertToFahrenheitButton").show();
                          });

                          $("#convertToFahrenheitButton").click(function(){
                               fahrenheit = Math.round((celsius*9/5 + 32)*100)/100; 
                               $("#temperature").html("Temperature:  " + fahrenheit + "°F"); 
                               $("#convertToCelsiusButton").show();
                              $("#convertToFahrenheitButton").hide();
                          });

               });

            },
            //The second parameter of the getCurrentPosition() method is used to handle errors. 
            //It specifies a function to run if it fails to get the user's location
            function (error) {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        $("#weather-container").html("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        $("#weather-container").html("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        $("#weather-container").html("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                        $("#weather-container").html("An unknown error occurred.");
                        break;
                }
            });
        } else {
            console.log("Navigator is not suppoerted in this browser!");
            $("#weather-container").html("Geolocation is not supported by this browser.");             
        }

    }

    getLocation();

});

// CSS icons are borrowed from CODEPEN https://codepen.io/joshbader/pen/EjXgqr

// CSS icons are based on dribbble shot https://dribbble.com/shots/2097042-Widget-Weather by kylor
