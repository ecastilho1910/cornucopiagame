'use strict';

/**
 * @ngdoc function
 * @name app.sevice:rankingService
 * @description
 * # rankingService
 * Service of app
 */

angular.module('app')
    .factory('rankingService', rankingService);

function rankingService($http, $q, constant, toastr) {
    var services = {};
    services.obterRankingGeral = obterRankingGeral;
    services.obterRankingRodada = obterRankingRodada;

    function success(deferred, response) {
        deferred.resolve(response.data);
    }

    function error(deferred, ex) {
        toastr.error(ex.data.title);
        deferred.reject();
    }

    function obterRankingGeral(uuidEmpresa) {
        var deferred = $q.defer();
        $http.get(constant.apiBase + '/api/ranking/geral/' + uuidEmpresa)
            .then(function(response) {
                success(deferred, response);
            }, function(ex) {
                error(deferred, ex);
            });
        return deferred.promise;
    }

    function obterRankingRodada(uuidEmpresa) {
        var deferred = $q.defer();
        $http.get(constant.apiBase + '/api/ranking/rodada/' + uuidEmpresa)
            .then(function(response) {
                success(deferred, response);
            }, function(ex) {
                error(deferred, ex);
            });
        return deferred.promise;
    }

    return services;
}