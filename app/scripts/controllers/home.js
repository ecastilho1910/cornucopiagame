'use strict';

/**
 * @ngdoc function
 * @name app.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of app
 */

angular.module('app')
    .controller('HomeCtrl', homeCtrl)
    .filter('makePositive', function() {
        return function(num) { return Math.abs(num); }
    })
    .filter('makeScorePlural', function() {
        return function(score) {
            var result = score > 1 ? " Pontos" : " Ponto";
            return score + result;
        }
    });

function homeCtrl($scope, $q, $timeout, $uibModal, rankingService, contaService, WizardHandler, toastr) {

    $scope.showDeckDataValidation = false;
    $scope.showDeckAuthentication = false;
    $scope.showDeckSessionManagement = false;
    $scope.showDeckAuthorization = false;
    $scope.showDeckCryptography = false;
   
    var wizardInit = true;
    $scope.$on('wizard:stepChanged', function(event, data) {
        if (wizardInit) {
            wizardInit = false;
            setTimeout(function() {
                WizardHandler.wizard().goTo(0);
                $scope.$apply();
            });
        }
    });   

    $scope.players = [
        {	icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Emershow",  maker: "Emerson", selected: false	},
        {	icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Fusca", maker: "Wagner", selected: false	},
        {	icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Maikon", maker: "Maikon", selected: false	},
        {	icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Cachhoeira",	maker: "Cachoeira",	selected: false	},
        {	icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Vini",	maker: "Vinicius",	selected: false	},
        {	icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Tiuzão",	maker: "Edoil",	selected: false	}
   ];

    $scope.changeStepPlayersToDeckSuitTs = function() {
        var filtered = _.where($scope.players, {selected: true});
        if(filtered.length <= 3){
            toastr.error('Please, choose ate least 4 challengers.');     
            return false;
        }
        WizardHandler.wizard().next();
    };

    $scope.deckCards = [
        {	icon: "<i class='fa fa-lg fa-code' style='color: #7a747b;'></i>", idDeck: "1",  name: "Data validation and encoding",	selected: false	},
        {	icon: "<i class='fa fa-lg fa-user-secret' style='color: #5f8ea0;'></i>", idDeck: "2", name: "Authentication",	selected: false	},
        {	icon: "<i class='fa fa-lg fa-cogs' style='color: #5b906e;'></i>", idDeck: "3", name: "Session management",	selected: false	},
        {	icon: "<i class='fa fa-lg fa-user-times' style='color: #b59b6c;'></i>", idDeck: "4",	name: "Authorization",	selected: false	},
        {	icon: "<i class='fa fa-lg fa-unlock-alt' style='color: #895091;'></i>", idDeck: "5",	name: "Cryptography",	selected: false	}
   ];

    $scope.changeStepDeckSuitToStartTheGame = function() {
        var filtered = _.where($scope.deckCards, {selected: true});
        if(filtered.length === 0){
            toastr.error('Please, choose one card of deck.');     
            return false;
        }

        $scope.showDeckDataValidation = false;
        $scope.showDeckAuthentication = false;
        $scope.showDeckSessionManagement = false;
        $scope.showDeckAuthorization = false;
        $scope.showDeckCryptography = false;

        _.each(filtered, function(deck) {
            switch(deck.idDeck) {
                case "1":
                    $scope.showDeckDataValidation = true;
                    break;
                case "2":
                    $scope.showDeckAuthentication = true;
                    break;
                case "3":
                    $scope.showDeckSessionManagement = true;
                    break;
                case "4":
                    $scope.showDeckAuthorization = true;
                    break;
                case "5":
                    $scope.showDeckCryptography = true;
                    break;                    
                default:
                    $scope.showDeckDataValidation = false;
                    $scope.showDeckAuthentication = false;
                    $scope.showDeckSessionManagement = false;
                    $scope.showDeckAuthorization = false;
                    $scope.showDeckCryptography = false;
            }
        });


        WizardHandler.wizard().next();
    };    
}