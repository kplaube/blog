Title: Recursividade e o "dividir e conquistar"
Date: 2019-03-25 18:55:00
Category: desenvolvimento
Tags: desenvolvimento, estrutura-de-dados. algoritmos, recursividade, divide-and-conquer
Slug: recursividade-e-dividir-e-conquistar

{% img representative-image /images/blog/recursion.jpeg 180 180 Recursividade ilustrada %}

Sabe aquelas pessoas que têm problemas em determinar qual lado é o "esquerdo" e qual lado é o "direito"?
Admito, sem orgulho algum, que tenho o mesmo problema com recursividade. Meu cérebro simplesmente se embaralha,
e preciso fazer um grande esforço para imaginar o que está acontecendo.

<!-- PELICAN_END_SUMMARY -->

A boa notícia é que assim como usar a mão do relógio (ou a mão que você escreve) ajuda a determinar o que é esquerda e direita, é possível utilizar alguns padrões de escrita de código para ajudar a entender o que está acontecendo em um algoritmo com recursividade.

Mas como só a receita de bolo não basta... senta que lá vem história.

## Napoleão style!

O "Dividir e Conquistar" (ou _Divide and Conquer_), assim como os [_Greedy algorithms_]({filename}algoritmos-os-greedy-algorithms.md "Os Greedy algorithms"), é um paradigma para construção de algoritmos (_algorithmic paradigm_), onde a ideia é resolver um determinado problema utilizando três passos diferentes:

- Dividir: Quebre um determinado problema em subproblemas do mesmo tipo;
- Conquistar: Resolva esses subproblemas de forma recursiva;
- Combinar: Combine as respostas apropriadamente.

Algoritmos de ordenação famosos, como o _Quicksort_ e o _Merge Sort_, utilizam esse paradigma para apresentar soluções com performance ótima.

{% img align-center-keep-size /images/blog/divide-and-conquer-napoleon.jpg 600 300 Não! Não esse Napoleon... (youtube.com) %}

