Title: Como versionar projetos Django com o Mercurial - Parte 1
Date: 2011-05-10 23:34
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, django, git, mercurial
Slug: como-versionar-projetos-django-mercurial-parte
meta_description: Se você está começando em Django esta será uma grande oportunidade para você conhecer o Mercurial.


{% img representative-image /images/blog/mercurial-logo.png 180 216 Logotipo do Mercurial %}
Olá pessoas!

E cá estamos, tentando de qualquer forma manter este *blog* alimentado
com um conteúdo no mínimo interessante.

Se você está começando em [*Django*][], e nunca utilizou uma ferramenta
de controle de versão (as vezes por trauma do [*SVN*][] ou por [simples
desinteresse][]) esta será uma grande oportunidade para você conhecer o
[*Mercurial*][], e saber a forma que venho utilizando para versionar
meus projetos Django.

<!-- PELICAN_END_SUMMARY -->


Peraí! Por que não Git?
-----------------------

{% img align-left /images/blog/git-logo.png 97 188 Logotipo do Git %}
Sem dúvida o [*Git*][] é a ferramenta do momento em
se tratando de controle de versões, e vem sendo muito utilizada por
rubistas e pythonistas (eu incluso nessa última galera).

Por que não falar de *Git* aqui? Simples! **Você vai ouvir falar sobre
*Git* em todo o lugar**. O *Google* vai te trazer toneladas de
informações sobre *Git*. Você vai “ouvir” o pessoal falando que [*Git* é melhor do que qualquer outra ferramenta][].
Você vai até enjoar de tanto ouvir falar sobre *Git*.

O *Mercurial* foi o primeiro [*DVCS*][] que utilizei (de verdade). **Na
minha opinião**, ele é mais simples que o *Git*, é feito em
[*Python*][], e me atende no desenvolvimento dos meus projetos pessoais.

Concordo com o pessoal que diz que o *Git* é bom, e concordo com o
pessoal que fala que o *Mercurial* é bom. É perfeitamente possível
utilizar estas duas ferramentas, não precisamos ser radicais e iniciar
um *flame* em cima deste assunto. A opção é melhor que não ter opção…


GitHub x Bitbucket
------------------

{% img align-left /images/blog/bitbucket-github.png 150 150 Bitbucket x Github %}
Agora uma coisa eu não posso deixar de concordar: O [*GitHub*][] é (na minha opinião) melhor que o
[*Bitbucket*][].

Ambos são repositórios de código na nuvem, o primeiro usando *Git* e o
segundo usando *Mercurial*. O detalhe é que o *GitHub* tem algumas
funções mais apuradas que o *Bitbucket*, principalmente as
funcionalidades que tornam a ferramenta muito mais “social”.

Embora o *Bitbucket* recentemente tenha sido adquirido pela
***Atlassian*** e tenha recebido uma forte injencão de melhorias… o
*GitHub* ainda é, para mim, a melhor forma de compartilhar código que
existe no momento.

Venho utilizando o *Bitbucket* pela opção de poder manter **repositórios
de código “fechados”**. Coisa que com o “rival” só é possível através de
uma conta paga.

Mais uma vez… é perfeitamente possível viver utilizando as duas
ferramentas.

Na próxima parte deste *post* vamos abordar o básico do *Mercurial*, e
também pretendo mostrar como organizo os meus projetos *Django*
“versionando-os” com o *Mercurial* e *Bitbucket*.

Até a próxima…


  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [*SVN*]: http://akitaonrails.com/2007/09/22/jogar-pedra-em-gato-morto-por-que-subversion-no-presta
    "Jogar Pedra em Gato Morto: por que Subversion não presta"
  [simples desinteresse]: http://pt.wikipedia.org/wiki/Sistema_de_controle_de_vers%C3%A3o
    "Wikipedia, Sistema de Controle de Versão"
  [*Mercurial*]: http://www.profissionaisti.com.br/2009/06/bitbucket-hospede-e-versione-softwares-com-mercurial/
    "Bitbucket: Hospede e versione softwares com Mercurial"
  [*Git*]: http://git-scm.com/
    "Git é a estrela do momento tratando-se de DVCS"
  [*Git* é melhor do que qualquer outra ferramenta]: http://pt.whygitisbetterthanx.com/
    "Por que Git é Melhor que X"
  [*DVCS*]: http://en.wikipedia.org/wiki/Distributed_revision_control
    "DVCS - Distributed Version Control System"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*GitHub*]: https://github.com/ "GitHub, Social coding"
  [*Bitbucket*]: https://bitbucket.org/
    "Alternativa com Mercurial ao GitHub"
