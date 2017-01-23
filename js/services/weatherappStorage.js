/*global angular */

/**
 * Services that persists and retrieves weatherapp from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular = require('angular');

angular.module('weatherapp')
	.factory('weatherappStorage', function ($http, $injector) {
		'use strict';
		return $injector.get('localStorage');
	})
	.factory('localStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'weatherapp-angularjs';

		return {
			get: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},
			put: function (cities) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(cities));
			}
			// delete: function (city) {
			// 	store.cities.splice(store.cities.indexOf(city), 1);
			// }
		};
	})
	.factory('weatherRequestService', function ($http) {
		'use strict';

		var apikey = '7912fc72c98b9e9e6659c3c7095a5614';
		var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apikey;

		return {
			getWeatherByLocation: function(lat, lon) {
				var url = weatherUrl + "&lat=" + lat + "&lon=" + lon;

				return $http.get(url);
			},

			getWeatherByNameCity: function(name) {
				var url = weatherUrl + '&q=' + name;

				return $http.get(url);
			}
		}
	});
