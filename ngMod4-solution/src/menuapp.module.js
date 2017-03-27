(function () {
'use strict';

    angular.module('MenuApp', ['data', 'ui.router']);

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        //redirect to tab 1 if no other URL matches

        $urlRouterProvider.otherwise('/');

        //Set up UI states
        $stateProvider.state('scripts', {
            url: '/scripts',
            template: ''
        });
    };


})();