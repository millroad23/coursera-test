(function () {
'use-strict';

angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];


function LunchCheckController($scope) {
    $scope.dishes = "";
    $scope.message = "";

    function splitString(stringToSplit, separator) {
      var arrayOfStrings = stringToSplit.split(separator);
      return arrayOfStrings;

    }

    $scope.checkLunch = function () {

        var nrOfDishes;
        if ($scope.dishes == "") {
            nrOfDishes = 0;
            $scope.message = "Please enter data first.";

        } else {
            var dishesArray = splitString($scope.dishes, ',');
            var nrOfDishes = dishesArray.length;
            console.log("nrOfDishes before" + nrOfDishes);
            var realValues = nrOfDishes;
            var i;
            for (i = 0; i < nrOfDishes; i++) {
                console.log("dishesArray[i]: " + dishesArray[i])
                if (dishesArray[i] == "") {
                    console.log("value:" + dishesArray[i]);
                    realValues--;
                    console.log("nr of dishes:" + realValues);
                }
            }

            if (realValues == 0 ) {

                $scope.message = "Sorry but you have to enter real values between the commas!";
            } else if (realValues <= 3) {
                $scope.message = "Enjoy!";
            } else {
                $scope.message = "Too much!";
            }
            console.log("nrOfDishes after" + nrOfDishes);

        }

    }

}




})();