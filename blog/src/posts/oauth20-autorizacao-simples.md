---
title: "OAuth2.0: Autorização simples (or is it?)"
date: 2018-02-06 11:45:00
modified: 2023-11-13 15:34:00
tags: ["desenvolvimento-web", "oauth", "oauth2", "auth", "api"]
slug: oauth20-autorizacao-simples-or-is-it
thumbnail: ./images/oauth2-logo.jpg
---

Já pincelamos alguns assuntos que cerceiam o desenvolvimento
de [_APIs_](/tag/api.html "Leia mais sobre API"), desde
[bibliotecas](/2017/01/06/construindo-apis-em-django-com-restless.html "Construindo APIs em Django com Restless")
até a construção de [especificações](/2017/01/31/ramilificando-as-suas-apis.html "Ramilificando as suas APIs").
Nesse _post_ vamos introduzir a camada de _auth_ de uma _API_ [_web_](/tag/desenvolvimento-web.html "Leia mais sobre web"), e
entender como podemos resolver esse problema através do protocolo _OAuth 2.0_.

## O que é OAuth 2.0?

Diretamente do [oauth2.net](https://oauth.net/2/ "Leia mais sobre OAuth"):

> OAuth 2.0 is the industry-standard protocol for authorization. OAuth 2.0 supersedes
> the work done on the original OAuth protocol created in 2006. OAuth 2.0 focuses on client
> developer simplicity while providing specific authorization flows for web applications,
> desktop applications, mobile phones, and living room devices.

Em outras palavras, é um _framework_ de autorização que possibilita aplicações a obterem acesso limitado
a contas de usuários em um serviço [_HTTP_](/tag/http.html "Leia mais sobre HTTP"), como _Facebook_, _GitHub_
ou _Twitter_. Ele funciona delegando a autenticação do usuário ao serviço que "hosteia" a sua conta,
e autoriza aplicações _third-party_ a acessarem a mesma.

Imagine que você criou um serviço _web_. É razoável assumir que você aplique alguma forma proprietária para
resolver a questão de autenticação de usuários. Um formulário com _username_ e _password_ seria o suficiente
para realizar a tarefa. Imagine que o seu serviço comece a ganhar notoriedade, e com isso potenciais parceiros
desejam se integrar com a sua solução. Construir uma [_API REST_](/tag/rest.html "Leia mais sobre REST") é um
caminho confortável, uma vez que o padrão é aberto, bem explorado, e não há nenhuma restrição de patente ou direitos
para que o seu parceiro o adote.

O mesmo acontece com o _OAuth_. Agora você precisa autorizar o acesso a sua _API_, afinal não é todo parceiro que terá
acesso a parte _premium_ da sua solução. Ao invés de bolar um fluxo proprietário, no qual o seu parceiro terá que
desenvolver uma biblioteca apenas para conectar-se ao seu serviço, você adota o _OAuth 2.0_. Como é um padrão aberto,
o interessado provavelmente já o conhece e já possui as ferramentas necessárias.

![Imagem do filme Deixe-me Entrar](/media/oauth-let-me-in.jpg "O OAuth 2.0 é comprovadamente seguro. Mas nem tanto contra vampiros... (amazon.com)")

Embora pareça complicado, é possível resumir o fluxo do _OAuth 2.0_ com o diagrama abaixo:

![Diagrama exibindo a dança realizada para autorizar um usuário](/media/oauth-overview.png "Diagrama exibindo a dança realizada para autorizar um usuário (api.slack.com)")

Entender melhor os papéis envolvidos nesse processo pode dar mais cor ao entendimento do diagrama acima.

## Papéis

O protocolo _OAuth_ faz uso de 4 papéis:

### Resource owner (user)

O _resource owner_ é o usuário que autoriza a aplicação a acessar a sua conta.

**Exemplo:** Você.

### Client (application)

A aplicação que está tentando acessar a conta do usuário. O usuário precisa autorizá-la a fazê-lo.

**Exemplo:** Um aplicativo de galeria de imagens que conecta-se ao seu _Dropbox_.

### Authorization server

Esse é o servidor que apresenta a interface onde o usuário pode aprovar ou negar o acesso daquele aplicativo
à sua conta.

**Exemplo:** Servidor de autorização do _Dropbox_.

### Resource server (API)

É o serviço/_API_ no qual estamos tentando acessar. O _resource server_ lida com requisições autenticadas
após o aplicativo ter obtido um _token_ de acesso.

**Exemplo:** _API_ de arquivos do _Dropbox_.

No cenário descrito acima, ter o _authorization server_ e o _resource server_ no mesmo serviço é aceitável.
Mas podemos ter a necessidade de apenas autenticar o usuário (utilizando o _Facebook_ como _authorization server_,
por exemplo) e prover funcionalidades da nossa própria _API_ (agindo como _resource server_).

## Fluxos

![Diagrama de autorização de usuário no Dropbox](/media/oauth2-diagram-dropbox.png "Diagrama de autorização de usuário no Dropbox (dropbox.com)")

Você provavelmente já passou pelo fluxo ilustrado acima ao fazer _login_ no _Spotify_.

O _app_ do _Spotify_ pede autorização ao _Facebook_ para acessar os dados da sua conta.
O _Facebook_ por sua vez exibe uma tela, solicitando que você autorize o acesso clicando em um botão.
Com isso, _Facebook_ autoriza acesso do _Spotify_ e a partir daí ele é capaz de ver o seu endereço
de e-mail e consequentemente ter certeza de que "você é você".

No caso do exemplo da galeria de fotos, os seguintes passos são executados:

- A aplicação requisita autorização para acessar os recursos do usuário;
- Se o usuário autorizá-la, a aplicação recebe um _authorization grant_;
- A aplicação requisita um _access token_ do _authorization server_, apresentando as suas próprias credenciais e o _authorization grant_ cedido pelo usuário;
- Se as credenciais e o _authorization grant_ forem válidos, o _authorization server_ emite um _access token_ para a aplicação. O processo de autorização está completo;
- A aplicação requisita o recurso protegido do _resource server_, apresentando o _access token_ para autenticação;
- Se o _access token_ for válido, o _resource server_ retorna o recurso para a aplicação.

Caso você esteja construindo o aplicativo de galeria de fotos, é necessário criar um "app" na área de _Developers_ do _Dropbox_, como mostrado abaixo:

![Área de criação de app](/media/dropbox-app-creation.png "Área de criação de app")

Ao finalizar o cadastro, o _app_ receberá um `app key` e `app secret`. Essas são as credenciais do aplicativo, que
devem ser apresentadas ao _authorization server_ juntamente com o `authorization grant`, para que o processo execute com sucesso.

[Leia o OAuth guide, do Dropbox](https://www.dropbox.com/developers/reference/oauth-guide).

## Diferenças para o OAuth 1.0

O _OAuth 1.0_ foi baseado em protocolos proprietários, e com o passar do tempo pode-se dizer que ele "não envelheceu bem".
O _OAuth 2.0_ surgiu das lições aprendidas com o primeiro, e tem como principais melhorias:

- Utilizar _HTTPS_ para todas as comunicações entre navegadores, clientes e _API_;
- Melhor experiência de autorização para aplicativos nativos e suporte para extensões;
- A separação em papéis permite uma melhor escala de operação, uma vez que é possível tratar o _user authorization_ e
  as _API calls_ em contextos (serviços e até mesmo máquinas) diferentes.

## Considerações finais

Se até então o protocolo não ficou muito claro, não se preocupe! É na prática que o _OAuth 2.0_ começa a fazer mais sentido,
e é isso que abordaremos no próximo _post_.

Entender como esse protocolo funciona é fundamental para compreender outras variações como [Native Apps auth](https://oauth.net/2/native-apps/),
[SAML](http://tools.ietf.org/html/rfc7522) ou [JWT](https://tools.ietf.org/html/rfc7519).

Até a próxima.

## Referências

- [Aaron Parecki - OAuth 2 Simplified](https://aaronparecki.com/oauth-2-simplified/)
- [DigitalOcean - An Introduction to OAuth 2](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
- [Dropbox - OAuth guide](https://www.dropbox.com/developers/reference/oauth-guide)
- [Oauth.net - OAuth 2.0](https://oauth.net/2/)
- [Slack API - Using OAuth 2.0](https://api.slack.com/docs/oauth)
