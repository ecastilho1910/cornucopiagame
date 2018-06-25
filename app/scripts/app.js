'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
var states = [{
        name: 'base',
        state: {
            abstract: true,
            url: '',
            templateUrl: 'views/base.html',
            data: { text: "Base", visible: false }
        }
    },
    {
        name: 'login',
        state: {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            data: { text: "Login", visible: false }
        }
    },
    {
        name: 'paginaInicial',
        state: {
            url: '/paginainicial',
            parent: 'base',
            templateUrl: 'views/paginaInicial.html',
            controller: 'HomeCtrl',
            data: { authorize: true, text: "Paginal Inicial", visible: true, icon: "fa-home" }
        }
    },
    {
        name: 'jogos',
        state: {
            url: '/jogos',
            parent: 'base',
            templateUrl: 'views/jogos.html',
            controller: 'JogoCtrl',
            data: { authorize: true, text: "Jogos", visible: true, icon: "fa-futbol" }
        }
    },
    {
        name: 'historico',
        state: {
            url: '/historico',
            parent: 'base',
            templateUrl: 'views/historico.html',
            controller: 'HistoricoCtrl',
            data: { authorize: true, text: "Histórico", visible: true, icon: "fa-history" }
        }
    },
    {
        name: 'perfil',
        state: {
            url: '/perfil',
            parent: 'base',
            templateUrl: 'views/perfil.html',
            controller: 'PerfilCtrl',
            data: { authorize: true, text: "Meu Perfil", visible: true, icon: "fa-user-circle" }
        }
    }
];

angular.module('app', [
        'ui.router',
        'ui.router.state.events',
        'angular-jwt',
        'ui.bootstrap',
        'ngMessages',
        'ngStorage',
        'ngAnimate',
        'toastr',
        'angular-loading-bar',
        'timer'
    ]).constant('constant', {
        'apiBase': 'http://dbo.db1.com.br:8080'
    }).factory('authInterceptor', authInterceptor)
    .config(config)
    .run(run);

function config($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.spinnerTemplate = "<div class='spiner sk-spinner-three-bounce'>" +
        "<div class='sk-bounce1 fa fa-futbol fa-4x'></div>" +
        "<div class='sk-bounce2 fa fa-futbol fa-4x'></div>" +
        "<div class='sk-bounce3 fa fa-futbol fa-4x'></div>" +
        "</div>";
    $urlRouterProvider.otherwise('/paginainicial');

    angular.forEach(states, function(state) {
        $stateProvider.state(state.name, state.state);
    });
    $httpProvider.interceptors.push('authInterceptor');
}

function run($rootScope, $location, $localStorage, $sessionStorage, jwtHelper) {
    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (toState.data.authorize) {
            var currentUser = $localStorage.currentUser || $sessionStorage.currentUser;
            if (!currentUser || jwtHelper.isTokenExpired(currentUser.token)) {
                event.preventDefault();
                $rootScope.$evalAsync(function() {
                    $location.path('/login');
                })
            }
        }
    });
}

function authInterceptor($localStorage, $sessionStorage) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            var currentUser = $localStorage.currentUser || $sessionStorage.currentUser;
            if (currentUser) {
                config.headers['Authorization'] = 'Bearer ' + currentUser.token;
            }
            return config;
        }
    }
}