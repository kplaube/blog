Title: Garantindo acessibilidade com Javascript não obstrusivo
Date: 2010-11-18 09:00
Category: desenvolvimento
Tags: desenvolvimento, web, javascript, acessibilidade
Slug: acessibilidade-javascript-nao-obstrusivo

|img "/images/blog/javascript-acessibility.jpg" 180 144 "Ícone representando acessibilidade em Informática" "align-left"|
Em épocas onde *RIA* está cada vez mais comum, e as interfaces [*Web*][web] resolveram
parecer-se cada vez mais com ambientes *Desktops*, tenho reparado um
grande movimento a favor da acessibilidade, afinal, como bons
profissionais que somos temos que garantir que a informação que estamos
disponibilizando seja acessada por uma gama de pessoas, inclusive
aquelas com necessidades especiais.

<!-- PELICAN_END_SUMMARY -->

Preocupe-se com a acessibilidade
--------------------------------

Quando você lê “[*Javascript*][javascript] não obstrusivo”, você está lendo que
uma aplicação *Web*, mesmo que recheada de requisições *Ajax*, possa
funcionar em navegadores mais modestos (como o [*Lynx*][lynx], dispositivos
*mobile*, navegadores específicos para pessoas com necessidades
especiais (leitores de tela, por exemplo) ou até mesmo em outras
máquinas (no caso de serviços *Web*).

[*Diego Eis (do Tableless)*][acessibilidade_tableless] comenta que para garantir
acessibilidade em suas aplicações *Web* é necessário que:

* Funcione em diversos dispositivos (*handhelds*, *WebTV*, *tablets*, etc);
* Funcione em várias plataformas (*Windows*, *Linux*, *Mac*, etc);
* Funcione em diversos navegadores;
* Seja acessível por todos os tipos de pessoas (incluindo pessoas com deficiência motora ou visual).

A pergunta que não quer calar: Como posso fazer da minha aplicação
*Web*, que tem centenas de eventos *Javascript* e centenas de
requisições *Ajax*, ser “não obstrusiva”?

Não deixe que o Javascript interfira na informação
--------------------------------------------------

Quem vem do *xHTML* já tem por hábito separar o *front-end* em três
áreas:

* Informação (conteúdo)
* Estilos (aparência)
* Comportamento (interação)

Podemos chamá-las de **camadas** se preferir. O importante é que uma
área deve impactar o mínimo possível sobre a outra (ou seja, interferir
“diretamente”). Isto é possível eliminando o uso de instruções *inline*,
usando folhas de estilos ao invés de instruções *style* e adicionando
eventos ao *Javascript* através de métodos da linguagem (e não atributos
dos elementos *HTML* como o *onClick*).

Pode parecer difícil enriquecer uma aplicação e preocupar-se com
acessibilidade, mas faça o seguinte:

* Comece com um *HTML* bem escrito (e semântico)
* Construa a aparência através de folhas de estilos externas (de preferência)
* Aplique o comportamento necessário através de *scripts* externos (de preferência)

O [*Igor Escobar*][igor_escobar] fez um *post* com uma apresentação de *Simon
Willison* onde é explicado [como fazer *Javascript* não obstrusivo com
*jQuery*][javascript_nao_obstrusivo]. A prática acima (e mencionada
na apresentação) é conhecida por *Progressive Enhancement*, e você pode ler
mais sobre no [*A List Apart*][a_list_apart].

noscript?
---------

Se construirmos uma aplicação ou *website* que funciona dentro da
*Progressive Enhancement*, temos um *website* ou aplicação que não
obrigará o usuário a ter todos os recursos da *CSS* ou do *Javascript*
totalmente funcionais em seu navegador. Temos uma aplicação que
funcionará mesmo se o navegador do usuário não suporte *Javascript*.
Logo, **(na minha opinião)** não é necessário o uso da tag
**\<noscript\>**, afinal o usuário não será “prejudicado” ou isento de
qualquer tipo de informação que nossa aplicação se disponha a exibir.

Considerações finais
--------------------

Mesmo que a sua aplicação seja para um público muito específico,
preocupe-se com a acessibilidade. Você, seus clientes e a sociedade só
tem a ganhar.

Finalizando… é interessante notar que qualquer boa-prática que envolva o
desenvolvimento *Web* está diretamente ligada com um *HTML* bem escrito,
e acima de tudo, com a **semântica**.

Até a próxima…

  [web]: {tag}web "Leia mais sobre Web"
  [javascript]: {tag}javascript
    "Leia mais sobre Javascript"
  [lynx]: http://pt.wikipedia.org/wiki/Lynx_(navegador)
    "Não conhece o Lynx?"
  [acessibilidade_tableless]: http://www.tableless.com.br/principais-pontos-da-acessibilidade-na-web
    "Principais pontos da Acessibilidade na Web"
  [igor_escobar]: http://www.igorescobar.com/blog/
    "Visite o blog do Igor Escobar"
  [javascript_nao_obstrusivo]: http://www.igorescobar.com/blog/2009/10/26/javascript-nao-obstrutivo-com-jquery/
    "Javascript não obstrusivo com jQuery"
  [a_list_apart]: http://www.alistapart.com/articles/understandingprogressiveenhancement/
    "Understanding Progressive Enhancement"
