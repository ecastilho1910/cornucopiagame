'use strict';

/**
 * @ngdoc function
 * @name app.sevice:jogoService
 * @description
 * # jogoService
 * Service of app
 */

angular.module('app')
    .factory('jogoService', jogoService);

function jogoService($http, $q, constant, toastr) {
    var services = {};
    services.obterRodadas = obterRodadas;
    services.obterJogosPorRodada = obterJogosPorRodada;
    services.incluirPalpite = incluirPalpite;
    services.mudarPalpite = mudarPalpite;

    function success(deferred, response) {
        deferred.resolve(response.data);
    }

    function error(deferred, ex) {
        toastr.error(ex.data.title);
        deferred.reject();
    }

    function obterRodadas() {
        var deferred = $q.defer();
        $http.get(constant.apiBase + '/api/rodadas/formatadas')
            .then(function(response) {
                success(deferred, response);
            }, function(ex) {
                error(deferred, ex);
            });
        return deferred.promise;
    }

    function obterJogosPorRodada(roundId) {
        var deferred = $q.defer();
        $http.get(constant.apiBase + '/api/jogos/rodada/' + roundId)
            .then(function(response) {
                success(deferred, response);
            }, function(ex) {
                error(deferred, ex);
            });
        return deferred.promise;
    }

    function incluirPalpite(palpite) {
        var deferred = $q.defer();
        $http.post(constant.apiBase + '/api/palpites', palpite)
            .then(function(response) {
                success(deferred, response);
            }, function(ex) {
                error(deferred, ex);
            });
        return deferred.promise;
    }

    function mudarPalpite(palpite) {
        var deferred = $q.defer();
        $http.put(constant.apiBase + '/api/palpites', palpite)
            .then(function(response) {
                success(deferred, response);
            }, function(ex) {
                error(deferred, ex);
            });
        return deferred.promise;
    }

    return services;
}