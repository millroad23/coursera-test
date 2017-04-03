(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.cMenuItems = [];
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getTheMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }
    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {

      return response.data;
    });
  };

  service.getAllMenus = function () {
    return $http.get(ApiPath + '/menu_items.json').then(function (response) {

      return response.data;
    });
  };

  service.getMenuItem = function (shortName) {
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function (response) {

      return response.data;
    });
  };



  service.validMenu = function (short_name) {
    var data = service.getAllMenus();

      return data;

  }

  service.saveMenuItems = function (menuitems) {
    service.cMenuItems = menuitems;

  };

  service.getMenuItems = function () {
    return service.cMenuItems;

  };


}



})();
