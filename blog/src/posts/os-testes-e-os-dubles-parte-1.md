---
title: "Os testes e os dublês - Parte 1"
date: 2014-08-07 23:00:00
modified: 2023-11-12 19:30:00
tags: ["testes", "mock", "python"]
slug: os-testes-e-os-dubles-parte-1
thumbnail: /media/test-double.jpg
---

Em tempos onde [discussões envolvendo a relevância][2] dos [testes][3] têm
causado furor nos diferentes campos da área do desenvolvimento de _software_,
nada mais justo do que "chovermos no molhado", e falarmos sobre testes, _mocks_,
_stubs_ e todos os seus primos menos famosos.

Nessa primeira parte, vamos conceituar toda essa "sopa de letrinhas" e detalhar
a forma peculiar como os testes são tratados dentro de um dos times
da [_Globo.com_][4].

## Qual causa, motivo, razão ou circunstância?

Eu gosto muito da linha de pensamento que colegas como _[Rafael Martins][5]_ e
_[Rômulo Jales][6]_, têm em relação a testes automatizados: Pare de perder tempo
separando-os em unitários, funcionais, aceitação ou regressão, e vá escrevê-los.

Particularmente, acho vantajoso praticar o [_TDD_][7], deixando com que os
testes me ajudem a montar a arquitetura da aplicação. Quando roubamos um pouco
da filosofia do parágrafo anterior, temos um foco maior na resolução de um
requisito do que na "minúcia" de uma classe/módulo/pacote. Organicamente
conseguimos atingir um desenvolvimento focado no funcional, muito próximo de
propostas como a do [_BDD_][8], sem precisar recorrer a artifícios
como _user stories_.

Ok... deixamos de ser tão "unitários", e aprendemos a lidar com o todo. Mas e
os acessos ao banco de dados? Ao _[Memcached][9]_ ou _Redis_? E as interações
entre meus serviços e _APIs_ internas? E as escritas em disco? E as sessões
do usuário?

Como lidar com tudo isso?

## O Case de Esportes 1

O _Esportes 1_ é um dos 3 times que compõe o núcleo de desenvolvimento da área
de esportes, da _Globo.com_.

No time, decidimos que a maioria dessas interações deve estar lá em tempo de
execução dos testes. Ou seja, ([com uma ajudinha do _Django_][10]) nossos testes
consultam o banco de dados, interagem com a camada de cache, escrevem em
disco, etc.

Somos tão preguiçosos que os testes chegam a consultar os ambientes de
teste/desenvolvimento dos serviços criados por outros times, como dados
semânticos, de dados esportivos, de vídeos, etc.

Obviamente temos o _trade-off_ dos tempos de execução, que até o momento não
chegaram a ser um problema tão grande para a equipe.

### Um lugar escuro e frio

Concluímos que nossos testes não são nem de longe isolados. Estamos mais
preocupados em validar o comportamento de uma funcionalidade do que de um
objeto em específico.

Batemos no peito, orgulhosos de nossa decisão, e começamos a encarar o mundo
com olhos marejados pelo árduo caminho que percorremos para chegar até aqui.

Mas existe a "borda" da aplicação. Dali para fora, você não tem controle algum
sobre o que acontece. Você apenas tem a promessa de que aquela _API_ vai
funcionar. Deixar com que os testes batam nesses serviços "estrangeiros" pode
custar muito tempo (e claro, dinheiro), tornando inviável a execução dos mesmos
em tempo de desenvolvimento.

E é aí meu amigo, depois dessa justificativa gigante, que entram os _mocks_,
_stubs_, _spies_, etc.

## Don't mock me

![Entram os dublês!](/media/dubles.jpg "Entram os dublês!")

Vamos abrir um parênteses aqui para esclarecer o conceito de "mock".
Na [documentação da biblioteca de _mock_ do _Python_][11], temos a seguinte
(e incrivelmente sucinta) definição:

> A “mock object” is an object used to replace a real one in a system under test.

