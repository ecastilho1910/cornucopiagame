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
   
    var wizardInit = true;
    $scope.$on('wizard:stepChanged', function(event, data) {
       
        //step shoose deck cards
        if(data.index === 3){           
           var filtered = _.where($scope.deckCards, {ticked: true});
           if(filtered.length === 0){
                toastr.error('Please, choose one card of deck.');     
                return false;
           }
        } 

        if (wizardInit) {
            wizardInit = false;
            setTimeout(function() {
                WizardHandler.wizard().goTo(0);
                $scope.$apply();
            });
        }
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
        var d = $q.defer();
        $timeout(function(){
            return d.resolve(true);
        }, 1000);
        return d.promise;
    }


    $scope.deckCards = [
        {	icon: "<i class='fa fa-lg fa-code' style='color: #7a747b;'></i>",  maker: "Data validation and encoding",	ticked: false	},
        {	icon: "<i class='fa fa-lg fa-user-secret' style='color: #5f8ea0;'></i>", maker: "Authentication",	ticked: false	},
        {	icon: "<i class='fa fa-lg fa-cogs' style='color: #5b906e;'></i>", maker: "Session management",	ticked: false	},
        {	icon: "<i class='fa fa-lg fa-user-times' style='color: #b59b6c;'></i>",	maker: "Authorization",	ticked: false	},
        {	icon: "<i class='fa fa-lg fa-unlock-alt' style='color: #895091;'></i>",	maker: "Cryptography",	ticked: false	}
   ];













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