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
    .filter('makePositive', function () {
        return function (num) { return Math.abs(num); }
    })
    .filter('makeScorePlural', function () {
        return function (score) {
            var result = score > 1 ? " Pontos" : " Ponto";
            return score + result;
        }
    });

function homeCtrl($rootScope, $scope, $q, $timeout, $uibModal, contaService, WizardHandler, toastr) {

    $rootScope.deckSuits =
        {
            "dadavalidation": [
                {
                    "id": 101,
                    "cardgroup": "dadavalidation",
                    "card": "A",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Você inventou um novo ataque contra a Validação de Dados de Entrada e"
                        + " Codificação de Dados de Saída.",
                        "example": "EX: Binladem consegue interceptar uma requisição e ....",
                        "explain": "Invente um ataque relacionado a validacão de dados",
                        "teamfeedback": null
                },
                {
                    "id": 102,
                    "cardgroup": "dadavalidation",
                    "card": "2",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Brian consegue reunir o básico de informações sobre a utilização e "
                        + "configuração de base de dados, lógica, codificação, além da utilização de softwares, "
                        + "serviços e infraestrutura nas mensagens de erro ou em mensagens de configuração, "
                        + "ou na presença de arquivos de instalação (padrões ou antigos), ou em evidências "
                        + "de testes, ou em backups ou em exposição de código fonte.",
                        "example": "EX: - Expor informações sensíveis nos headers HTTP, URLs, mensagens de erro customizadas, comentários, logs, etc;",
                        "explain": "Diversos webservers normalmente possuem mensagens de erro com informações sobre a natureza do erro. Isso é bastante útil ao desenvolvedor para compreender aonde está o erro e o porquê do mesmo. A configuração padrão também, em algumas vezes, possui funções de administrador para facilitar a curva de aprendizagem. Entretanto, se este padrão de comportamentos não for alterado em um ambiente fora do desenvolvimento, hackers podem se beneficiar do conhecimento sobre o funcionamento interno da aplicação.",
                        "teamfeedback": null
                },
                {
                    "id": 103,
                    "cardgroup": "dadavalidation",
                    "card": "3",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Robert consegue inserir dados maliciosos"
                        + "pois o formato de protocolo não foi"
                        + "checado, ou duplicações são aceitas, ou a "
                        + "estrutura não está sendo verificada, ou os "
                        + "dados individuais não foram validados por "
                        + "formato, tipo, intervalo, tamanho e por uma "
                        + "lista de caracteres ou formatos possíveis",
                    "example": "EX: os dados que chegam na camada de serviço é o que o model esta esperando, campo numerico no front enviando letras e o model não faz essa validação e acaba só quebrando no banco?",
                    "explain": "A falta de validação de dados de entrada é muitas vezes a causa raiz de vários problemas de segurança. A validação precisa ser aplicada, o desenvolvedor necessita compreender como os dados são compostos/formados. A validação de dados deve garantir que: - A aplicação é alimentada apenas com os dados de entrada permitidos; - Todos os dados de entrada obrigatórios são fornecidos; - O valores associados com o nome do campo/parâmetro são do tipo, formato, alcance, tamanho, etc, esperado.",
                    "teamfeedback": null
                },
                {
                    "id": 104,
                    "cardgroup": "dadavalidation",
                    "card": "4",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Dave consegue inserir nomes ou dados de "
                        + "campos mal intencionados porque isto não "
                        + "está sendo verificado no contexto de cada "
                        + "usuário e processo.",
                    "example": "EX: um usuario acessar previlegios de outro usuario.",
                    "explain": "Dados maliciosos podem ser introduzidos voluntariamente. Alguns verificadores de dados de entrada devem depender dos previlegios de cada usuario. - Falsificar tipos de resquests, URLs, cookies, identificadores de sessão, campos ou valores que não validados; - Adicionando , removendo ou duplicando campos da requisição ou valores para explorar o comportamento do código;",
                    "teamfeedback": null
                },
                {
                    "id": 105,
                    "cardgroup": "dadavalidation",
                    "card": "5",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Jee consegue ignorar as rotinas "
                        + "centralizadas de codificação de saída "
                        + "pois elas não estão sendo usadas em "
                        + "todos os lugares, ou a codificação "
                        + "errada está sendo usada.",
                    "example": "EX: ????????",
                    "explain": "Rotinas centralizadas de dados de saída são uma boa prática de programação, mas ainda desenvolvedores precisam entender como elas funcionam, como utilizá-las e quaisquer limitações existentes. A codificação dos dados de saída são obrigatórias ao manusear dados de fontes não confiáveis. Também deve ser uma verificação obrigatória de segurança quando os dados estiverem saindo para queries para SQL, XML e LDAP e em todo caso quando caracteres especiais arriscados devem ser permitidos como dados de entrada (como < > ' % ( ) + \ \ ' \). ",
                    "teamfeedback": null
                },
                {
                    "id": 106,
                    "cardgroup": "dadavalidation",
                    "card": "6",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Jason consegue ignorar as rotinas "
                        + "centralizadas de validação de dados de "
                        + "entrada pois elas não estão sendo usadas "
                        + "em todos os campos de entrada de dados. ",
                    "example": "EX: ??????????",
                    "explain": "Rotinas centralizadas de dados de entrada são uma boa prática de programação. É recomendado sempre que possível utilizar uma lista branca de validação. As listas pretas (blacklists) geralemente são boas para serem utilizadas como complemento, pois podem gerar falsos positivos. Ataques comuns de más implementações de rotinas de validação são buffer overflows, injeção de código e fuzzing.",
                    "teamfeedback": null
                },
                {
                    "id": 107,
                    "cardgroup": "dadavalidation",
                    "card": "7",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Jan consegue carregar/enviar informações"
                        + "especiais visando evitar validações de "
                        + "campos porque o conjunto de caracteres "
                        + "não é especificado e aplicado, ou o dado de "
                        + "entrada é codificado diversas vezes, ou o "
                        + "dado não é totalmente convertido no "
                        + "mesmo formado que a aplicação usa (ex: "
                        + "canonicalização) antes da validação, ou as "
                        + "variáveis não são fortemente tipadas.",
                    "example": "EX: ?????????????",
                    "explain": "Sem o conhecimento preciso de codificação de caracteres as rotinas de validação de dados podem ser inadequadas. Os interpretadores podem cada um ser suscetíveis em difirentes formas, à problemas relacionados com a codificação de caracteres perigosos. Técnicas comuns incluem: - Especificação de um conjunto definido de caracteres, como UTF-8, para todas as entradas de dados; - Canonicalização, o que nada mais é do que a codificação de dados para um conjunto comum de caracteres, definidos antes da validação; - Utilizar os componentes do sistema que suportam a expansão de conjuntos de caracteres UTF-8 e validar os dados após a decodificação UTF-8 for concluída.",
                    "teamfeedback": null
                },
                {
                    "id": 108,
                    "cardgroup": "dadavalidation",
                    "card": "8",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Sarah consegue ignorar as rotinas "
                        + "centralizadas de tratamento "
                        + "(sanitização) pois elas não estão sendo "
                        + "usadas de forma abrangente.",
                    "example": "EX: ????????????",
                    "explain": "A sanitização pode ser usada para retirar alguns caracteres não desejáveis de dados de entrada ou sáida. Se a sanitização é parte do processo de validação e codificação, deve ser garantido que nenhum dado de entrada ou saída seja excluído, ou que isso possa ser contornado através da submissão por meio de um diferente canal (ex.GET ao invés de POST) ou plataforma diferente (ex. mobile X desktop).",
                    "teamfeedback": null
                },
                {
                    "id": 109,
                    "cardgroup": "dadavalidation",
                    "card": "9",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Shamun consegue ignorar as verificações de validação de entrada ou de saída porque as falhas de validação não são rejeitadas e/ou tratadas (sanitização).",
                    "example": "EX: ????????????",
                    "explain": "Falhas na validação de dados de entrada sempre devem resultar na rejeição destes. É bastante útil registrar, associando com a identidade do usuário se possível for, e ressaltar estes como possíveis atividades maliciosas para uma análise mais aprofundada, ou como insumo para aplicações de detecção de invasão.",
                    "teamfeedback": null
                },
                {
                    "id": 110,
                    "cardgroup": "dadavalidation",
                    "card": "10",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Dario consegue explorar a confiabilidade da aplicação em fonte de dados (ex: dados definidos pelo usuário, manipulação de dados armazenados localmente, mudança do estado dos dados em dispositivos clientes, falta de verificação da identidade durante uma validação de dados, como Dario pode fingir ser Colin).",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "Gestão de confiança é uma técnica popular para implementar segurança da informação, e especificamente para políticas de controle de acesso. Onde todos dados oriundos de uma aplicação são classificados em grupos com vários níveis de confiança. Ao aplicar a gestão é imperativo garantir que as fontes confiáveis não podem ser falsificadas/enganadas. O golpe pode ser realizado em diferentes formas (por exemplo reflection attack, principal spoof, JSON Hijacking, Registry Poisoning, MITM, XSS). Atacantes que estão identificados como usuários confiáveis ou que estão em uma zona de confiança, onde esta zona possui técnicas de autenticação ruins, podem realizar os mais variados ataques, dependendo de acordo com os serviços (por exemplo Sniffing, Data tempering, Code injection, DoS).",
                    "teamfeedback": null
                },
                {
                    "id": 111,
                    "cardgroup": "dadavalidation",
                    "card": "J",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Dennis tem o controle sobre validações de entrada de dados, validações de saída de dados ou codificação de saída ou rotinas que ele consegue ignorar/burlar.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "A validação e codificação é algumas vezes realizada em aplicações no cliente ou fontes externas que interagem com o sistema. Esta é uma prática ruim, como as fontes externas são usualmente mais vulneráveis à ataques, elas podem ser enganadas e geralmente são menos responsabilizadas por um comportamento malicioso. De uma forma geral, todas as rotinas de validação e codificação devem ser realizadas no lado do servidor utilizando rotinas robustas, testadas e protegidas.",
                    "teamfeedback": null
                },
                {
                    "id": 112,
                    "cardgroup": "dadavalidation",
                    "card": "Q",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Geoff consegue injetar dados num dispositivo ou num interpretador no lado do cliente porque uma interface parametrizada não foi usada, ou não foi implementada corretamente, ou os dados não foram codificados corretamente para o contexto proposto, ou não há uma política restritiva para a codificação ou a inclusão de dados.",
                    "example": "EX: COMPO TEXTAREA ENVIANDO TAG HTML.???????",
                    "explain": "Devido a falhas na verificação, codificação ou sanitização da entrada ou saída de dados no lado do cliente, códigos maliciosos podem ser injetador e tratados como código ao invés de dados, levando à execução de código na aplicação do cliente.",
                    "teamfeedback": null
                },
                {
                    "id": 113,
                    "cardgroup": "dadavalidation",
                    "card": "K",
                    "name": "Validação de dados de entrada e codificação de dados de saída.",
                    "description": "Gabe consegue injetar dados num interpretador no lado do servidor (ex: SQL, comandos para o sistema operacional, Xpath, Server JavaScript, SMTP) porque uma interface parametrizada não foi usada ou não foi implementada corretamente.",
                    "example": "EX: SQL INJECTION",
                    "explain": "Devido a falhas na verificação, codificação ou sanitização da entrada ou saída de dados no lado do servidor, códigos maliciosos podem ser injetador e tratados como código ao invés de dados, levando à execução de código na aplicação do servidor.",
                    "teamfeedback": null
                }
            ],
            "authentication": [
                {
                    "id": 201,
                    "cardgroup": "authentication",
                    "card": "A",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Você inventou um novo ataque contra a Autenticação e Gerenciamento de Credenciais.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 202,
                    "cardgroup": "authentication",
                    "card": "2",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "James pode assumir as funções de autenticação sem que o usuário real esteja ciente do uso destas funções (ex: tente fazer login, logar com credenciais, redefinir a senha)",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 203,
                    "cardgroup": "authentication",
                    "card": "3",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Muhammad consegue obter a senha de um usuário ou outros dados, pela observação durante a autenticação, ou cache local, ou pela memória, ou pelo tráfego de dados, ou pela leitura de algum local desprotegido, ou porque isto é amplamente conhecido, ou porque não há expiração de dados, ou por que o usuário não consegue trocar sua própria senha.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 204,
                    "cardgroup": "authentication",
                    "card": "4",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Sebastien pode identificar facilmente nomes de usuários ou consegue elencar quem eles são.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 205,
                    "cardgroup": "authentication",
                    "card": "5",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Javier pode usar credenciais padrões (default), de teste ou facilmente adivinhadas para autenticação, ou consegue autenticar através de contas inativas ou autentica-se por contas não necessariamente da aplicação.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 206,
                    "cardgroup": "authentication",
                    "card": "6",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Sven consegue reutilizar uma senha temporária porque o usuário não precisa troca-la no primeiro acesso, ou o tempo de expiração é muito longo, ou o tempo de expiração não existe, ou não é usado um método de entrega out-of-band (ex: aplicação mobile, SMS).",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 207,
                    "cardgroup": "authentication",
                    "card": "7",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Cecilia consegue usar força bruta e ataques de dicionário (dictionary attacks) contra uma ou muitas contas sem limitação, ou estes ataques são simplificados pois as senhas tem baixa complexidade, tamanho reduzido, inexistência de expiração e regras para reuso.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 208,
                    "cardgroup": "authentication",
                    "card": "8",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Kate consegue ignorar a autenticação porque isto não é uma falha de segurança (ex: o acesso sem autenticação está assinalado como padrão).",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 209,
                    "cardgroup": "authentication",
                    "card": "9",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Claudia consegue assumir funções críticas porque os requisitos de autenticação são muito fracos (ex: não é usado autenticação com força de senha), ou não é um requisito revalidar a autenticação com frequência.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 210,
                    "cardgroup": "authentication",
                    "card": "10",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Pravin consegue ignorar controle de autenticação porque não está sendo usado um módulo/framework/serviço de autenticação que seja centralizado, testado, comprovado e aprovado para gerir requisições.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 211,
                    "cardgroup": "authentication",
                    "card": "J",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Mark consegue acessar recursos ou serviços porque não há requisitos de autenticação, ou, por engano, um outro sistema ou outra ação realizou autenticação.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 212,
                    "cardgroup": "authentication",
                    "card": "Q",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Jaime consegue ignorar a autenticação porque não é aplicado o mesmo rigor para todas as funções de autenticação (ex: logar, troca de senha, recuperação de senha, logout, acesso administrador) ou não é aplicado o mesmo rigor nos diversos locais de acesso e versões do sistema(ex:mobile website, mobile app, full website, API, call center).",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 213,
                    "cardgroup": "authentication",
                    "card": "K",
                    "name": "Autenticação e Gerenciamento de Credenciais",
                    "description": "Olga consegue influenciar ou alterar o código ou a rotina de autenticação e com isto ignorar a autenticação.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                }
            ],
            "sessionmanagement": [
                {
                    "id": 301,
                    "cardgroup": "sessionmanagement",
                    "card": "A",
                    "name": "Gerenciamento de Sessões",
                    "description": "DESCRIDOASIPITONASDASD",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 302,
                    "cardgroup": "sessionmanagement",
                    "card": "2",
                    "name": "Gerenciamento de Sessões",
                    "description": "William tem o controle sobre a geração de identificadores de sessão.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 303,
                    "cardgroup": "sessionmanagement",
                    "card": "3",
                    "name": "Gerenciamento de Sessões",
                    "description": "Ryan consegue usar uma única conta em paralelo, pois as sessões simultâneas são permitidas.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 304,
                    "cardgroup": "sessionmanagement",
                    "card": "4",
                    "name": "Gerenciamento de Sessões",
                    "description": "Alison consegue configurar identificadores de cookies em outras aplicações web porque o domínio ou o caminho não são suficientemente limitados.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 305,
                    "cardgroup": "sessionmanagement",
                    "card": "5",
                    "name": "Gerenciamento de Sessões",
                    "description": "John consegue prever ou adivinhar identificadores de sessão porque estes não são alterados quando uma regra de usuário é alterada (ex: antes e depois da autenticação) e quando uma troca entre meios de comunicação criptografados e não criptografados acontece, ou os identificadores são curtos e não randômicos, ou não são modificados periodicamente.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 306,
                    "cardgroup": "sessionmanagement",
                    "card": "6",
                    "name": "Gerenciamento de Sessões",
                    "description": "Gary consegue ter o controle da sessão de um usuário porque o tempo de encerramento(timeout) da sessão é longo ou inexiste, ou o tempo limite da sessão é longo ou inexiste, ou a mesma sessão pode ser usada para mais de um dispositivo/local.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 307,
                    "cardgroup": "sessionmanagement",
                    "card": "7",
                    "name": "Gerenciamento de Sessões",
                    "description": "Casey consegue utilizar a sessão de Adam depois dele ter finalizado o uso da aplicação, porque a função de logout inexiste, ou Adam não fez logout, ou a função de logout não termina a sessão de forma adequada.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 308,
                    "cardgroup": "sessionmanagement",
                    "card": "8",
                    "name": "Gerenciamento de Sessões",
                    "description": "Matt consegue utilizar longas sessões porque a aplicação não solicita uma nova autenticação de forma periódica para validar se os privilégios do usuário foram alterados.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 309,
                    "cardgroup": "sessionmanagement",
                    "card": "9",
                    "name": "Gerenciamento de Sessões",
                    "description": "Ivan consegue roubar identificadores de sessão porque estes são transmitidos em canais inseguros, ou estão logados, ou são exibidos em mensagens de erros, ou estão em URLs, ou são acessíveis pelo código que o atacante consegue alterar ou influenciar.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 310,
                    "cardgroup": "sessionmanagement",
                    "card": "10",
                    "name": "Gerenciamento de Sessões",
                    "description": "Marce consegue inventar requisições porque tokens randômicos e fortes (ou seja, tokens anti-CSRF) ou similares não estão sendo usados para ações que mudam estado. Estas requisições podem ser por sessão ou por requisição (request) em ações mais críticas.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 311,
                    "cardgroup": "sessionmanagement",
                    "card": "J",
                    "name": "Gerenciamento de Sessões",
                    "description": "Jeff consegue reenviar uma interação de repetição idêntica (ex: requisição HTTP, sinal, botão pressionado) e ela é aceita, sem rejeição.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 312,
                    "cardgroup": "sessionmanagement",
                    "card": "Q",
                    "name": "Gerenciamento de Sessões",
                    "description": "Salim consegue ignorar o gerenciamento de sessão porque este não é aplicado de forma abrangente e consistente por toda a aplicação.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 313,
                    "cardgroup": "sessionmanagement",
                    "card": "K",
                    "name": "Gerenciamento de Sessões",
                    "description": "Peter consegue ignorar o controle de gerenciamento de sessão porque este foi autoconstruído e/ou é fraco, ao invés de ter sido usado a estrutura padrão de um framework ou um modulo testado e aprovado.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                }
            ],
            "authorization": [
                {
                    "id": 401,
                    "cardgroup": "authorization",
                    "card": "A",
                    "name": "Controle de Acesso",
                    "description": "Você inventou um novo ataque contra Controle de Acessos.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 402,
                    "cardgroup": "authorization",
                    "card": "2",
                    "name": "Controle de Acesso",
                    "description": "Tim consegue alterar nomes/endereços (paths) onde os dados são enviados ou encaminhados para alguém.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 403,
                    "cardgroup": "authorization",
                    "card": "3",
                    "name": "Controle de Acesso",
                    "description": "Christian consegue acessar informações, que ele não deveria ter permissão, por meio de outro mecanismo que tenha permissão (ex: indexador de pesquisa, log, relatórios) ou porque a informação está armazenada em cache, ou mantida por mais tempo do que o necessário, ou outra vazamento de informação.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 404,
                    "cardgroup": "authorization",
                    "card": "4",
                    "name": "Controle de Acesso",
                    "description": "Kelly consegue ignorar controles de acesso porque estes não falham seguramente (ex: a permissão de acesso está assinalada como padrão).",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 405,
                    "cardgroup": "authorization",
                    "card": "5",
                    "name": "Controle de Acesso",
                    "description": "Chad consegue acessar recursos que não deveria ter acesso devido a inexistência de uma autorização ou por concessão de privilégios excessivos (ex: não usar o princípio de menor privilégio possível). Os recursos podem ser serviços, processos, AJAX, Flash, vídeo, imagens, documentos, arquivos temporários, dados de sessão, propriedades do sistema, dados de configuração, logs.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 406,
                    "cardgroup": "authorization",
                    "card": "6",
                    "name": "Controle de Acesso",
                    "description": "Eduardo consegue acessar dados que ele não tem permissão embora ele tem permissão em formulários, páginas, URL ou pontos de entrada.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 407,
                    "cardgroup": "authorization",
                    "card": "7",
                    "name": "Controle de Acesso",
                    "description": "Yuanjing consegue acessar funções, telas e propriedades do aplicativo, a qual ele não está autorizado a ter acesso.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 408,
                    "cardgroup": "authorization",
                    "card": "8",
                    "name": "Controle de Acesso",
                    "description": "Tom consegue ignorar regras de negócios alterando o fluxo/sequência usual do processo, ou realizando o processo na forma incorreta, ou manipulando valores de data e hora usados pela aplicação, ou usando recursos válidos para fins não intencionais, ou pela manipulação incorreta do controle de dados.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 409,
                    "cardgroup": "authorization",
                    "card": "9",
                    "name": "Controle de Acesso",
                    "description": "Mike consegue usar indevidamente uma aplicação quando uma funcionalidade é usada de forma muito rápida, ou com muita frequência, ou de outra maneira a qual a funcionalidade não se destina, ou pelo consumo de recursos da aplicação ou pela condição de corrida (race conditions) ou utilização excessiva da funcionalidade.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 410,
                    "cardgroup": "authorization",
                    "card": "10",
                    "name": "Controle de Acesso",
                    "description": "Richard consegue ignorar os controles de acesso centralizados pois estes não estão sendo utilizados de forma abrangente em todas as interações.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 411,
                    "cardgroup": "authorization",
                    "card": "J",
                    "name": "Controle de Acesso",
                    "description": "Dinis consegue acessar informações referente a configurações de segurança ou consegue acessar a lista de controle de acesso.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 412,
                    "cardgroup": "authorization",
                    "card": "Q",
                    "name": "Controle de Acesso",
                    "description": "Christopher consegue injetar um comando que a aplicação vai executar no mais alto nível de privilégio.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 413,
                    "cardgroup": "authorization",
                    "card": "K",
                    "name": "Controle de Acesso",
                    "description": "Ryan consegue influenciar ou alterar controles de acesso e permissões e consegue ignora-los.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                }
            ],
            "cryptography": [
                {
                    "id": 501,
                    "cardgroup": "cryptography",
                    "card": "A",
                    "name": "Praticas de Criptografia",
                    "description": "Você inventou um novo ataque contra Práticas de Criptografia.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 502,
                    "cardgroup": "cryptography",
                    "card": "2",
                    "name": "Praticas de Criptografia",
                    "description": "Kyun consegue acesso a dados porque isto foi ocultado/ofuscado/escondido ao invés de ser usada uma função de criptografia aprovada.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 503,
                    "cardgroup": "cryptography",
                    "card": "3",
                    "name": "Praticas de Criptografia",
                    "description": "Axel consegue modificar dados que estão armazenados ou que são temporários ou transitórios, ou consegue modificar código fonte, ou consegue modificar patches/atualizações, ou alterar dados de configuração, pois a integridade não foi checada.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 504,
                    "cardgroup": "cryptography",
                    "card": "4",
                    "name": "Praticas de Criptografia",
                    "description": "Paulo consegue acesso a dados transitórios não criptografados, embora o canal de comunicação esteja criptografado.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 505,
                    "cardgroup": "cryptography",
                    "card": "5",
                    "name": "Praticas de Criptografia",
                    "description": "Kyle consegue ignorar controles criptográficos porque eles não falham de forma segura (ex: eles são desprotegidos por padrão).",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 506,
                    "cardgroup": "cryptography",
                    "card": "6",
                    "name": "Praticas de Criptografia",
                    "description": "Romain consegue ler e modificar dados descriptografados que estão na memória ou são transitórios (ex: credenciais, identificadores de sessão, dados pessoais e comercialmente relevantes), em uso ou em comunicação dentro da aplicação, ou entre aplicação e usuário, ou entre a aplicação e sistemas externos.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 507,
                    "cardgroup": "cryptography",
                    "card": "7",
                    "name": "Praticas de Criptografia",
                    "description": "Gunter consegue interceptar ou modificar dados criptografados em trânsito porque o protocolo está mal implantado, ou configurado de forma fraca, ou os certificados estão inválidos, ou os certificados não são confiáveis, ou a conexão pode ser deteriorada para uma comunicação mais fraca ou descriptografado.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 508,
                    "cardgroup": "cryptography",
                    "card": "8",
                    "name": "Praticas de Criptografia",
                    "description": "Eoin consegue acesso a dados de negócios armazenados (ex: senhas, identificadores de sessão, informações de identificação pessoal - PII, dados de titular de cartão) pois estes dados não estão criptografados de forma segura ou com segurança.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 509,
                    "cardgroup": "cryptography",
                    "card": "9",
                    "name": "Praticas de Criptografia",
                    "description": "Andy consegue ignorar a geração de números aleatórios/randômicos, ou ignorar a geração aleatória de GUID, ou ignorar as funções de criptografia e hashing porque eles são fracos ou foram autoconstruídos.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 510,
                    "cardgroup": "cryptography",
                    "card": "10",
                    "name": "Praticas de Criptografia",
                    "description": "Susanna consegue quebrar a criptografia em uso pois a criptografia não é forte o suficiente para oferecer a proteção exigida, ou esta não é forte o suficiente para tratar a quantidade de esforço que o atacante está disposto a fazer.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 511,
                    "cardgroup": "cryptography",
                    "card": "J",
                    "name": "Praticas de Criptografia",
                    "description": "Justin consegue ler credenciais para acessar recursos internos e externos, serviços e outros sistemas porque estas credenciais estão armazenadas num formato descriptografado ou salvos no código fonte.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 512,
                    "cardgroup": "cryptography",
                    "card": "Q",
                    "name": "Praticas de Criptografia",
                    "description": "Randolph consegue acessar ou prever os dados mestres de criptografia.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                },
                {
                    "id": 513,
                    "cardgroup": "cryptography",
                    "card": "K",
                    "name": "Praticas de Criptografia",
                    "description": "Dan consegue influenciar ou alternar as rotinas/codificações de criptografia (encriptação, hashing, assinaturas digitais, números aleatórios e geração de GUID) e consegue ignorá-los também.",
                    "example": "EX: anEXAMPLEHERE",
                    "explain": "ANEXPLAINHERE",
                    "teamfeedback": null
                }
            ]
        };

    $scope.showDeckDataValidation = false;
    $scope.showDeckAuthentication = false;
    $scope.showDeckSessionManagement = false;
    $scope.showDeckAuthorization = false;
    $scope.showDeckCryptography = false;

    var wizardInit = true;
    $scope.$on('wizard:stepChanged', function (event, data) {
        if (wizardInit) {
            wizardInit = false;
            setTimeout(function () {
                WizardHandler.wizard().goTo(0);
                $scope.$apply();
            });
        }
    });

    $scope.players = [
        { icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Emershow", maker: "Emerson", selected: false },
        { icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Fusca", maker: "Wagner", selected: false },
        { icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Maikon", maker: "Maikon", selected: false },
        { icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Cachhoeira", maker: "Cachoeira", selected: false },
        { icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Vini", maker: "Vinicius", selected: false },
        { icon: "<i class='fa fa-lg fa-user' style='color: #7a747b;'></i>", name: "Tiuzão", maker: "Edoil", selected: false }
    ];

    $scope.changeStepPlayersToDeckSuitTs = function () {
        var filtered = _.where($scope.players, { selected: true });
        // if(filtered.length <= 3){
        //     toastr.error('Please, choose ate least 4 challengers.');     
        //     return false;
        // }
        WizardHandler.wizard().next();
    };

    $scope.deckCards = [
        { icon: "<i class='fa fa-lg fa-code' style='color: #7a747b;'></i>", idDeck: "1", name: "Data validation and encoding", selected: false },
        { icon: "<i class='fa fa-lg fa-user-secret' style='color: #5f8ea0;'></i>", idDeck: "2", name: "Authentication", selected: false },
        { icon: "<i class='fa fa-lg fa-cogs' style='color: #5b906e;'></i>", idDeck: "3", name: "Session management", selected: false },
        { icon: "<i class='fa fa-lg fa-user-times' style='color: #b59b6c;'></i>", idDeck: "4", name: "Authorization", selected: false },
        { icon: "<i class='fa fa-lg fa-unlock-alt' style='color: #895091;'></i>", idDeck: "5", name: "Cryptography", selected: false }
    ];

    $scope.changeStepDeckSuitToStartTheGame = function () {
        var filtered = _.where($scope.deckCards, { selected: true });
        if (filtered.length === 0) {
            toastr.error('Please, choose one card of deck.');
            return false;
        }

        $scope.showDeckDataValidation = false;
        $scope.showDeckAuthentication = false;
        $scope.showDeckSessionManagement = false;
        $scope.showDeckAuthorization = false;
        $scope.showDeckCryptography = false;

        _.each(filtered, function (deck) {
            switch (deck.idDeck) {
                case "1":
                    $scope.showDeckDataValidation = true;
                    break;
                case "2":
                    $scope.showDeckAuthentication = true;
                    break;
                case "3":
                    $scope.showDeckSessionManagement = true;
                    break;
                case "4":
                    $scope.showDeckAuthorization = true;
                    break;
                case "5":
                    $scope.showDeckCryptography = true;
                    break;
                default:
                    $scope.showDeckDataValidation = false;
                    $scope.showDeckAuthentication = false;
                    $scope.showDeckSessionManagement = false;
                    $scope.showDeckAuthorization = false;
                    $scope.showDeckCryptography = false;
            }
        });

        WizardHandler.wizard().next();
    };

    $rootScope.testeeee = 0;

    $scope.showCardExplain = function (data) {
        $uibModal.open({
            animation: true,
            templateUrl: "views/modalcarddetail.html",
            size: "lg",
            scope: $rootScope,
            resolve: {
                dataDeckSelected: function () {
                    return data
                }
            },
            controller: function ($scope, $uibModalInstance, $rootScope) {

                var deckselected = $scope.$resolve.dataDeckSelected;

                $scope.modalRandom = {
                    "idcard": deckselected.id,
                    "cardgroup": deckselected.cardgroup,
                    "name": deckselected.cardgroup,
                    "title": deckselected.name,
                    "card": deckselected.card,
                    "explain": deckselected.explain,
                    "urlPath": "/images/avatares/Spy3.png",
                    "example": deckselected.example,
                    "feedbackteam": deckselected.teamfeedback
                }

                $scope.fecharRegulamento = function (modalRandom) {

                    if (modalRandom.cardgroup === "dadavalidation") {
                        var currentObjDadavalidation = this.$root.deckSuits.dadavalidation;
                        var match = _.find(currentObjDadavalidation, function(item) { return item.id == modalRandom.idcard })
                        if (match) {
                            match.teamfeedback = modalRandom.feedbackteam;
                        }
                        this.$root.deckSuits.dadavalidation = currentObjDadavalidation;                        
                    }

                    if (modalRandom.cardgroup === "authentication") {
                        var currentObjauthentication = this.$root.deckSuits.authentication;
                        var match = _.find(currentObjauthentication, function(item) { return item.id == modalRandom.idcard })
                        if (match) {
                            match.teamfeedback = modalRandom.feedbackteam;
                        }
                        this.$root.deckSuits.authentication = currentObjauthentication;                        
                    }

                    if (modalRandom.cardgroup === "sessionmanagement") {
                        var currentObjsessionmanagement = this.$root.deckSuits.sessionmanagement;
                        var match = _.find(currentObjsessionmanagement, function(item) { return item.id == modalRandom.idcard })
                        if (match) {
                            match.teamfeedback = modalRandom.feedbackteam;
                        }
                        this.$root.deckSuits.sessionmanagement = currentObjsessionmanagement;                        
                    }

                    if (modalRandom.cardgroup === "authorization") {
                        var currentObjauthorization = this.$root.deckSuits.authorization;
                        var match = _.find(currentObjauthorization, function(item) { return item.id == modalRandom.idcard })
                        if (match) {
                            match.teamfeedback = modalRandom.feedbackteam;
                        }
                        this.$root.deckSuits.authorization = currentObjauthorization;                        
                    }

                    if (modalRandom.cardgroup === "cryptography") {
                        var currentObjcryptography = this.$root.deckSuits.cryptography;
                        var match = _.find(currentObjcryptography, function(item) { return item.id == modalRandom.idcard })
                        if (match) {
                            match.teamfeedback = modalRandom.feedbackteam;
                        }
                        this.$root.deckSuits.cryptography = currentObjcryptography;                        
                    }

                    $uibModalInstance.close();
                }
            }
        });
    };



}