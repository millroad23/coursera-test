(function () {
"use strict";

angular.module('common')
.directive('menuitem', MenuItem);

MenuItem.$inject = ['$q', 'MenuService', '$timeout', '$http','ApiPath'];
function MenuItem($q, MenuService, $timeout, $http, ApiPath) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$asyncValidators.menuitem = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.resolve();
        }
        var def = $q.defer();
        var promise = MenuService.getMenuItem(viewValue);

        promise.then(
            function (response) {
            //Success

            def.resolve();

        })
        .catch(function (errorResponse) {
           def.reject();
        });
        return def.promise;

      };
    }
  };
};

})();