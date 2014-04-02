'use strict';

angular.module('bioseq', [
    'ui.router',
    ])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

   /*
    * Routes
    */

    // Public routes
    $stateProvider
        .state('public', {
            abstract: true,
            template: '<ui-view/>',
        })
        .state('public.404', {
            url: '/404/',
            templateUrl: '404'
        })
        .state('public.401', {
            url: '/401/',
            templateUrl: '401'
        });

    // Regular user routes
    $stateProvider
        .state('user', {
            abstract: true,
            template: '<ui-view />',
        })
        .state('user.home', {
            url: '/',
            templateUrl: 'home',
            controller: 'HomeCtrl'
        });

    $urlRouterProvider.otherwise('/404');


    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/401');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    });

}])
;