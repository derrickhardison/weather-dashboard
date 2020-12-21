$(document).ready(function () {
  //DOM VARIABLES
  var cityHistoryEl = $("#cityHistory");

  //JAVASCRIPT VARIABLES
  var nameOfCity = "atlanta";
  var APIKey = "7138f209713bfc5af60e3ab4b13ebf4e";
  var cityHistoryArray = [];
  // Here we are building the URL we need to query the database

  var queryURL2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    nameOfCity +
    "&appid=" +
    APIKey;

  //FUNCTION DEFINITIONS

  function setStorage() {
    // if (localStorage.getItem("localCityHistory")){
    //   cityHistoryArray = localStorage.getItem("localCityHistory")

    // }
    localStorage.setItem("localCityHistory", JSON.stringify(cityHistoryArray));
    onLoad();
  }

  function onLoad() {
    cityHistoryEl.html("");

    if (localStorage.getItem("localCityHistory")) {
      cityHistoryArray = JSON.parse(localStorage.getItem("localCityHistory"));
    }

    for (i = 0; i < cityHistoryArray.length; i++) {
      var newListItem = $("<li>");

      newListItem.addClass("list-group-item").text(cityHistoryArray[i]);
      cityHistoryEl.append(newListItem);

      console.log(cityHistoryArray[i]);
    }
  }

  function searchForACity(city) {
    if (cityHistoryArray.indexOf(city) !== -1) {
      cityHistoryArray.splice(cityHistoryArray.indexOf(city), 1);
    }
    cityHistoryArray.unshift(city);
    setStorage();

    // Here we run our AJAX call to the OpenWeatherMap API
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      APIKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        // grabbing name of city and adding it to page
        dynamicNameCity = response.name;
        $("#dynCityName").text(dynamicNameCity);

        // grabbing temperature of city and adding it to page
        dynamicTemp = response.main.temp;
        $("#dynTemperature").text("Temperature: " + dynamicTemp + " °F");

        // grabbing humidity of city and adding it to page
        dynamicHumid = response.main.humidity;
        $("#dynHumid").text("Humidity: " + dynamicHumid + " %");

        // grabbing wind speed of city and adding it to page
        dynamicWindSpeed = response.wind.speed;
        $("#dynWindSpeed").text("Wind Speed: " + dynamicWindSpeed + " MPH");

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        imageIconCode = response.weather[0].icon;
        imageSourceURL =
          "http://openweathermap.org/img/wn/" + imageIconCode + "@2x.png";
        $("#iconImage").attr("src", imageSourceURL);

        console.log(imageSourceURL);

        // tested for weather icon - did not work
        // console.log(response.weather[0].icon)
      });

    $.ajax({
      url: queryURL2,
      method: "GET",
    }).then(function (response) {
      forecastTemp = response.list[0].main.temp;
      $("#forecastTemp").text(forecastTemp);

      forecastHumid = response.list[0].main.humidity;
      $("#forecastHumidity").text(forecastHumid);

      console.log(queryURL2);
      console.log(response);
    });
  }

  // FUNCTION CALLS
  onLoad();

  // Event listeners
  $(".search-button").on("click", function () {
    var cityInput = $("#citySearch").val();
    searchForACity(cityInput);
  });

  $(document).on("click", ".list-group-item", function (event) {
    var searchParam = event.target.textContent;
    searchForACity(searchParam);
  });
});
