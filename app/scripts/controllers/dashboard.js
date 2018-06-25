'use strict';

/**
 * @ngdoc function
 * @name app.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of app
 */

angular.module('app')
    .controller('DashboardCtrl', dashboardCtrl);

function dashboardCtrl($scope, $state, $location, autenticacaoService) {
    $scope.$state = $state;
    $scope.isCollapsed = true;

    $scope.menuItems = [];
    angular.forEach($state.get(), function(item) {
        if (item.data && item.data.visible) {
            $scope.menuItems.push({ name: item.name, text: item.data.text, icon: item.data.icon });
        }
    });

    $scope.logout = function() {
        autenticacaoService.logout();
        $location.path('/login');
    }
}