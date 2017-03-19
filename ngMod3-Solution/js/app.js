(function () {

var app = angular.module('chineseapp', []);
    app.controller('NarrowItDownController', NarrowItDownController);
    app.controller('FoundDirectiveController', FoundDirectiveController);
    app.service('MenuSearchService', MenuSearchService);
    app.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    app.directive('foundItems', FoundItemsDirective);





NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
    search = this;
    search.found = [];
    search.searchText = "";
    search.warning = "This is a warning!";
    search.searchMenus = function (searchTerm) {

        search.found = [];
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
          promise.then(function (response) {
            search.menuItems = response.data.menu_items;

            search.found = MenuSearchService.filterSearch(search.menuItems, searchTerm);
            if (searchTerm == "" || search.found.length == 0) {
            search.warning = "Sorry, nothing found.";
            $( "#warning" ).show();
        } else {
            search.warning = "";
            $( "#warning" ).hide();
        }

          })
          .catch(function (error) {
            console.log("Something went terribly wrong.");
            console.log(error);
        });


    };

    search.remove = function (index) {
        search.found.splice(index, 1);
    };


};

function LoaderService() {
    var loader = this;

};

function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'found.html',
            scope: {
                items: '<',
                onRemove: '&',
                searchText: '@',
                warning: '@'

            },
            controller: 'FoundDirectiveController as found',
            link: FoundItemsDirectiveLink,
            bindToController: true,
            transclude: true
            };
        return ddo;
    };


FoundDirectiveController.$inject = ['$scope','MenuSearchService'];
function FoundDirectiveController($scope, MenuSearchService) {
    var found = this;
    found.mytext = "Hej hej";
    found.checkNoResult = function () {
        if (found.items.length == 0 ) {
            found.warning = "Sorry, nothing found.";
            return true;
        }


        return false;
    };

    found.checkNoInput = function () {

        if (found.searchText == "") {
            found.warning = "Please enter a search text!";
            return true;
        }

        return false;
    };





};

function FoundItemsDirectiveLink(scope, element, attrs, controller) {
    // console.log('Scope', scope);
    console.log(scope);
    console.log(controller);
    console.log(element);
    // scope.$watch('found.checkNoResult()', function (newValue, oldValue) {
    //         console.log('Old value: ', oldValue);
    //         console.log('New value: ', newValue);
    //         if (newValue === true) {
    //             displayWarning();
    //         } else {
    //             removeWarning();
    //         }
    //     });

    // scope.$watch('found.checkNoInput()', function (newValue, oldValue) {
    //         console.log('Old value: ', oldValue);
    //         console.log('New value: ', newValue);
    //         if (newValue == true) {
    //             displayWarning();
    //         } else {
    //             removeWarning();
    //         }
    //     });


    function displayWarning() {
        //Use Angular jqLite
        // var warningElem = element.find("div");
        // warningElem.css('display', 'block');
        var warningElem = element.find("div.alert");
        warningElem.show();
    };

    function removeWarning() {
        // var warningElem = element.find("div");
        // warningElem.css('display', 'none');
        var warningElem = element.find("div.alert");
        warningElem.hide();
    };



};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

  service.filterSearch = function (items, searchTerm) {
    var filteredItems = [];
    for (var i = items.length - 1; i >= 0; i--) {
                var descr = items[i].description;
                if (descr.indexOf(searchTerm) >= 0) {
                    filteredItems.push(items[i]);
                }
            }
    return filteredItems;
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