Compreender essa estrutura é um bom passo para dominar funções recursivas. Na verdade, a utilização de recursividade parte do princípio que você seja capaz de quebrar um grande problema em problemas menores (e semelhantes). No fim, os dois conceitos se completam e é difícil imaginar um sem o outro. O [_tutorialspoint_](https://www.tutorialspoint.com/data_structures_algorithms/divide_and_conquer.htm "Data Structures - Divide and Conquer") reforça essa idea:

> In divide and conquer approach, the problem in hand, is divided into smaller sub-problems and then each problem is solved independently. When we keep on dividing the subproblems into even smaller sub-problems, we may eventually reach a stage where no more division is possible. Those "atomic" smallest possible sub-problem (fractions) are solved. The solution of all sub-problems is finally merged in order to obtain the solution of an original problem.

Não será surpresa se vermos a mesma receita se repetir pelo resto desse _post_.

## Uma função que chama a si mesmo

O [_Wikibooks_](https://pt.wikibooks.org/wiki/Algoritmos_e_Estruturas_de_Dados/Recursividade "Algoritmos e Estruturas de Dados/Recursividade") explica de forma muito clara o que é recursividade:

> Recursão é um método de programação no qual uma função pode chamar a si mesma. O termo é usado de maneira mais geral para descrever o processo de repetição de um objeto de um jeito similar ao que já fora mostrado. Muitos problemas em computação tem a propriedade de que cada instância sua contém uma instância menor do mesmo problema.

Em termos mais práticos, é como se criássemos uma função para fatorar, e essa função chamasse a ela mesma:

```
FUNÇÃO fatorial(numero)
    RETORNE numero * fatorial(numero - 1)
FIM
```

Vamos fazer um rápido teste de mesa. Imagine que queremos saber o fatorial de 3:

- `fatorial(3)`: Retorna `3 * fatorial(2)`;
- `fatorial(2)`: Retorna `2 * fatorial(1)`;
- Por intuição (falaremos mais sobre esse passo a seguir), assumimos que `fatorial(1) == 1`.

A função chama a si mesma recursivamente em uma versão menor da entrada (`n - 1`), e multiplica o resultado por `numero`. Podemos visualizar o resultado desse comportamento ao fazer o caminho "de baixo para cima" na lista acima: `1 * 2 * 3 = 6`.

{% img align-center-keep-size /images/blog/recursion-russian-doll.png 740 416 Duas referências no mesmo post. Ousado! (mashable.com) %}

Roubamos no exemplo anterior, quando dissemos que por intuição sabemos o resultado da última etapa. "Intuição" não funciona do ponto de vista do algoritmo, e acabaríamos com um _loop_ infinito, uma vez que não informamos em qual momento a função tem que parar de chamar a si mesma. O caso acima, se executado em uma linguagem de programação, vai resultar no famoso [estouro de pilha](http://ptcomputador.com/P/computer-programming-languages/88738.html "O que é o estouro de pilha") (ou [_stack overflow_](https://pt.stackoverflow.com/questions/59135/erro-stackoverflow "Erro stack overflow no StackOverflow")).

Precisamos adicionar o que é conhecido por "caso base" (ou "condição de parada") ao algoritmo. É esse caso que vai determinar quando a função deve parar:

```
FUNÇÃO fatorial(numero)
    SE numero <= 1 ENTÃO
        RETORNE 1
    SENÃO
        RETORNE numero * fatorial(numero - 1)
FIM
```

Pronto! Podemos refazer o nosso teste de mesa:

- `fatorial(3)`: Retorna `3 * fatorial(2)`;
- `fatorial(2)`: Retorna `2 * fatorial(1)`;
- `fatorial(1)`: Retorna `1`.

É possível perceber uma estrutura que costuma se repetir em outros algoritmos que utilizam recursão:

- Um número limitado de casos base;
- Um caso recursivo;
- Uma chamada externa (ex.: `fatorial(3)`);
- Um conjunto de chamadas recursivas (ex.: `fatorial(3 - 1)`).

## Tail recursion

Voltando ao exemplo `fatorial(3)`, uma melhor leitura da ordem de chamada seria a seguinte:

- `fatorial(3)`
- `3 * fatorial(2)`
- `3 * (2 * fatorial(1))`
- `3 * (2 * (1))`

Cada linha cria um [_stack frame_](https://stackoverflow.com/questions/10057443/explain-the-concept-of-a-stack-frame-in-a-nutshell "Explain the concept of a stack frame in a nutshell"), que é empilhado de acordo com a ordem das chamadas. Ao fim da última chamada recursiva, os _frames_ são retirados gradativamente da pilha, como ilustrado no exemplo abaixo:

{% img align-center-keep-size /images/blog/javascript-stack-example.png 740 243 Exemplo de call stack em Javascript (thinkingincrowd.me) %}

Uma função recursiva é _tail recursive_ quando a chamada recursiva é a última coisa executada pela função. No nosso exemplo, temos uma função que aparentemente possui essa característica. Porém, não é certo dizer que ela possui de fato recursão de cauda, uma vez que temos que considerar que `fatorial(numero - 1)` é usado dentro de `fatorial(numero)`. O exemplo abaixo passa a ideia de que a chamada da função não é a última coisa executada no _frame_:

- Chamada inicial: `fatorial(3)`
- Frame 1: `3 * fatorial(2)`
- Frame 2: `3 * (2 * fatorial(1))`
- Frame 3: Atinge caso base em `fatorial(1)` e retorna `1`
- Frame 2: `3 * (2 * (1))`
- Frame 1: `3 * (2)`
- Retorno da chamada inicial: `6`

Segundo o [GeeksForGeeks](https://www.geeksforgeeks.org/tail-recursion/ "Tail Recursion"):

> Consider the (...) function to calculate factorial of n. It is a non-tail-recursive function. Although it looks like a tail recursive at first look. If we take a closer look, we can see that the value returned by fact(n-1) is used in fact(n), so the call to fact(n-1) is not the last thing done by fact(n)

É preciso fazer uma manutenção no corpo da função:

    FUNÇÃO fatorial-interna(numero, acumulador)
        SE numero == 0 ENTÃO
            RETORNE acumulador
        SENÃO
            RETORNE fatorial-interna(numero - 1, numero * acumulador)

    FUNÇÃO fatorial(numero)
        RETORNE fatorial-interna(numero, 1)
    FIM

Como resultado, teremos um _call stack_ diferente:

- Chamada inicial: `fatorial(3)`
- Frame 1: `fatorial-interna(3, 1)`
- Frame 2: `fatorial-interna(2, 3)`
- Frame 3: `fatorial-interna(1, 6)`
- Frame 4: Atinge caso base em `fatorial-interna(0, 6)` e retorna `6`
- Frame 3: Retorno de `6`
- Frame 2: Retorno de `6`
- Frame 1: Retorno de `6`
- Retorno da chamada inicial: `6`

Qual a real motivação em utilizar funções com recursão de cauda? Esse tipo de função pode ser otimizada pelo interpretador/compilador, portanto, o seu uso é encorajado em [linguagens que suportam essa funcionalidade](https://www.quora.com/Which-programming-languages-support-tail-recursion-optimization-out-of-the-box "
Which programming languages support tail recursion optimization out of the box?"). De forma bem resumida, uma vez que a chamada recursiva é o último "statement", não há nada mais para ser executado pela função corrente, podendo utilizar o mesmo _stack frame_, [minimizando o esforço de empilhar e desempilhar chamadas](https://www.geeksforgeeks.org/tail-call-elimination/ "Tail Call Elimination"):

- Chamada inicial: `fatorial(3)`
- Frame 1: `fatorial-interna(3, 1)`
- Frame 1: `fatorial-interna(2, 3)`
- Frame 1: `fatorial-interna(1, 6)`
- Frame 1: Atinge caso base em `fatorial-interna(0, 6)` e retorna `6`
- Retorno da chamada inicial: `6`

## Na prática

Vamos para uma abordagem mais prática, e para esse bloco, nada melhor que um dos desafios mais populares em entrevistas de emprego: Determinar se uma palavra é palíndromo.

Segundo o [TodaMatéria](https://www.todamateria.com.br/palindromo/ "Palíndromo"):

> Palíndromo, do grego palin (novo) e dromo (percurso), é toda palavra ou frase que pode ser lida de trás pra frente e que, independente da direção, mantém o seu sentido.

Vamos nos ater apenas à palavra. Utilizando a ideia de dividir e conquistar, é possível imaginar o seguinte algoritmo:

**Dividir:** Recebo determinada palavra, ou qualquer fração da mesma (exemplo: `arara`, `rar`, `a`).

**Conquistar:**

- Se a largura da palavra for igual a `1` (exemplo: `a`), é palíndromo. Esse é um caso base;
- Senão, se primeira e última letra da palavra forem diferentes (exemplo: `araro`), não é palíndromo. Esse é o segundo caso base;
- Senão, retiramos a primeira e última letra da palavra, e passamos a nova palavra como parâmetro recursivamente (exemplo: `rar`).

**Combinar:** O resultado do último caso base executado vai dizer se o parâmetro passado é palíndromo ou não.

Em [_Javascript_]({tag}javascript "Leia mais sobre Javascript"), podemos reproduzir as condições acima da seguinte forma:

```javascript
const isPalindrome = word => {
  // Caso base #1
  if (word.length <= 1) {
    return true;
  }

  // Caso base #2
  if (word.slice(0, 1) !== word.slice(-1)) {
    return false;
  }

  // Chamada recursiva
  return isPalindrome(str.slice(1, -1));
};
```

Acredito que deixando a chamada recursiva para o final, além de ser mais fácil de imaginar o problema e seus diferentes casos, "ganhamos" a característica de _tail recursion_.

## Considerações finais

Recursividade sempre é um assunto que demanda um pouco mais de energia na leitura de um código, principalmente se você (assim como eu) prefere a forma iterativa (com `for` ou `while` e utilizando uma `stack` como estrutura de dados), mas sem dúvida alguma que compreender o _divide and conquer_ e praticar uma forma mais estruturada de pensar facilita na compreensão de problemas com recursão.

Até a próxima.

## Referências

- [GeeksForGeeks - Divide and Conquer Algorithm. Introduction](https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/)
- [GeeksForGeeks - Tail recursion](https://www.geeksforgeeks.org/tail-recursion/)
- [Khan Academy - Recursividade](https://pt.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/recursion)
- [StackExchange - What is tail recursion?](https://cs.stackexchange.com/questions/6230/what-is-tail-recursion)
- [TutorialsPoint - Divide and Conquer](https://www.tutorialspoint.com/data_structures_algorithms/divide_and_conquer.htm)
- [Wikibooks - Algoritmos e Estruturas de Dados/Recursividade](https://pt.wikibooks.org/wiki/Algoritmos_e_Estruturas_de_Dados/Recursividade)
- [Wikipedia - Recursividade (ciência da computação)](<https://pt.wikipedia.org/wiki/Recursividade_(ci%C3%AAncia_da_computa%C3%A7%C3%A3o)>)
