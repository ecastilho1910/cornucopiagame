'use strict';

/**
 * @ngdoc function
 * @name app.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of app
 */

angular.module('app')
    .controller('LoginCtrl', loginCtrl);

function loginCtrl($scope, $location, autenticacaoService) {
    $scope.login = login;
    $scope.rememberMe = false;
    initController();

    function initController() {
        // reset login status
        autenticacaoService.logout();
    };

    function login() {
        autenticacaoService.login({
            username: $scope.username,
            password: $scope.password,
            rememberMe: $scope.rememberMe
        }).then(function() {
            $location.path('/paginainicial');
        });
    };
}