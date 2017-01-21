/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the weatherappStorage service
 * - exposes the model to the template and provides event handlers
 */
angular = require('angular');

angular.module('weatherapp')
	.controller('weatherappCtrl', function weatherappCtrl($scope, $routeParams, $filter, store) {
		'use strict';


	});
