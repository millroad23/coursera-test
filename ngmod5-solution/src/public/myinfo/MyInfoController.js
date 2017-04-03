(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user', 'UserService'];
function MyInfoController(user, UserService) {
    var ctrl = this;
    ctrl.title = "My information";
    ctrl.user = user;


};



})();