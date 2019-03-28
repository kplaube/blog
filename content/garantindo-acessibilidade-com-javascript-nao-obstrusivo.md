Title: Garantindo acessibilidade com Javascript não obstrusivo
Date: 2010-11-18 09:00
Category: desenvolvimento
Tags: desenvolvimento, web, javascript, acessibilidade
Slug: acessibilidade-javascript-nao-obstrusivo
meta_description: Quando você lê Javascript não obstrusivo, você está lendo que uma aplicação web, mesmo que recheada de requisições Ajax, possa funcionar em navegadores mais modestos.

{% img align-left /images/blog/accessibility.png 180 180 Ícone representando acessibilidade %}

Em épocas onde _RIA_ está cada vez mais comum, e as interfaces [_web_][web] resolveram
parecer-se cada vez mais com ambientes _desktops_, tenho reparado um
grande movimento a favor da acessibilidade, afinal, como bons
profissionais que somos temos que garantir que a informação que estamos
disponibilizando seja acessada por uma gama de pessoas, inclusive
aquelas com necessidades especiais.

<!-- PELICAN_END_SUMMARY -->

## Preocupe-se com a acessibilidade

Quando você lê “[_Javascript_][javascript] não obstrusivo”, você está lendo que
uma aplicação _web_, mesmo que recheada de requisições _Ajax_, possa
funcionar em navegadores mais modestos (como o [_Lynx_][lynx], dispositivos
_mobile_, navegadores específicos para pessoas com necessidades
especiais (leitores de tela, por exemplo) ou até mesmo em outras
máquinas (no caso de serviços _web_).

[_Diego Eis (do Tableless)_][acessibilidade_tableless] comenta que para garantir
acessibilidade em suas aplicações _web_ é necessário que:

- Funcione em diversos dispositivos (_handhelds_, _WebTV_, _tablets_, etc);
- Funcione em várias plataformas (_Windows_, _Linux_, _Mac_, etc);
- Funcione em diversos navegadores;
- Seja acessível por todos os tipos de pessoas (incluindo pessoas com deficiência motora ou visual).

A pergunta que não quer calar: Como posso fazer da minha aplicação
_web_, que tem centenas de eventos _Javascript_ e centenas de
requisições _Ajax_, ser “não obstrusiva”?

## Não deixe que o Javascript interfira na informação

Quem vem do _xHTML_ já tem por hábito separar o _front-end_ em três
áreas:

- Informação (conteúdo)
- Estilos (aparência)
- Comportamento (interação)

Podemos chamá-las de **camadas** se preferir. O importante é que uma
área deve impactar o mínimo possível sobre a outra (ou seja, interferir
“diretamente”). Isto é possível eliminando o uso de instruções _inline_,
usando folhas de estilos ao invés de instruções _style_ e adicionando
eventos ao _Javascript_ através de métodos da linguagem (e não atributos
dos elementos _HTML_ como o _onClick_).

Pode parecer difícil enriquecer uma aplicação e preocupar-se com
acessibilidade, mas faça o seguinte:

- Comece com um _HTML_ bem escrito (e semântico)
- Construa a aparência através de folhas de estilos externas (de preferência)
- Aplique o comportamento necessário através de _scripts_ externos (de preferência)

O [_Igor Escobar_][igor_escobar] fez um _post_ com uma apresentação de _Simon
Willison_ onde é explicado [como fazer _Javascript_ não obstrusivo com
_jQuery_][javascript_nao_obstrusivo]. A prática acima (e mencionada
na apresentação) é conhecida por _Progressive Enhancement_, e você pode ler
mais sobre no [_A List Apart_][a_list_apart].

## noscript?

Se construirmos uma aplicação ou _website_ que funciona dentro da
_Progressive Enhancement_, temos um _website_ ou aplicação que não
obrigará o usuário a ter todos os recursos da _CSS_ ou do _Javascript_
totalmente funcionais em seu navegador. Temos uma aplicação que
funcionará mesmo se o navegador do usuário não suporte _Javascript_.
Logo, **(na minha opinião)** não é necessário o uso da tag
**\<noscript\>**, afinal o usuário não será “prejudicado” ou isento de
qualquer tipo de informação que nossa aplicação se disponha a exibir.

## Considerações finais

Mesmo que a sua aplicação seja para um público muito específico,
preocupe-se com a acessibilidade. Você, seus clientes e a sociedade só
tem a ganhar.

Finalizando… é interessante notar que qualquer boa-prática que envolva o
desenvolvimento _Web_ está diretamente ligada com um _HTML_ bem escrito,
e acima de tudo, com a **semântica**.

Até a próxima…

[web]: {tag}web "Leia mais sobre Web"
[javascript]: {tag}javascript "Leia mais sobre Javascript"
[lynx]: http://pt.wikipedia.org/wiki/Lynx_(navegador) "Não conhece o Lynx?"
[acessibilidade_tableless]: http://www.tableless.com.br/principais-pontos-da-acessibilidade-na-web "Principais pontos da Acessibilidade na Web"
[igor_escobar]: http://www.igorescobar.com/blog/ "Visite o blog do Igor Escobar"
[javascript_nao_obstrusivo]: http://www.igorescobar.com/blog/2009/10/26/javascript-nao-obstrutivo-com-jquery/ "Javascript não obstrusivo com jQuery"
[a_list_apart]: http://www.alistapart.com/articles/understandingprogressiveenhancement/ "Understanding Progressive Enhancement"
