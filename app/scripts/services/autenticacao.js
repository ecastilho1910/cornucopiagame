'use strict';

angular.module('app')
    .factory('autenticacaoService', service);

function service($http, $q, $localStorage, $sessionStorage, constant, toastr) {
    var services = {};
    services.login = login;
    services.logout = logout;

    function login(data) {
        var deferred = $q.defer();
        $http.post(constant.apiBase + '/api/authenticate', data)
            .then(function(response) {
                success(deferred, data, response);
            }, function(ex) {
                error(deferred, ex);
            });
        return deferred.promise;
    }

    function logout() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        delete $sessionStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }

    function success(deferred, data, response) {
        if (response.data) {
            // store username and token in local storage to keep user logged in between page refreshes
            if (data.rememberMe) {
                $localStorage.currentUser = { token: response.data.id_token };
            } else {
                $sessionStorage.currentUser = { token: response.data.id_token };
            }

            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.id_token;
        }
        deferred.resolve(response.data);
    }

    function error(deferred, ex) {
        delete $localStorage.currentUser;
        delete $sessionStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
        if (ex.data === null) {
            toastr.error("Servidor off-line");
        } else if (ex.data.status === 401 || ex.data.status === 400) {
            toastr.error("Usuário ou senha inválidos!");
        } else if (ex.data.message === 'error.arrobaerror') {
            toastr.error("Informe o login sem o e-mail.");
        } else {
            toastr.error(ex.data.message);
        }
        deferred.reject();
    }

    return services;
}