(function () {
'use strict';

angular.module('MenuApp').config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {


  $urlRouterProvider.otherwise('/');


  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Categories
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/main-categories.template.html',
    controller: 'CategoriesController as categories',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Categoris items
  .state('items', {
    url: '/items/{short_name}',
    templateUrl: 'src/templates/item.template.html',
    controller: 'ItemController as menu',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.short_name)
                .then(function (items) {
                  return items;
                });
            }]
    },
    params: {short_name: null, name:null}
  });



}

})();