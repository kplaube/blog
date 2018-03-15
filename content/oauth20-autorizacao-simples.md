Title: OAuth2.0: Autorização simples (or is it?)
Date: 2018-02-06 11:45:00
Category: desenvolvimento
Tags: desenvolvimento, web, oauth, oauth2, auth, apis
slug: oauth20-autorizacao-simples-or-is-it
meta_description: OAuth 2.0 pode parecer confuso, e em alguns momentos ele é. Nesse post vamos revisar o conceito por trás do OAuth, e entender como os papéis interagem durante o processo de autorização.

{% img align-left /images/blog/oauth2-logo.jpg 180 180 Logotipo do OAuth 2.0 %}

É isso mesmo, meu caro leitor! Já pincelamos alguns assuntos que cerceiam o desenvolvimento
de [*APIs*]({tag}apis "Leia mais sobre API"), desde
[bibliotecas]({filename}construindo-apis-em-django-com-restless.md "Construindo APIs em Django com Restless")
até a construção de [especificações]({filename}ramilificando-as-suas-apis.md "Ramilificando as suas APIs").
Nesse *post* vamos introduzir a camada de *auth* de uma *API* [*Web*]({tag}web "Leia mais sobre Web"), e
entender como podemos resolver esse problema através do protocolo *OAuth 2.0*.

<!-- PELICAN_END_SUMMARY -->

## O que é OAuth 2.0?

