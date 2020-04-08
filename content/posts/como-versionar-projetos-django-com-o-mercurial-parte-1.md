---
title: "Como versionar projetos Django com o Mercurial - Parte 1"
date: 2011-05-10 23:34
tags: ["desenvolvimento-web", "python", "django", "git", "mercurial", "vcs"]
slug: como-versionar-projetos-django-mercurial-parte
thumbnail: ./images/mercurial-logo.png
---

Se você está começando em [*Django*][], e nunca utilizou uma ferramenta
de controle de versão (as vezes por trauma do [*SVN*][] ou por [simples
desinteresse][]) esta será uma grande oportunidade para você conhecer o
[*Mercurial*][], e saber a forma que venho utilizando para versionar
meus projetos Django.

## Peraí! Por que não Git?

Sem dúvida o [*Git*][] é a ferramenta do momento em
se tratando de controle de versões, e vem sendo muito utilizada por
rubistas e pythonistas (eu incluso nessa última galera).

Por que não falar de _Git_ aqui? Simples! **Você vai ouvir falar sobre
_Git_ em todo o lugar**. O _Google_ vai te trazer toneladas de
informações sobre _Git_. Você vai “ouvir” o pessoal falando que [*Git* é melhor do que qualquer outra ferramenta][].
Você vai até enjoar de tanto ouvir falar sobre _Git_.

O _Mercurial_ foi o primeiro [*DVCS*][] que utilizei (de verdade). **Na
minha opinião**, ele é mais simples que o _Git_, é feito em
[*Python*][], e me atende no desenvolvimento dos meus projetos pessoais.

Concordo com o pessoal que diz que o _Git_ é bom, e concordo com o
pessoal que fala que o _Mercurial_ é bom. É perfeitamente possível
utilizar estas duas ferramentas, não precisamos ser radicais e iniciar
um _flame_ em cima deste assunto. A opção é melhor que não ter opção…

## GitHub x Bitbucket

Agora uma coisa eu não posso deixar de concordar: O [*GitHub*][] é (na minha opinião) melhor que o
[*Bitbucket*][].

Ambos são repositórios de código na nuvem, o primeiro usando _Git_ e o
segundo usando _Mercurial_. O detalhe é que o _GitHub_ tem algumas
funções mais apuradas que o _Bitbucket_, principalmente as
funcionalidades que tornam a ferramenta muito mais “social”.

Embora o _Bitbucket_ recentemente tenha sido adquirido pela
**_Atlassian_** e tenha recebido uma forte injencão de melhorias… o
_GitHub_ ainda é, para mim, a melhor forma de compartilhar código que
existe no momento.

Venho utilizando o _Bitbucket_ pela opção de poder manter **repositórios
de código “fechados”**. Coisa que com o “rival” só é possível através de
uma conta paga.

Mais uma vez… é perfeitamente possível viver utilizando as duas
ferramentas.

Na próxima parte deste _post_ vamos abordar o básico do _Mercurial_, e
também pretendo mostrar como organizo os meus projetos _Django_
“versionando-os” com o _Mercurial_ e _Bitbucket_.

Até a próxima…

[*django*]: /tag/django.html "Leia mais sobre Django"
[*svn*]: http://akitaonrails.com/2007/09/22/jogar-pedra-em-gato-morto-por-que-subversion-no-presta "Jogar Pedra em Gato Morto: por que Subversion não presta"
[simples desinteresse]: http://pt.wikipedia.org/wiki/Sistema_de_controle_de_vers%C3%A3o "Wikipedia, Sistema de Controle de Versão"
[*mercurial*]: http://www.profissionaisti.com.br/2009/06/bitbucket-hospede-e-versione-softwares-com-mercurial/ "Bitbucket: Hospede e versione softwares com Mercurial"
[*git*]: http://git-scm.com/ "Git é a estrela do momento tratando-se de DVCS"
[*git* é melhor do que qualquer outra ferramenta]: http://pt.whygitisbetterthanx.com/ "Por que Git é Melhor que X"
[*dvcs*]: http://en.wikipedia.org/wiki/Distributed_revision_control "DVCS - Distributed Version Control System"
[*python*]: /tag/python.html "Leia mais sobre Python"
[*github*]: https://github.com/ "GitHub, Social coding"
[*bitbucket*]: https://bitbucket.org/ "Alternativa com Mercurial ao GitHub"