Ou, [nas palavras de _Martin Fowler_][12]:

> (...) objetos pré-programados com informações que formam uma especificação das chamadas que esperam receber.

O termo _mock_ faz parte de um conceito mais genérico, conhecido por
_Test Double_. Segundo _Fowler_, esse termo é usado para qualquer objeto que
tem por finalidade, em um teste, substituir um objeto real.

Logo, quando em _Esportes1_ consumimos um recurso externo, "mentimos" para o
sistema. Além do **Mock**, existem outros dublês que nos ajudam nessa tarefa:

- **Dummy:** Objetos com o propósito apenas de "ocupar espaço", geralmente usados em passagens de parâmetros;
- **Fake:** Objetos funcionais, mas inadequados para um ambiente de produção;
- **Stubs:** Providenciam respostas pré-configuradas, e normalmente não respondem a nada que não esteja programado para o teste;
- **Spies:** Você pega um objeto real, substituindo o comportamento apenas de alguns métodos.

O _InfoQ_ possui um artigo do _Martin Fowler_, [traduzido para o Português][13],
onde ele conceitua bem os diferentes tipos de dublês, principalmente o _mock_
e _stub_. Vale a leitura.

Na segunda parte deste _post_, utilizaremos cada conceito de forma prática, e
discutiremos um pouco mais sobre o grande dilema: Mockar ou não mockar.

Até a próxima.

## Referências

- [_Info Q_ - _Mocks_ não são _Stubs_][14]
- [_Mock_ - _Mocking and Testing Library_][15]
- [_Mockito_ - _Spying on real objects_][16]

[1]: https://www.google.com.br/search?q=dubl%C3%AAs&espv=2&source=lnms&tbm=isch&sa=X&ei=XdqUU6vyKObNsQTRu4LIAw&ved=0CAYQ_AUoAQ&biw=1280&bih=679#q=dubl%C3%AAs&tbm=isch&facrc=_&imgdii=_&imgrc=pIbz_VLyYhxmlM%253A;XaNKs1NCAAhFWM;http%253A%252F%252F1.bp.blogspot.com%252F-JpaEE9vTvH4%252FUciulNGAm1I%252FAAAAAAAACWs%252FL1UXMgKPlWQ%252Fs1600%252FO-Espetacular-Homem-Aranha-2.jpg;http%253A%252F%252Fwww.ovocomcaviar.com%252F2013%252F06%252Fo-espetacular-homem-aranha-2-garfield-e.html;675;900
[2]: http://martinfowler.com/articles/is-tdd-dead/ "Is TDD dead?"
[3]: /tag/testes.html "Leia mais sobre testes"
[4]: http://globo.com "Absolutamente tudo sobre notícias, esportes e entretenimento"
[5]: http://twitter.com/rafael_mws "Siga o Cabra no Twitter"
[6]: https://twitter.com/romulojales "Siga o Rômulo"
[7]: /tag/tdd.html "Leia mais sobre TDD"
[8]: /tag/bdd.html "Leia mais sobre BDD"
[9]: /tag/memcached.html "Leia mais sobre Memcached"
[10]: https://docs.djangoproject.com/en/dev/topics/testing/tools/ "Testing Tools"
[11]: http://www.voidspace.org.uk/python/mock/#terminology "Biblioteca de mock do Python"
[12]: http://www.infoq.com/br/articles/mocks-Arent-Stubs "A diferença entre Mocks e Stubs"
[13]: http://www.infoq.com/br/articles/mocks-Arent-Stubs "Mocks não são Stubs"
[14]: http://www.infoq.com/br/articles/mocks-Arent-Stubs "Leia o artigo do Martin Fowler, traduzido para pt-BR"
[15]: http://www.voidspace.org.uk/python/mock/#terminology "Leia sobre a terminologia usada pela lib mock"
[16]: http://docs.mockito.googlecode.com/hg/latest/org/mockito/Mockito.html#13 "Definição de Spies pela Mockito"
