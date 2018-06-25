'use strict';

/**
 * @ngdoc function
 * @name app.controller:HistoricoCtrl
 * @description
 * # HistoricoCtrl
 * Controller of app
 */

angular.module('app')
    .controller('HistoricoCtrl', historicoCtrl)
    .filter('makeScorePlural', function() {
        return function(score) {
            var result = score > 1 ? " Pontos" : " Ponto";
            return score + result;
        }
    });

function historicoCtrl($scope, jogoService) {
    var historicos = [];
    $scope.paisSelecionado = { "nome": "Selecione" };

    function formatoVersus(timeCasa, timeVisitante) {
        if (timeCasa.pontos === null || timeVisitante.pontos === null) {
            return "Não informado";
        }
        var versus = "{0} {1} X {2} {3}";
        return versus.replace("{0}", timeCasa.nome)
            .replace("{1}", timeCasa.pontos)
            .replace("{2}", timeVisitante.pontos)
            .replace("{3}", timeVisitante.nome);
    };

    function obterClasse(palpiteDTO) {
        switch (palpiteDTO.statusPalpite) {
            case "NAO_PALPITADO":
            case "ERROU":
                return "unpointed";
            case "ACERTO_PARCIAL":
                return "partial-score";
            case "ACERTO_EXATO":
                return "total-score";
        }
    }

    function obterJogosPorRodada(rodada) {
        jogoService.obterJogosPorRodada(rodada.id).then(function(jogos) {
            $scope.paises = [];
            historicos = _.map(jogos, function(jogo) {
                $scope.paises.push({ "nome": jogo.timeCasa.nome });
                $scope.paises.push({ "nome": jogo.timeVisitante.nome });
                return {
                    "nomeTimeCasa": jogo.timeCasa.nome,
                    "nomeTimeVisitante": jogo.timeVisitante.nome,
                    "rodada": rodada.numero,
                    "data": jogo.horarioJogo,
                    "palpite": formatoVersus({
                        "nome": jogo.timeCasa.nome,
                        "pontos": jogo.palpiteDTO.palpiteCasa
                    }, {
                        "nome": jogo.timeVisitante.nome,
                        "pontos": jogo.palpiteDTO.palpiteVisitante
                    }),
                    "resultado": formatoVersus({
                        "nome": jogo.timeCasa.nome,
                        "pontos": jogo.resultadoCasa
                    }, {
                        "nome": jogo.timeVisitante.nome,
                        "pontos": jogo.resultadoVisitante
                    }),
                    "pontuacaoLayout": {
                        "pontuacao": jogo.palpiteDTO.pontuacao,
                        "classe": obterClasse(jogo.palpiteDTO)
                    }
                };
            });
            $scope.historicos = historicos;
            $scope.paises = _.sortBy($scope.paises, function(pais) {
                return pais.nome;
            });
            $scope.paises.unshift({ "nome": "Selecione" });
            $scope.paisSelecionado = { "nome": "Selecione" };
        });
    };

    jogoService.obterRodadas().then(function(rodadas) {
        $scope.rodadas = _.sortBy(rodadas, function(rodada) {
            return rodada.numero;
        });
        $scope.rodadaSelecionada = $scope.rodadas[0];
        obterJogosPorRodada($scope.rodadas[0]);
    });

    $scope.filtrar = function(pais) {
        if (pais !== "Selecione") {
            $scope.historicos = _.filter(historicos, function(historico) {
                return historico.nomeTimeVisitante === pais ||
                    historico.nomeTimeCasa === pais;
            });
        } else {
            $scope.historicos = historicos;
        }
    }

    $scope.obterJogosPorRodada = obterJogosPorRodada;
}