Diretamente do [oauth2.net](https://oauth.net/2/ "Leia mais sobre OAuth"):

> OAuth 2.0 is the industry-standard protocol for authorization. OAuth 2.0 supersedes
> the work done on the original OAuth protocol created in 2006. OAuth 2.0 focuses on client
> developer simplicity while providing specific authorization flows for web applications,
> desktop applications, mobile phones, and living room devices.

Em outras palavras, é um *framework* de autorização que possibilita aplicações a obterem acesso limitado
a contas de usuários em um serviço [*HTTP*]({tag}http "Leia mais sobre HTTP"), como *Facebook*, *GitHub*
ou *Twitter*. Ele funciona delegando a autenticação do usuário ao serviço que "hosteia" a sua conta,
e autoriza aplicações *third-party* a acessarem a mesma.

Imagine que você criou um serviço *Web*. É razoável assumir que você aplique alguma forma proprietária para
resolver a questão de autenticação de usuários. Um formulário com *username* e *password* seria o suficiente
para realizar a tarefa. Imagine que o seu serviço comece a ganhar notoriedade, e com isso potenciais parceiros
desejam se integrar com a sua solução. Construir uma [*API REST*]({tag}rest "Leia mais sobre REST") é um
caminho confortável, uma vez que o padrão é aberto, bem explorado, e não há nenhuma restrição de patente ou direitos
para que o seu parceiro o adote.

O mesmo acontece com o *OAuth*. Agora você precisa autorizar o acesso a sua *API*, afinal não é todo parceiro que terá
acesso a parte *premium* da sua solução. Ao invés de bolar um fluxo proprietário, no qual o seu parceiro terá que
desenvolver uma biblioteca apenas para conectar-se ao seu serviço, você adota o *OAuth 2.0*. Como é um padrão aberto,
o interessado provavelmente já o conhece e já possui as ferramentas necessárias.

{% img align-center-keep-size /images/blog/oauth-let-me-in.jpg 640 427 O OAuth 2.0 é comprovadamente seguro. Mas nem tanto contra vampiros... (amazon.com) %}

Embora pareça complicado, é possível resumir o fluxo do *OAuth 2.0* com o diagrama abaixo:

{% img align-center-keep-size /images/blog/oauth-overview.png 640 359 Diagrama exibindo a dança realizada para autorizar um usuário (api.slack.com) %}

Entender melhor os papéis envolvidos nesse processo pode dar mais cor ao entendimento do diagrama acima.

## Papéis

O protocolo *OAuth* faz uso de 4 papéis:

### Resource owner (user)

O *resource owner* é o usuário que autoriza a aplicação a acessar a sua conta.

**Exemplo:** Você.

### Client (application)

A aplicação que está tentando acessar a conta do usuário. O usuário precisa autorizá-la a fazê-lo.

**Exemplo:** Um aplicativo de galeria de imagens que conecta-se ao seu *Dropbox*.

### Authorization server

Esse é o servidor que apresenta a interface onde o usuário pode aprovar ou negar o acesso daquele aplicativo
à sua conta.

**Exemplo:** Servidor de autorização do *Dropbox*.

### Resource server (API)

É o serviço/*API* no qual estamos tentando acessar. O *resource server* lida com requisições autenticadas
após o aplicativo ter obtido um *token* de acesso.

**Exemplo:** *API* de arquivos do *Dropbox*.

No cenário descrito acima, ter o *authorization server* e o *resource server* no mesmo serviço é aceitável.
Mas podemos ter a necessidade de apenas autenticar o usuário (utilizando o *Facebook* como *authorization server*,
por exemplo) e prover funcionalidades da nossa própria *API* (agindo como *resource server*).

## Fluxos

{% img align-center-keep-size /images/blog/oauth2-diagram-dropbox.png 640 622 Diagrama de autorização de usuário no Dropbox (dropbox.com) %}

Você provavelmente já passou pelo fluxo ilustrado acima ao fazer *login* no *Spotify*.

O *app* do *Spotify* pede autorização ao *Facebook* para acessar os dados da sua conta.
O *Facebook* por sua vez exibe uma tela, solicitando que você autorize o acesso clicando em um botão.
Com isso, *Facebook* autoriza acesso do *Spotify* e a partir daí ele é capaz de ver o seu endereço
de e-mail e consequentemente ter certeza de que "você é você".

No caso do exemplo da galeria de fotos, os seguintes passos são executados:

* A aplicação requisita autorização para acessar os recursos do usuário;
* Se o usuário autorizá-la, a aplicação recebe um *authorization grant*;
* A aplicação requisita um *access token* do *authorization server*, apresentando as suas próprias credenciais e o *authorization grant* cedido pelo usuário;
* Se as credenciais e o *authorization grant* forem válidos, o *authorization server* emite um *access token* para a aplicação. O processo de autorização está completo;
* A aplicação requisita o recurso protegido do *resource server*, apresentando o *access token* para autenticação;
* Se o *access token* for válido, o *resource server* retorna o recurso para a aplicação.

Caso você esteja construindo o aplicativo de galeria de fotos, é necessário criar um "app" na área de *Developers* do *Dropbox*, como mostrado abaixo:

{% img align-center-keep-size /images/blog/dropbox-app-creation.png 640 522 Área de criação de app %}

Ao finalizar o cadastro, o *app* receberá um `app key` e `app secret`. Essas são as credenciais do aplicativo, que
devem ser apresentadas ao *authorization server* juntamente com o `authorization grant`, para que o processo execute com sucesso.

[Leia o OAuth guide, do Dropbox](https://www.dropbox.com/developers/reference/oauth-guide).

## Diferenças para o OAuth 1.0

O *OAuth 1.0* foi baseado em protocolos proprietários, e com o passar do tempo pode-se dizer que ele "não envelheceu bem".
O *OAuth 2.0* surgiu das lições aprendidas com o primeiro, e tem como principais melhorias:

- Utilizar *HTTPS* para todas as comunicações entre navegadores, clientes e *API*;
- Melhor experiência de autorização para aplicativos nativos e suporte para extensões;
- A separação em papéis permite uma melhor escala de operação, uma vez que é possível tratar o *user authorization* e 
as *API calls* em contextos (serviços e até mesmo máquinas) diferentes.

## Considerações finais

Se até então o protocolo não ficou muito claro, não se preocupe! É na prática que o *OAuth 2.0* começa a fazer mais sentido,
e é isso que abordaremos no próximo *post*.

Entender como esse protocolo funciona é fundamental para compreender outras variações como [Native Apps auth](https://oauth.net/2/native-apps/),
[SAML](http://tools.ietf.org/html/rfc7522) ou [JWT](https://tools.ietf.org/html/rfc7519).

Até a próxima!

## Referências

- [Aaron Parecki - OAuth 2 Simplified](https://aaronparecki.com/oauth-2-simplified/)
- [DigitalOcean - An Introduction to OAuth 2](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
- [Dropbox - OAuth guide](https://www.dropbox.com/developers/reference/oauth-guide)
- [Oauth.net - OAuth 2.0](https://oauth.net/2/)
- [Slack API - Using OAuth 2.0](https://api.slack.com/docs/oauth)
