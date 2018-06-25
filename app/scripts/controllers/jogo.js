'use strict';

/**
 * @ngdoc function
 * @name app.controller:JogoCtrl
 * @description
 * # JogoCtrl
 * Controller of app
 */

angular.module('app')
    .controller('JogoCtrl', jogoCtrl)
    .filter('makeScorePlural', function () {
        return function (score) {
            var result = score > 1 ? " Pontos" : " Ponto";
            return score + result;
        }
    })
    .directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');
                        if (transformedInput.length > 1 && transformedInput[0] === "0") {
                            ngModelCtrl.$setViewValue(transformedInput.substring(1));
                            ngModelCtrl.$render();
                            return transformedInput;
                        }
                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                            return transformedInput;
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    });

function jogoCtrl($scope, $uibModal, toastr, jogoService) {

    function obterResultadoOficial(jogo) {
        if (jogo.resultadoCasa === null || jogo.resultadoVisitante === null) {
            return "";
        }
        return "{0} {1} X {2} {3}"
            .replace("{0}", jogo.timeCasa.nome)
            .replace("{1}", jogo.resultadoCasa)
            .replace("{2}", jogo.resultadoVisitante)
            .replace("{3}", jogo.timeVisitante.nome)
    }

    function obterLayoutResultado(jogo) {
        switch (jogo.palpiteDTO.statusPalpite) {
            case "NAO_PALPITADO":
                return {
                    "classe": "unpointed",
                    "frase": "Putz, esqueceu de palpitar! Todo dia um 7x1 diferente",
                    "pontuacao": jogo.palpiteDTO.pontuacao
                };
            case "ERROU":
                return {
                    "classe": "unpointed",
                    "frase": "Deu ruim, pai. Bora acertar na próxíma!",
                    "pontuacao": jogo.palpiteDTO.pontuacao
                };
            case "ACERTO_PARCIAL":
                return {
                    "classe": "partial-score",
                    "frase": "Quase, parça! Acertou só o resultado :/",
                    "pontuacao": jogo.palpiteDTO.pontuacao
                };
            case "ACERTO_EXATO":
                return {
                    "classe": "total-score",
                    "frase": "É toiss! Acertou o placar exato!",
                    "pontuacao": jogo.palpiteDTO.pontuacao
                };
        }
    }

    function preencheCaracteristicas(time) {
        return [{
            "nome": "Ranking FIFA",
            "valor": time.caracteristicaTimeDTO.rankingFifa
        },
        {
            "nome": "Participações",
            "valor": time.caracteristicaTimeDTO.participacoesCopa
        },
        {
            "nome": "Titulos",
            "valor": time.caracteristicaTimeDTO.titulos
        },
        {
            "nome": "Craque",
            "valor": time.caracteristicaTimeDTO.craque
        },
        {
            "nome": "Última copa",
            "valor": time.caracteristicaTimeDTO.colocacaoUltimaCopa
        }
        ];
    }

    function obterDataTermino(jogo) {
        var data = new Date(jogo.horarioJogo);
        data.setHours(data.getHours() - 2);
        return data.getTime();
    }

    function oPalpiteEstaEncerrado(jogo) {
        var dataTermino = obterDataTermino(jogo);
        var dataAtual = new Date();
        return dataTermino <= dataAtual.getTime() && !jogo.jogoFinalizado;
    }

    function obterJogosPorRodada(rodadaId) {
        jogoService.obterJogosPorRodada(rodadaId).then(function (jogos) {
            var jogosOrdenados = _.sortBy(jogos, function (jogo) {
                return new Date(jogo.horarioJogo).getTime();
            });
            $scope.jogos = _.map(jogosOrdenados, function (jogo) {
                var timeCasa = jogo.timeCasa;
                var timeVisitante = jogo.timeVisitante;
                return {
                    "jogoId": jogo.id,
                    "nomeLocal": "Rússia",
                    "dataJogo": jogo.horarioJogo,
                    "dataTermino": obterDataTermino(jogo),
                    "jogoFinalizado": jogo.jogoFinalizado,
                    "palpiteEncerrado": oPalpiteEstaEncerrado(jogo),
                    "resultadoOficial": obterResultadoOficial(jogo),
                    "layoutResultado": obterLayoutResultado(jogo),
                    "resumoPrevio": jogo.resumoPrevio,
                    "palpite": {
                        "id": jogo.palpiteDTO.id,
                        "palpiteCasa": jogo.palpiteDTO.palpiteCasa,
                        "palpiteVisitante": jogo.palpiteDTO.palpiteVisitante
                    },
                    "timeCasa": {
                        "nome": jogo.timeCasa.nome,
                        "urlIcon": jogo.timeCasa.urlIconFull,
                        "favorito": jogo.timeCasa.favoritoJogo,
                        "resumoPrevio": jogo.timeCasa.resumoPrevio,
                        "caracteristicas": preencheCaracteristicas(timeCasa)
                    },
                    "timeVisitante": {
                        "nome": jogo.timeVisitante.nome,
                        "urlIcon": jogo.timeVisitante.urlIconFull,
                        "favorito": jogo.timeVisitante.favoritoJogo,
                        "resumoPrevio": jogo.timeVisitante.resumoPrevio,
                        "caracteristicas": preencheCaracteristicas(timeVisitante)
                    }
                };
            });
            $scope.rodadaFechada = _.every($scope.jogos, function (jogo) {
                return jogo.jogoFinalizado;
            });
        }).catch(function () {
            $scope.jogos = [];
        });
    }

    jogoService.obterRodadas().then(function (rodadas) {
        $scope.rodadas = _.sortBy(rodadas, function (rodada) {
            return rodada.numero;
        });

        $scope.rodadaCorrente = _.find($scope.rodadas, function (rodada, indice) {
            if (rodada.current) {
                $scope.numeroRodada = indice;
                return true;
            }
            return false;
        });
        $scope.rodadaAtiva = $scope.rodadaCorrente;
        obterJogosPorRodada($scope.rodadaCorrente.id);
    });

    $scope.selenarRodada = function (numeroRodada) {
        $scope.rodadaCorrente = $scope.rodadas[numeroRodada];
        $scope.numeroRodada = numeroRodada;
        $scope.rodadaAtiva = $scope.rodadaCorrente.current;
        obterJogosPorRodada($scope.rodadaCorrente.id);
    }

    $scope.incluirPalpite = function (form, jogo) {
        form.$setSubmitted();
        var palpite = {
            "jogoId": jogo.jogoId,
            "palpiteCasa": jogo.palpite.palpiteCasa,
            "palpiteVisitante": jogo.palpite.palpiteVisitante
        };
        if (!form.$invalid) {
            jogoService.incluirPalpite(palpite).then(function (retorno) {
                toastr.success('Agora é só torcer', 'Palpite incluido com sucesso!');
                jogo.palpite.id = retorno.id;
            });
        }
    }

    $scope.mudarPalpite = function (form, jogo) {
        form.$setSubmitted();
        var palpite = {
            "id": jogo.palpite.id,
            "jogoId": jogo.jogoId,
            "palpiteCasa": jogo.palpite.palpiteCasa,
            "palpiteVisitante": jogo.palpite.palpiteVisitante
        };
        if (!form.$invalid) {
            jogoService.mudarPalpite(palpite).then(function (retorno) {
                toastr.success('Continua na torcida ai', 'Palpite alterado com sucesso!');
            });
        }
    }

    $scope.mostrarDicaDoMascote = function (texto) {
        $uibModal.open({
            animation: true,
            templateUrl: "views/modaldicasdomascote.html",
            size: "lg",
            resolve: {
                textoDicaDoMascote: function () {
                    return texto
                }
            },
            controller: function ($scope, $uibModalInstance) {
                //Narrador Boenno = 1
                //Técnico Palestrinha = 2
                //Comentarista Pistola = 3

                var saudacao = "";
                var urlPath = "";
                var infoDoEspecialista = "";

                var randomNumber = Math.floor((Math.random() * 3) + 1);

                switch (randomNumber) {
                    case 1:
                        saudacao = "Beeem amigos do bolão, me chamo NarRRRrador Boenno...";
                        urlPath = "/images/avataresDicas/narrador-boeno.png";
                        infoDoEspecialista = "Confira aqui as dicas do maioRRRRR especialista em mundiais para você realizar " +
                            "uma boa aposta, olha gol olha, olha o gol, olha o gol, e ter maiores chances de ser o campeão.";
                        break;
                    case 2:
                        saudacao = "Fala muito, fala muito, aqui é o Técnico Palestrinha...";
                        urlPath = "/images/avataresDicas/tecnico-palestrinha.png";
                        infoDoEspecialista = "Não tenho condição de prometer a conquista da Copa do Mundo, mas posso te " +
                            "ajudar a conquistar esse bolão. O processo que é IM POR TAN TE, não fale muito, aja com naturalidade e veja minha dica e veremos se tem ME RE CI MEN TO.";
                        break;
                    case 3:
                        saudacao = "VOCES TÃO DE BRINCADEIRA, aqui é o Comentarista Pistola...";
                        urlPath = "/images/avataresDicas/comentarista-pistola.png";
                        infoDoEspecialista = "Seus zoreiudos, seis querem pÃÃAAOO, pãão de fooooorma??? Mas eu vou é daRR dicas... e não é brincadeira, oreiudo!";
                        break;
                    default:
                }

                $scope.modalRandom = {
                    "titulo": "Dicas do Especialista",
                    "descricaoRegulamento": $scope.$resolve.textoDicaDoMascote,
                    "saudacao": saudacao,
                    "urlPath": urlPath,
                    "infoDoEspecialista": infoDoEspecialista
                }

                $scope.fecharRegulamento = function () {
                    $uibModalInstance.close();
                }
            }
        });
    }

    $scope.$on('timer-stopped', function () {
        var jogoComPalpiteEncerrado = _.find($scope.jogos, function (jogo) {
            var dataAtual = new Date();
            return jogo.dataTermino <= dataAtual.getTime() && !jogo.jogoFinalizado;
        });
        if (jogoComPalpiteEncerrado) {
            jogoComPalpiteEncerrado.palpiteEncerrado = true;
        }
    });
}