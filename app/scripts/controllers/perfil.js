'use strict';

/**
 * @ngdoc function
 * @name app.controller:PerfilCtrl
 * @description
 * # PerfilCtrl
 * Controller of app
 */

angular.module('app')
    .controller('PerfilCtrl', perfilCtrl);

function perfilCtrl($scope, contaService, toastr) {
    $scope.mostrarCampos = false;
    $scope.localInstanceOnly = false;
    $scope.numeroImagem = 1;
    $scope.imageUrl = "../../images/avatares/1.png";

    contaService.obterDadosUsuarioLogado().then(function(usuario) {
        $scope.usuario = usuario;
        if ($scope.usuario.imageUrl !== null) {
            $scope.numeroImagem = parseInt($scope.usuario.imageUrl.replace(/[^\d]/g, ""));
            $scope.imageUrl = $scope.usuario.imageUrl;
        }

        if (usuario.uuidEmpresa !== "5cab940d-1578-49ca-9675-6e1843744e21") {
            $scope.localInstanceOnly = true;
        }
    });

    $scope.editarPerfil = function() {
        $scope.mostrarCampos = true;
        if ($scope.usuario.imageUrl !== null && $scope.usuario.imageUrl !== "") {
            $scope.imageUrl = $scope.usuario.imageUrl;
        }
    }


    $scope.cancelarAlteracao = function() {
        contaService.obterDadosUsuarioLogado().then(function(usuario) {
            $scope.usuario = usuario;
            if ($scope.usuario.imageUrl !== null && $scope.usuario.imageUrl !== "" ) {
                $scope.numeroImagem = parseInt($scope.usuario.imageUrl.replace(/[^\d]/g, ""));
                $scope.imageUrl = $scope.usuario.imageUrl;
            }
        });
        $scope.mostrarCampos = false;
    }

    $scope.salvarAlteracao = function(usuario) {
        if (usuario.firstName == null || usuario.firstName == '') {
            toastr.error('Na traveeee, assim não dá né!! Add seu nome ai champs.');
            return;
        }
        usuario.imageUrl = $scope.imageUrl;
        contaService.salvarAlteracaoDadosUsuario(usuario).then(function() {
            toastr.success('Seus dados foram alterados com sucesso champs...', 'Goal!!!');
            $scope.mostrarCampos = false;
        });
    }

    $scope.salvarAlteracaoNovaSenha = function(newPassword, confirmNewPassword) {
        if (newPassword !== confirmNewPassword) {
            toastr.error('Na traveeee, as senhas não batem.');
            return;
        }
        if (newPassword == undefined || newPassword == null || newPassword == "") {
            toastr.error('Na traveeee, é necessário preencher o campo nova senha');
            return;
        }
    }

    $scope.selecionarImagem = function(numeroImagem) {
        $scope.numeroImagem = numeroImagem;
        $scope.imageUrl = "../../images/avatares/{0}.png".replace("{0}", numeroImagem);
    }
};