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

function homeCtrl($scope, $q, $timeout, $uibModal, rankingService, contaService) {

    $scope.$on('wizard:stepChanged',function(event, args) {
        console.log(args);
    });

    $scope.enterValidation = function(){
        return true;
    };
    
    $scope.exitValidation = function(){
        return true;
    };
    //example using context object
    $scope.exitValidation = function(context){
        return context.firstName === "Jacob";
    }
    //example using promises
    $scope.exitValidation = function(){
        var d = $q.defer()
        $timeout(function(){
            return d.resolve(true);
        }, 2000);
        return d.promise;
    }













    // function nomeCompleto(primerioNome, ultimoNome) {
    //     if (primerioNome === null || primerioNome === "") {
    //         return "Sem nome";
    //     }
    //     if (ultimoNome === null || ultimoNome === "") {
    //         return primerioNome;
    //     }
    //     return primerioNome + " " + ultimoNome;
    // }

    // contaService.obterDadosUsuarioLogado().then(function(usuario) {
    //     var fname = usuario.firstName;
    //     var firstName = fname == null || fname == '' ? '' : usuario.firstName.split(" ");
    //     $scope.usuarioLogado = firstName[0];

    //     rankingService.obterRankingGeral(usuario.uuidEmpresa).then(function(rankingGeral) {
    //         $scope.rankingGeral = _.map(rankingGeral.rankings, function(ranking) {
    //             return {
    //                 "posicao": ranking.posicao + "°",
    //                 "variacaoPosicao": ranking.variacaoPosicao || 0,
    //                 "nome": nomeCompleto(ranking.userDTO.firstName, ranking.userDTO.lastName),
    //                 "quantidadeAcertos": ranking.quantidadeAcertos,
    //                 "quantidadeAcertosExatos": ranking.quantidadeAcertosExatos,
    //                 "quantidadeErros": ranking.quantidadeErros,
    //                 "pontos": ranking.pontos,
    //                 "imageUrl": ranking.userDTO.imageUrl
    //             };
    //         });

    //         if ($scope.rankingGeral === null) {
    //             $scope.mostraMelhoresDoRank = false;
    //         } else {
    //             $scope.mostraMelhoresDoRank = true;
    //             $scope.primeiroDoRankingGeral = $scope.rankingGeral[0].nome;
    //         }
    //         $scope.ultimoProcessamento = 
    //         (rankingGeral.dataHoraProcessamento ? rankingGeral.dataHoraProcessamento : '-');

    //     });

    //     rankingService.obterRankingRodada(usuario.uuidEmpresa).then(function(rankingRodada) {
    //         $scope.rankingRodada = _.map(rankingRodada.rankings, function(ranking) {
    //             return {
    //                 "posicao": ranking.posicao + "°",
    //                 "variacaoPosicao": ranking.variacaoPosicao || 0,
    //                 "nome": nomeCompleto(ranking.userDTO.firstName, ranking.userDTO.lastName),
    //                 "quantidadeAcertos": ranking.quantidadeAcertos,
    //                 "quantidadeAcertosExatos": ranking.quantidadeAcertosExatos,
    //                 "quantidadeErros": ranking.quantidadeErros,
    //                 "pontos": ranking.pontos,
    //                 "imageUrl": ranking.userDTO.imageUrl
    //             };
    //         });

    //         $scope.primeiroDoRankingDaRodada = $scope.rankingRodada[0].nome;
    //     });

    // });

    // $scope.mostrarRegulamento = function() {
    //     $uibModal.open({
    //         animation: true,
    //         templateUrl: "views/modalregulamento.html",
    //         size: "lg",
    //         controller: function($scope, $uibModalInstance) {
    //             $scope.titulo = "Regulamento";
    //             $scope.descricaoRegulamento = " 1 - Apostas e alterações de apostas são permitidas em até 2 horas antes do jogo. " +
    //                 " 2 - Não é permitido a mudança ou envio de novas apostas para jogos finalizados. " +
    //                 " 3 - São computados 3 pontos para resultados exatos e 1 ponto para acertos parciais." +
    //                 " 4 - Após informado o resultado, o ranking será processado a cada cinco minutos." +
    //                 " 5 - Não há no sistema, qualquer menu administrativo para mudança de apostas, portanto, após encerradas as apostas, " +
    //                 "a mesma não pode ser alterada nem mesmo pelos administradores. ";

    //             $scope.fecharRegulamento = function() {
    //                 $uibModalInstance.close();
    //             }
    //         }
    //     });
    // }

    
    // $scope.obterRanking = function(tiporanking) {
    //     if (tiporanking === "1") {
    //         $scope.mostrarRankingRodada = false;
    //         $scope.mostrarRankingGeral = true;
    //     } else {
    //         $scope.mostrarRankingRodada = true;
    //         $scope.mostrarRankingGeral = false;
    //     }
    // };
}