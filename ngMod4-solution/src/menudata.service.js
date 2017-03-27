(function () {
'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', 'ApiBasePath']
    function MenuDataService($http, ApiBasePath) {
        this.getAllCategories = function () {

            var response = $http({
              method: "GET",
              // url: (ApiBasePath + "/categories.json"),
              url: ("https://davids-restaurant.herokuapp.com/categories.json")
            });
        return response;
        };

        this.getItemsForCategory = function (ShortName) {
            var response = $http({
              method: "GET",
              url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
              params: {
                category: ShortName
              }
            });
            // console.log('getItemsForCategory', response);
            return response;

        };
    };




})();