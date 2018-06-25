'use strict';

/**
 * @ngdoc function
 * @name app.sevice:contaService
 * @description
 * # contaService
 * Service of app
 */

angular.module('app')
    .factory('contaService', contaService);

function contaService($http, $q, constant, toastr) {
    var services = {};
    services.obterDadosUsuarioLogado = obterDadosUsuarioLogado;
    services.salvarAlteracaoDadosUsuario = salvarAlteracaoDadosUsuario;
    services.salvarAlteracaoNovaSenha = salvarAlteracaoNovaSenha;

    function success(deferred, response) {
        deferred.resolve(response.data);
    }

    function error(deferred, ex) {
        toastr.error(ex.data.title);
        deferred.reject();
    }

    function obterDadosUsuarioLogado() {
        var deferred = $q.defer();
        $http.get(constant.apiBase + '/api/account')
            .then(function (response) {
                success(deferred, response);
            }, function (ex) {
                error(deferred, ex);
            });
        return deferred.promise;
    }

    function salvarAlteracaoDadosUsuario(usuario) {
        var deferred = $q.defer();
        $http.post(constant.apiBase + '/api/account', usuario)
            .then(function (response) {
                success(deferred, response);
            }, function (ex) {
                error(deferred, ex);
            });
        return deferred.promise;
    }

    function salvarAlteracaoNovaSenha(newPassword) {
        var deferred = $q.defer();
        $http.post(constant.apiBase + '/api/account/change-password', newPassword)
            .then(function (response) {
                success(deferred, response);
            }, function (ex) {
                error(deferred, ex);
            });
        return deferred.promise;
    }

    return services;
}