/*global angular */

/**
 * The main WeatherApp module
 *
 * @type {angular.Module}
 */

angular = require('angular');
require('angular-route');
require('../dist/templateCachePartials');

angular.module('weatherapp', ['ngRoute','WeatherPartials'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'weatherappCtrl',
			controllerAs: 'vm',
			templateUrl: '/partials/weatherapp-index.html',
			resolve: {
				store: ['weatherappStorage', function (weatherappStorage) {
					// Get the correct module (API or localStorage).
					return weatherappStorage;
				}]
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});

require('weatherappCtrl');
require('weatherappStorage');
