title: Análise assintótica
date: 2018-11-09 16:34:00
category: desenvolvimento
tags: desenvolvimento, estrutura-de-dados, algoritmos
slug: analise-assintotica

{% img representative-image /images/blog/algoritmos.jpg 180 180 Algoritmos %}

Esse *post* foi originalmente escrito para o [*Profissionais TI*](https://www.profissionaisti.com.br/2016/10/analise-de-algoritmos-analise-assintotica/ "Análise de algoritmos: Análise Assintótica").

Devo confessar que durante a minha graduação, nunca prestei muita atenção na
parte mais “teórica” da computação. O que eu queria era sentar e “codar”,
sem realmente me preocupar com algoritmos, estruturas de dados, ou com os
impactos que a minha solução ocasionaria em um determinado ambiente.

<!-- PELICAN_END_SUMMARY -->

Com a idade vem a experiência, e com a experiência vem a necessidade de
estressar diferentes pontos de vista antes de adotar solução X ou Y. Foi
a partir dessa necessidade que fui obrigado a revisitar alguns conceitos
básicos da Ciência da Computação, e fatalmente me senti motivado a compilar
esse conhecimento em uma série de artigos.

Se você, assim como eu, deu aquela dormida nas aulas de Teoria da Complexidade
Computacional, junte-se a mim e vamos relembrar esses conceitos juntos.

## Algoritmos e tempos de execução

Segundo o *Wikipedia*, um [Algoritmo](https://pt.wikipedia.org/wiki/Algoritmo "Leia mais sobre no Wikipedia") é:

> (…) uma sequência finita de instruções bem definidas e não ambíguas,
> cada uma das quais devendo ser executadas mecânica ou eletronicamente
> em um intervalo de tempo finito e com uma quantidade de esforço finita.

A sua aplicação pode ser composta por uma porção de algoritmos, cada um
destinado a um fim muito específico. Por exemplo, você pode ter um algoritmo
responsável por encontrar todos os pedidos vendidos no último mês, que contenham
um determinado produto. Com o advento do Big Data, inúmeros algoritmos são
postos em prática para mineração e análise de dados, então, mesmo que exista
uma aplicação ou serviço resolvendo esses problemas para você, acredite...
os algoritmos estarão lá.

Um determinado algoritmo pode ter tempos de execução relativamente diferentes
de acordo com o ambiente no qual ele esteja rodando. Se for num computador
*Core i7* e *16GB* de *RAM*, é possível assumirmos que ele rodará consideravelmente
melhor do que se estivesse operando em um *Raspberry Pi*, por exemplo. Ainda há um
segundo cenário onde, talvez você tenha escrito o algoritmo perfeito em
[*Python*]({tag}python "Leia mais sobre Python") ou *Ruby*, mas ele corre o risco de
executar de forma mais lenta que um algoritmo em *Assembly* ou *C*.

Partindo da premissa que um bom algoritmo é um conjunto de operações que resolvem
um problema em tempo e esforço atrativos, como podemos classificar se um algoritmo
é “rápido” ou não?

É aí que entra a análise assintótica.

## A Análise Assintótica

Segundo o *Wikibooks*, a [análise assintótica](https://en.wikibooks.org/wiki/Data_Structures/Asymptotic_Notation "Leia mais sobre no Wikibooks") é:

> (…) a way of expressing the main component of the cost of an algorithm,
> using idealized (not comparable) units of computational work.

Em termos mais práticos, é uma forma de julgarmos se o nosso algoritmo é
eficiente, independente dos “recursos que o cercam” (como velocidade de
processamento, quantidade de memória, latência de rede, etc).

{% img align-center-keep-size /images/blog/matrix-view.gif 497 377 Análise assintótica é ver o algoritmo além do código, como o Neo em The Matrix (scifi.stackexchange.com) %}

Removendo todas as variáveis que podem influenciar no tempo de execução,
focamos nossas atenções em como o algoritmo está escrito, em qual é a sua
entrada, e se “ele por si” é a maneira mais eficiente para a resolução de
um determinado problema.

Vale reforçar que a entrada é um fator de extrema importância no que tange
a análise assintótica. A análise é “input bound”, ou seja, a entrada
influenciará diretamente no resultado do estudo. Por exemplo, quando
ordenamos um vetor de tamanho `n`, utilizando o algoritmo *Selection Sort*,
teremos um tempo de execução de `n²` (já que o algoritmo pega um número,
e compara com os demais números no vetor, repetindo essa operação até chegar
ao fim do dado estruturado).

Ao fim da análise, podemos chegar a 2 conclusões diferentes: Melhor cenário
e pior cenário.

## Big O, Big Omega e Big Theta

Quem trabalha com desenvolvimento (ou até mesmo com computação num geral),
já deve ter ouvido falar sobre o famigerado *Big O Notation*. Ele é uma notação
assintótica muito famosa na análise de tempos de execução de algoritmos. O que
pode ser uma surpresa é que ele não é a única notação que temos disponível:

* **O(n)**: Expressa o limite superior do tempo de execução de um algoritmo (pior cenário);
* **Ω(n)**: Expressa o limite inferior do tempo de execução de um algoritmo (melhor cenário);
* **Θ(n)**: Expressa limite superior e inferior do tempo de execução de um algoritmo (pior e melhor cenário).

Além da expressão linear, temos outras notações que descrevem diferentes tempos
de execução:

* **O(1)**: Constante
* **O(log n)**: Logarítmica
* **O(n)**: Linear
* **O(n log n)**: “Linearithmic” (maior que linear, menor que quadrática)
* **O(n²)**: Quadrática
* **O(n³)**: Cúbica
* **n<sup>O(1)</sup>**: Polinomial
* **2<sup>O(n)</sup>**: Exponencial

De maneira simplista, `n` pode ser considerado como o número de operações que o
algoritmo leva para chegar ao seu final. `n` está intimamente ligado com a entrada
do seu algoritmo, onde quanto maior for o seu número, maior será o seu tempo de
execução.

E como fazemos para contar o número de operações realizadas por um algoritmo?

## Um pouquinho de prática

Voltando a citar o *Selection Sort*, que trata-se de um “greedy algorithm” para
ordenação de números em um vetor, temos a seguinte sequencia de operações:

    for i from 1 to n-1 {
        Encontre um elemento menor que a i-ésima posição, entre as n entradas.
        Troque o elemento encontrado com a i-ésima entrada.
    }

Fazendo um pequeno [teste de mesa](http://pt.slideshare.net/henriquecarmona/aula-4-teste-de-mesa "Veja mais no Slideshare"),
com o vetor (9, 2, 5, 7, 4, 8), temos o seguinte conjunto de procedimentos:

1. `[9, 2, 5, 7, 4, 8]`:
    * `i=1`;
    * Encontre o menor número entre posições 1 e 6;
    * Troque `array[i]` com `array[2]`.
2. `[2, 9, 5, 7, 4, 8]`:
    * `i=2`;
    * Encontre o menor número entre posições 2 e 6;
    * Troque `array[i]` com `array[5]`.
3. `[2, 4, 5, 7, 9, 8]`:
    * `i=3`;
    * Encontre o menor número entre posições 3 e 6;
    * Troque `array[i]` com `array[3]`.
4. `[2, 4, 5, 7, 9, 8]`:
    * `i=4`;
    * Encontre o menor número entre posições 4 e 6;
    * Troque `array[i]` com `array[4]`.
5. `[2, 4, 5, 7, 9, 8]`:
    * `i=5`;
    * Encontre o menor número entre posições 5 e 6;
    * Troque `array[i]` com `array[5]`.
6. `[2, 4, 5, 7, 8, 9]`:
    * `i=6`;
    * Fim do laço.

Podemos separar a análise em 3 grupos:

* Tempo de execução para encontrar o menor elemento
* Tempo de execução para trocar de elemento
* Tempo de execução do laço

Embora seja possível fazer uma análise detalhada, levando em consideração
o número de passos dentro de uma operação de swap de valores, e a aritmética
envolvendo as `n-i-1` chamadas que ocorrem dentro da função
“Encontre o menor número entre posições”, para fins didáticos vamos adotar
uma abordagem superficial.

Selecionar o menor elemento no *array* e fazer o *swap* para a primeira
posição requer passar por todos os `n-1` elementos. Encontrar o próximo
menor elemento requer analisar os `n-1` elementos restantes. Com dois
for aninhados, executando em ordem `n`, já podemos esperar uma execução
em `O(n²)`. É possível usar a [progressão aritmética](https://en.wikipedia.org/wiki/Arithmetic_progression "Leia mais sobre")
para comprovar essa hipótese:

    (n − 1) + (n − 2) + ... + 2 + 1 = n(n - 1) / 2 ∈ Θ(n²)

Se revisarmos o algoritmo apresentado, é possível reparar que o
*Selection Sort* tem no seu melhor e pior cenário o tempo de execução de
`n²`, logo, podendo ser classificado como `Θ(n²)`.

Nos próximos posts vamos nos aprofundar um pouco mais nos detalhes dessa
análise, e passar por alguns algoritmos úteis e muito comuns na nossa rotina.

Até a próxima!

## Referências

* [Análise do Selection Sort – Khan Academy](https://pt.khanacademy.org/computing/computer-science/algorithms/sorting-algorithms/a/analysis-of-selection-sort)
* [Justin Abrahms – Big-O is easy to calculate, if you know how](https://justin.abrah.ms/computer-science/how-to-calculate-big-o.html)
* [National Technical University of Athens – A gentle introduction to Algorithm Complexity Analysis](http://discrete.gr/complexity/)
* [Perl Monks – Big-O Notation: What’s is it good for?](http://www.perlmonks.org/?node_id=573138)
* [Tutorials Point – Data Structures Asymptotic Analysis](http://www.tutorialspoint.com/data_structures_algorithms/asymptotic_analysis.htm)
* [Wikibooks – Data Structures/Asymptotic Notation](https://en.wikibooks.org/wiki/Data_Structures/Asymptotic_Notation)
* [Wikipedia – Algoritmo](https://pt.wikipedia.org/wiki/Algoritmo)
