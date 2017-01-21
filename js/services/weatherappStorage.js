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

		var store = {

		};

		return store;
	});
