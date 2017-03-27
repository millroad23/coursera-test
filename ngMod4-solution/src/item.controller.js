(function () {
'use strict';

angular.module('MenuApp').controller('ItemController', ItemController);

// Version with resolving to 1 item based on $stateParams in route config
ItemController.$inject = ['$stateParams', 'items'];
function ItemController($stateParams, items) {
    this.title = $stateParams.name;
    this.items = items.data.menu_items;

    console.log('$stateParams: ', $stateParams);
}

})();
