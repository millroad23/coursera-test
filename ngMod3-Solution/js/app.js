(function () {

var app = angular.module('chineseapp', []);
    app.controller('SearchController', SearchController);
    app.controller('FoundDirectiveController', FoundDirectiveController);
    app.service('MenuCategoriesService', MenuCategoriesService);
    app.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");
    // app.constant('ApiBasePath', "http://localhost:3000/json");
    app.directive('foundItems', FoundItemsDirective);



function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'found.html',
            scope: {
                items: '=',
                title: '@',
                onRemove: '&'
            },
            controller: 'FoundDirectiveController as found',
            bindToController: true
            };
        return ddo;
    };

function FoundDirectiveController() {

};

SearchController.$inject = ['MenuCategoriesService'];
function SearchController(MenuCategoriesService) {
    search = this;
    search.title = "Found items";
    search.searchText = "";
    search.foundList = [];
    search.searchMenus = function (searchTerm) {
        search.foundList = [];
        var promise = MenuCategoriesService.getMatchedMenuItems(searchTerm);

          promise.then(function (response) {
            search.menuItems = response.data.menu_items;
            // search.foundList = search.menuItems;
            console.log('Categories: ', search.menuItems);

            for (var i = search.menuItems.length - 1; i >= 0; i--) {
                var descr = search.menuItems[i].description;
                if (descr.indexOf(searchTerm) >= 0) {
                    search.foundList.push(search.menuItems[i]);
                }
            }
          })
          .catch(function (error) {
            console.log("Something went terribly wrong.");
        });
    };

    search.remove = function (index) {
        search.foundList.splice(index, 1);
    };


};

MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

  var foundList = [];
  service.searchMenus = function () {
    cats = service.getMenuCategories();

  };

}


})();