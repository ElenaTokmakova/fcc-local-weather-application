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

              openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon +'&APPID=ab395f4ef9ca67740fc43a818901534f';

              $.getJSON(openWeatherUrl, function(data){                                           
                         
                          var fahrenheit = data.main.temp;
                          var celsius = (fahrenheit-32)*5/9;  
                          var location = data.name; 
                          var pressure = data.main.pressure;     
                          var clouds = data.clouds.all;  
                          var windspeed = data.wind.speed;
                          var weatherCondition = data.weather[0].description;
                          var visibility = data.visibility;
                          var humidity = data.main.humidity;
                          //var icon = data.weather[0].icon;
                                                                                                       
                          $("#temperature").html("Temperature:  " + fahrenheit + "°F");
                          $("#location").html("Your location: " + location);
                          $("#pressure").html("Pressure: " + pressure + " atm");
                          $("#clouds").html("Clouds: " + clouds + "%");
                          $("#wind").html("Wind speed: " + windspeed + " km/h");
                          $("#general").html("General weather condition: " + weatherCondition);
                          $("#visibility").html("Visibility: " + visibility + " ft");
                          $("#humidity").html("Humidity: " + humidity + " %");

                          function activeIcon() {
                            var currentWeather = data.weather[0].main;
                            console.log(currentWeather); 
                            if (currentWeather === "Clouds") {$("#cloudy").addClass("icon-background");}                                           
                            else if (currentWeather === "Rain") {$("#rainy").addClass("icon-background");}
                            else if (currentWeather === "") {$("#").addClass("");} 
                            else if (currentWeather === "") {$("#").addClass("");} 
                            else if (currentWeather === "") {$("#").addClass("");} 
                            else if (currentWeather === "") {$("#").addClass("");}                             
                          }

                          activeIcon();

                          function toCelsius(fahrenheit) {
                            celcius = Math.round((fahrenheit-32)*5/9*100)/100;
                            return celsius;
                          }

                          function toFahrenheit(celcius) {
                            fahrenheit = Math.round((celcius*9/5 - 32)*100)/100;
                            return fahrenheit;
                          }

                          $("#convertToCelsiusButton").click(function(){
                              
                              toCelsius(fahrenheit);                             
                              $("#temperature").html("Temperature:  " + celcius + "°C"); 
                              $("#convertToCelsiusButton").hide("slow", function() {
                                // Animation complete.
                              });
                              $("#convertToFahrenheitButton").show("slow", function() {
                                // Animation complete.
                              });
                          });

                          $("#convertToFahrenheitButton").click(function(){
                               toFahrenheit(celsius);
                               $("#temperature").html("Temperature:  " + fahrenheit + "°C"); 
                               $("#convertToCelsiusButton").show("slow", function() {
                                // Animation complete.
                              });
                              $("#convertToFahrenheitButton").hide("slow", function() {
                                // Animation complete.
                              });
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

// Based on dribbble shot https://dribbble.com/shots/2097042-Widget-Weather by kylor
