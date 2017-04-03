(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['$scope', 'UserService', 'MenuService'];
function SignupController($scope, UserService, MenuService) {
    var ctrl = this;
    ctrl.completed = false;

    ctrl.title = "Sign up for our newsletter";



    ctrl.submit = function () {
        ctrl.completed = true;
        ctrl.title = "Thank you for signing up!";
        var promise = MenuService.getMenuItem(ctrl.user.favDish);

        promise.then(
            function (response) {
            //Success
            ctrl.user.favDishObj = response;
            UserService.saveUser(ctrl.user);

        })
        .catch(function (errorResponse) {

        });

    };
};



})();