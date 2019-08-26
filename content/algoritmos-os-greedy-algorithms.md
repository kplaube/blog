Title: Os Greedy algorithms
Date: 2019-01-27 15:28:00
Category: desenvolvimento
Tags: desenvolvimento, estrutura-de-dados, algoritmos
Slug: os-greedy-algorithms

{% img representative-image /images/blog/algoritmos-3.png 180 180 Algoritmos %}

Quando estive revisando a disciplina de [algoritmos]({tag}algoritmos "Leia mais sobre Algoritmos"), me deparei com os tais "algoritmos gulosos", ou _greedy algorithms_. Lembro que na época eu automaticamente associei o termo a soluções de baixa utilidade ou performance. Mal sabia eu que estive equivocado esse tempo todo.

<!-- PELICAN_END_SUMMARY -->

Os _greedy algorithms_ são fundamentais nos estudos de algoritmos e otimizações, não à toa o mundo acadêmico faz questão de mencioná-los em uma variedade de cursos de algoritmos ou de computação. Mas algumas definições podem passar uma ideia equivocada sobre o que eles realmente são, e do que são capazes.

## Definição

Embora a _Wikipedia_ possua uma definição interessante sobre o assunto, foi no _GeeksforGeeks_ que [encontrei uma passagem bem esclarecedora](https://www.geeksforgeeks.org/greedy-algorithms/ "Greedy Algorithms"):

> Greedy is an algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit. So the problems where choosing locally optimal also leads to global solution are best fit for Greedy.

O _Paulo Feofiloff_ vai além em ["Algoritmos gulosos"](https://www.ime.usp.br/~pf/analise_de_algoritmos/aulas/guloso.html "USP - Algoritmos gulosos"):

> Para resolver um problema, um algoritmo guloso escolhe, em cada iteração, o objeto mais apetitoso que vê pela frente. (...) Um algoritmo guloso é míope: ele toma decisões com base nas informações disponíveis na iteração corrente, sem olhar as consequências que essas decisões terão no futuro. Um algoritmo guloso jamais se arrepende ou volta atrás: as escolhas que faz em cada iteração são definitivas.

A estratégia gulosa tem por abordagem encontrar a melhor resposta para cada passo, sem se importar em resolver esse passo novamente ou com os passos seguintes, esperando como consequência um resultado global ótimo. Acabamos por ter algoritmos mais simples e intuitivos em grande parte dos casos, mas não necessariamente apresentando a melhor resposta.

{% img align-center-keep-size /images/blog/greedy-boo.jpg 750 422 Algoritmos gulosos são como o Maijin Boo. Gulosos em essência, mas nem por isso não eficazes (tvovermind.com) %}

As propriedades desse paradigma podem lembrar outras formas de escrever algoritmos, portanto, é importante saber diferenciá-lo.

### Greedy não é brute-force

É bom deixar claro que um algoritmo guloso não é um algoritmo de força bruta:

- _Greedy_ significa que o algoritmo, a cada passo, seleciona a melhor opção para aquele passo;
- _Brute-force_ significa que o algoritmo seleciona uma opção de uma maneira mais simples, óbvia ou direta. E que repete essa tentativa até encontrar o resultado esperado.

### Greedy não é naive

Essa talvez tenha sido a origem da minha confusão. _Naive algorithms_ são de certa forma o primeiro passo para quando você está tentando resolver um problema complexo: Primeiro faça funcionar, depois faça melhor.

Em uma abordagem _naive_, não estamos necessariamente tentando resolver cada passo com a melhor opção possível, e sim tentando resolver o todo de maneira ingênua, sem nenhuma estrutura de dados rebuscada ou cálculo preparatório, e sem se preocupar com a performance do algoritmo em si.

### Naive vs. Brute-force vs. Greedy

Uma maneira mais interessante de compreender como escrevemos um algoritmo com essas diferentes práticas é através do [_Knapsack Problem_](https://en.wikipedia.org/wiki/Knapsack_problem "Leia o artigo na Wikipedia"). Nesse famoso problema temos um conjunto de itens, cada qual com seu determinado `peso` e `valor`, e temos por desafio colocar o maior valor possível dentro de uma mochila com um determinado limite de peso.

- Um exemplo do método _naive_ seria pegarmos os itens mais leves e colocarmos na bolsa até não haver mais espaço;
- Com _brute-force_, testaríamos todas as combinações de itens até chegar ao valor máximo para o limite de peso da bolsa;
- Já com o paradigma _greedy_, por intuição, pegaríamos primeiro os itens mais valiosos, até atingirmos o peso total da bolsa.

Todas as três formas chegam a um resultado. É possível afirmar que a primeira e última opção terão performance semelhantes, mas não necessariamente chegarão a um resultado ótimo. Encontrar o melhor resultado através da forma bruta, nesse problema, não é a melhor solução.

## Qual o melhor uso de Greedy Algorithms?

Segundo o _Brilliant.org_, se as propriedades abaixo forem verdadeiras, pode-se aplicar a abordagem _greedy_ para resolução do problema:

- Uma solução global ótima pode ser atingida ao escolher a opção ótima de cada passo;
- Um problema tem uma subestrutura ótima se uma solução ótima para o problema global conter as soluções ótimas para os sub-problemas.

Em outras palavras:

> (...) greedy algorithms work on problems for which it is true that, at every step, there is a choice that is optimal for the problem up to that step, and after the last step, the algorithm produces the optimal solution of the complete problem.

Algoritmos como [_Huffman Code_](https://brilliant.org/wiki/huffman-encoding/ "Leia mais no Brilliant") e [_Dijkstra's Shortest Path_](https://brilliant.org/wiki/dijkstras-short-path-finder/ "Leia mais no Brilliant") são _greedy algorithms_ famosos que cumprem muito bem o seu papel. O _GeeksforGeeks_ lista [uma porção de outros algoritmos e problemas que utilizam o paradigma com sucesso](https://www.geeksforgeeks.org/greedy-algorithms/ "Leia mais no GeeksforGeeks"). Um muito comum em entrevistas de emprego é o [_Minimum Swaps for Bracket Balancing_](https://www.geeksforgeeks.org/minimum-swaps-bracket-balancing/ "Leia no GeeksforGeeks").

## Considerações finais

Compreendendo a diferença entre um _greedy_ e um _naive algorithm_, fica mais fácil entender quando utilizar uma técnica ou outra. Uma abordagem ingênua funciona bem quando estamos começando a construir o algoritmo que solucionará um problema. De forma iterativa podemos melhorá-lo, até chegar aos valores de performance desejados.

Uma abordagem _greedy_ pode trazer resultados satisfatórios para a sua solução, mas nem sempre trará o melhor resultado. Caso as propriedades listadas acima se apliquem ao algoritmo que você procura, sem dúvida nenhuma é uma técnica que, além de lhe ajudar a escrever um solução mais intuitiva, te trará os resultados esperados.

Se você ficou curioso sobre como resolver o _Knapsack Problem_ de forma ótima, há a opção de utilizar _Dynamic Programming_, outro paradigma que tem certa semelhança com _greedy algorithms_, e que vamos falar sobre em outro _post_. Uma alternativa mais simples e intuitiva (e _greedy_) é criar uma terceira variável que armazene `peso / valor` e utilize esse valor no processo de ordenação ([exemplo](https://github.com/kplaube/rosetta-lua/blob/master/rosetta/lib/knapsack.lua "Veja a resolução do problema em Lua")).

Até a próxima.

## Referências

- [Brilliant - Greedy algorithms](https://brilliant.org/wiki/greedy-algorithm/)
- [Data Structures and Algorithms with Object-Oriented Design Patterns in C++ - Brute-Force and Greedy Algorithms](https://book.huihoo.com/data-structures-and-algorithms-with-object-oriented-design-patterns-in-c++/html/page441.html)
- [GeeksforGeeks - Greedy algorithms](https://www.geeksforgeeks.org/greedy-algorithms/)
- [Smart Grid - Brute Force/Naive/Greedy algorithm](https://smart--grid.net/cours-lessons-theory/algorithm/brute-force-naive-greedy-algorithm/)
- [Stackoverflow - Why selection sort is not greedy?](https://stackoverflow.com/questions/47238823/why-selection-sort-is-not-greedy)
- [USP - Algoritmos gulosos](https://www.ime.usp.br/~pf/analise_de_algoritmos/aulas/guloso.html)
- [Wikipedia - Greedy algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm)
