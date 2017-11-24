"use strict";

/**
 * @ngdoc function
 * @name weatherAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherAppApp
 */
angular.module("weatherAppApp")
  .controller("MainCtrl", function ($scope, $http, _, $timeout) {
    var vm  = this;
    vm.lat = 9;
    vm.lng = 8.5;
    vm.date = moment().format("dddd, MMMM Do YYYY");

    // Openweathermap API config for making API calls
    vm.API_CONFIG = {
    apiURL: "http://api.openweathermap.org/data/2.5/",
    apiName: "best_weather",
    apiKey: "aac5ee4801285611609fda05174f083c"
    };
    vm.weatherData = {};
  
    function updateTIme() {
    vm.time = moment().format("LTS");
    $timeout(updateTIme, 1000, true);
    }
    updateTIme();  
    
    /**
     * Get weather data  around a provided point
     * count is the number of cities around the point to get their weather data
     */

    vm.getWeatherData = function(lat,lng,count) {
      var apiURL = vm.API_CONFIG.apiURL+"find?lat=" + lat + "&lon=" + lng + "&cnt=" + count + "&units=metric&appid=" + vm.API_CONFIG.apiKey;
      vm.loading = true;
  
      $http.get(apiURL).then(function(result){
        vm.weatherData = result.data.list;
        // Sort weather data to get in descending order
        vm.indexedWeatherData = _.sortBy(vm.weatherData, function(weather){
          weather.imageSource = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
          return weather.main.temp;
        });
        // the coolest weather at index 0 after sorting weather data
        vm.coolestWeather = vm.indexedWeatherData[0];
      },
      function (error){
        console.log(error, "error getting data");
      });

      vm.loading = false;
    };

    vm.getWeatherData(vm.lat,vm.lng,15);

  });
