/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the weatherappStorage service
 * - exposes the model to the template and provides event handlers
 */
angular = require('angular');

angular.module('weatherapp')
	.controller('weatherappCtrl', function weatherappCtrl($scope, $routeParams, $filter, weatherappStorage, weatherRequestService) {
		'use strict';

		var vm = this;
		var cities = $scope.cities = weatherappStorage.get();
		$scope.$watch('cities', function () {
			weatherappStorage.put(cities);
		}, true);

		if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      $scope.$apply(function(){
	        $scope.position = position;

					weatherRequestService.getWeatherByLocation(position.coords.latitude, position.coords.longitude).then(function(responce) {
						var city = {
							name: responce.data.name,
							temp: responce.data.main.temp,
							humidity: responce.data.main.humidity
						};
						$scope.currentCity = city;
					}, function(error) {
						console.log(error);
					});
	      });
	    });
	  };

		vm.AddCity = function(nameCity) {
			if (nameCity) {
				var _nameCity = nameCity;
				vm.nameCity = '';
				weatherRequestService.getWeatherByNameCity(_nameCity).then(function(responce) {
					var city = {
						name: responce.data.name,
						temp: responce.data.main.temp,
						humidity: responce.data.main.humidity
					};
					if (cities.length > 0) {
						var _equalName = false;
						for (var i = 0; i < cities.length; i++) {
							if (city.name === cities[i].name) {
								_equalName = true;
							}
						}
						if (_equalName === false) {
							cities.push(city);
						}
					} else {
						cities.push(city);
					}
				}, function(error) {
					console.log(error);
				})
			}
		};

		vm.RemoveCity = function(listCity) {
			cities.splice(cities.indexOf(listCity), 1);
		};

	});
