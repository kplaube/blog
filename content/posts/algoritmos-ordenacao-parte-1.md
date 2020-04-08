---
title: Algoritmos de ordenação - Parte 1
date: 2019-05-10 10:45:00
tags: ["estrutura-de-dados", "ordenacao", "algoritmos"]
slug: algoritmos-de-ordenacao-parte-1
thumbnail: ./images/algoritmos-ordernacao.jpeg
---

Voltamos a falar sobre [algoritmos](/tag/algoritmos.html "Leia mais sobre Algoritmos"), e
dessa vez o tópico é sobre ordenação de elementos. As linguagens de programação abstraem
toda a complexidade envolvida para nós, mas mais que fundamental, compreender como tais algoritmos funcionam é mais um passo
adiante no aprendizado das Ciências da Computação.

## Definição

Algoritmos de ordenação (ou _Sorting Algorithms_) podem ser [definidos como](https://brilliant.org/wiki/sorting-algorithms/ "Sorting Algorithms no Brilliant"):

> (...) an algorithm made up of a series of instructions that takes an array as input, performs specified operations on the array, sometimes called a list, and outputs a sorted array. (...) There are many factors to consider when choosing a sorting algorithm to use.

Resumidamente, é o tipo de algoritmo que tem por entrada um _array_ e organiza os seus items seguindo uma ordem. Um fator a se considerar é que, as dimensões do _array_, e as limitações de espaço, podem influenciar na escolha do algoritmo que será utilizado.

## Bubble sort

O _Bubble sort_ é a escolha mais comum quando começamos a estudar sobre algoritmos e ordenação, por sua simplicidade e por dar uma ideia geral sobre como funcionam tais algoritmos.

![Passos do Bubble sort (wikipedia.org)](./images/algoritmos-bubble-sort.gif)

Os passos são os seguintes:

1. Compare `A[0]` e `A[1]`. Se `A[0]` for maior que `A[1]`, troque os elementos;
2. Vá para `A[1]`. Se `A[1]` for maior que `A[2]`, troque os elementos; Repita o processo para cada par de elementos até o final do _array_;
3. Repita os passos `1` e `2` `n` vezes.

E é daí que vem seu nome: Pegue o valor mais alto, e "bubble it up" até o fim do _array_.

Abaixo o algoritmo representado em código _Python_:

```python
def bubble_sort(array):
    """
    Teste de mesa
    -------------

    array = []:
        - `i` é `-1`, não cai no laço `while` e retorna array sem modificações

    array = [1]:
        - `i` é `0`, não cai no laço `while` e retorna array sem modificações

    array = [1, 2]:
        - `i` é `1`, entra no laço `while`
        - `range(1)` resulta em `[0]`
        - `j` é `0`. `j[0]` é menor que `j[1]`. Não faz swap
        - Sai do laço `for`
        - `i` é `0`. Sai do laço `while`
        - Retorna array sem modificações

    array = [3, 1, 2, 4]:
        - `i` é `3`, entra no laço `while`
        - `range(3)` resulta em `[0, 1, 2]`
        - `j` é `0`. `j[0]` é maior que `j[1]`. Faz swap
        - `array` fica [1, 3, 2, 4]
        - `j` é `1`. `j[1]` é maior que `j[2]`. Faz swap
        - `array` fica [1, 2, 3, 4]
        - `j` é `2`. `j[2]` é menor que `j[3]`. Não faz swap
        - Sai do laço `for`
        - `i` é `2`, entra no laço `for [0, 1]`. Itens estão ordenados. Não faz swap
        - Sai do laço `for`
        - `i` é `1`, entra no laço `for [0]`. Itens estão ordenados. Não faz swap
        - `i` é `0`. Sai do laço `while`
        - Retorna array ordenado
    """
    def swap(i, j):
        array[i], array[j] = array[j], array[i]

    i = len(array) - 1
    while i >= 0:
        for j in range(i):
            if array[j] > array[j + 1]:
                swap(i, j)
        i -= 1

    # Ao alterar o array in-place, não há reais motivos para retorná-lo
    return array
```

- _Running-time complexity_: Para cada elemento do _array_, o algoritmo faz `n - 1` comparações. Considerando que ele percorre todo o array fazendo `n - 1` comparações, em [_big O notation_](/2018/11/09/analise-assintotica.html "Análise assintótica") temos `O(n^2)`.
- _Space complexity_: Como operamos a troca de elementos (`swap`), não precisamos de nenhuma outra estrutura de dados para armazenar o resultado da operação, com isso, temos complexidade de espaço de `O(1)`.

## Selection sort

Outro algoritmo simples e intuitivo, e [ligeiramente mais performático](https://www.quora.com/Which-is-faster-selection-sort-or-bubble-sort "Which is faster: selection sort or bubble sort?"), é o _Selection sort_.

![Passos do Selection Sort (wikipedia.org)](./images/algoritmos-selection-sort.gif)

Os passos podem ser resumidos em:

1. Encontre o menor valor;
2. Troque o menor valor com o primeiro item do _array_;
3. Encontre o segundo menor valor;
4. Troque o segundo menor valor com o segundo item do _array_;
5. Repita a operação até o _array_ estar ordenado.

![Image do filme MadMax](./images/mad-max-ordem.jpeg "Um mundo sem ordem é um mundo infeliz (tasteofcinema.com)")

No algoritmo anterior tínhamos como finalidade mover o maior valor para o final do _array_. Nesse, a finalidade é selecionar o valor mais baixo no _array_, e movê-lo para o começo da estrutura.

```python
def selection_sort(array):
    """
    Teste de mesa
    -------------

    array = []:
        - `len(array)` é `0`, não cai no primeiro no laço `for` e retorna array sem modificações

    array = [1]:
        - `len(array)` é `1`, entra no primeiro laço `for`
        - `min_index` é `0`, não entra no segundo laço
        - Retorna array sem modificações

    array = [1, 2]:
        - `len(array)` é `2`, entra no primeiro laço `for`
        - `i` é `0` e `min_index` é `0`. Entra no segundo laço `for`
        - `j` é `1`. `array[0]` não é maior que `array[1]`
        - Sai do segundo laço `for`
        - Faz swap `0` (`i`) e `0` (`min_index`)
        - Retorna array sem modificações

    array = [3, 1, 2, 4]:
        - `len(array)` é `4`, entra no primeiro laço `for`
        - `i` é `0` e `min_index` é `0`. Entra no segundo laço `for`
        - `j` é `1`. `array[0]` é maior que `array[1]`
        - `min_index` é `1`
        - `j` é `2`. `array[1]` não é maior que `array[2]`
        - `j` é `3`. `array[1]` não é maior que `array[3]`
        - Sai do segundo laço `for`
        - Faz swap `0` (`i`) e `1` (`min_index`)
        - `array` fica [1, 3, 2, 4]
        - `i` é `1` e `min_index` é `1`. Entra no segundo laço `for`
        - `j` é `2`. `array[1]` é maior que `array[2]`
        - `min_index` é `2`
        - `j` é `3`. `array[2]` não é maior que `array[3]`
        - Sai do segundo laço `for`
        - Faz swap `1` (`i`) e `2` (`min_index`)
        - `array` fica [1, 2, 3, 4]
        - `i` é `2` e `min_index` é `2`. Entra no segundo laço `for`
        - `j` é `3`. `array[2]` não é maior que `array[3]`
        - Sai do segundo laço `for`
        - Faz swap `2` (`i`) e `2` (`min_index`)
        - `i` é `3` e `min_index` é `3`. Não entra no segundo laço `for`
        - Faz swap `3` (`i`) e `3` (`min_index`)
        - Sai do primeiro laço `for`
        - Retorna array ordenado
    """
    def swap(i, j):
        array[i], array[j] = array[j], array[i

    for i in range(len(array)):
        min_index = i
        for j in range(i + 1, len(array)):
            if array[min_index] > array[j]:
                min_index = j

        swap(i, min_index)

    # Ao alterar o array in-place, não há reais motivos para retorná-lo
    return array
```

- _Running-time complexity_: Ao percebermos os dois _loops_ alinhados, percorrendo a dimensão do _array_ cada, podemos concluir que a complexidade é de `O(n^2)`.
- _Space complexity_: Como operamos a troca de elementos (`swap`), não precisamos de nenhuma outra estrutura de dados para armazenar o resultado da operação, com isso, temos complexidade de espaço de `O(1)`.

## Insertion sort

Para finalizar essa primeira parte do artigo, apresentamos o _Insertion sort_.

![Passos do Insertion sort (wikipedia.org)](./images/algoritmos-insertion-sort.gif)

Embora ele se compare aos dois algoritmos acima em _running time_, na minha opinião, imaginar o seu funcionamento demanda um pouquinho mais de esforço. Nesse algoritmo, o propósito é achar o lugar onde o elemento deveria estar no _array_:

1. Para cada elemento `A[i]`;
2. Se `A[i] > A[i + 1]`;
3. Troque os elementos até `A[i] <= A[i + 1]`.

Abaixo a implementação em _Python_:

```python
def insertion_sort(array):
    """
    Teste de mesa
    -------------

    array = []:
        - `len(array)` é `0`, não cai no laço `for` e retorno array sem modificações

    array = [1]:
        - `len(array)` é `1`, mas `range(1, len(array))` resulta em `[]`
        - Retorna array sem modificações

    array = [1, 2]:
        - `len(array)` é `2`, entra no laço `for`
        - `slot` é `1`. `value` é `2` e `test_slot` é `0`
        - `test_slot` é maior que `-1`, mas `array[0]` não é maior que `2`
        - `array[1]` recebe `2` (mesmo valor)
        - Retorna array sem modificações

    array = [3, 1, 2, 4]:
        - `len(array)` é `4`, entra no laço `for`
        - `slot` é `1`, `value` é `1` e `test_slot` é `0`
        - `test_slot` é maior que `-1` e `array[0]` é maior que `1`. Entra no laço `while`
        - `array[1]` recebe `array[0]`
        - `test_slot` é `-1`
        - `array` fica [3, 3, 2, 4]
        - `test_slot` não é maior que `-1`. Sai do laço `while`
        - `array[0]` recebe `1`
        - `array` fica [1, 3, 2, 4]
        - `slot` é `2`, `value` é `2` e `test_slot` é `1`
        - `test_slot` é maior que `-1` e `array[1]` é maior que `2`. Entra no laço `while`
        - `array[2]` recebe `3`
        - `test_slot` é `0`
        - `array` fica [1, 3, 3, 4]
        - `test_slot` é maior que `-1`, mas `array[0]` não é maior que `2`. Sai do laço `while`
        - `array[1]` recebe `2`
        - `array` fica [1, 2, 3, 4]
        - `slot` é `3`, `value` é `4` e `test_slot` é `2`
        - `test_slot` é maior que `-1`, mas `array[2]` não é maior que `4`. Não entra no laço `while`
        - `array[3]` recebe `4` (mesmo valor). Sai do laço `for`
        - Retorna array ordenado
    """

    for slot in range(1, len(array)):
        value = array[slot]
        test_slot = slot - 1

        while test_slot > -1 and array[test_slot] > value:
            array[test_slot + 1] = array[test_slot]
            test_slot = test_slot - 1

        array[test_slot + 1] = value

    # Ao alterar o array in-place, não há reais motivos para retorná-lo
    return array
```

- _Running-time complexity_: No melhor cenário, o algoritmo terá complexidade `O(n)`. O mesmo apresenta complexidade `O(n^2)` como pior cenário.
- _Space complexity_: Como operamos a troca de elementos (`swap`), não precisamos de nenhuma outra estrutura de dados para armazenar o resultado da operação, com isso, temos complexidade de espaço de `O(1)`.

## Considerações finais

Os algoritmos listados nesse artigo não possuem performance atrativa, mas são a escolha perfeita para introduzir o conceito de algoritmos e ordenação de elementos. E por mais que você sinta-se tentado a defender a ótima característica de _space complexity_ que eles possuem, ainda assim há soluções mais práticas para os problemas de ordenação do cotidiano.

Nos próximos artigos vamos explorar algumas delas, como o _Merge_ e _Quicksort_.

## Referências

- [Brilliant - Bubble sort](https://brilliant.org/wiki/bubble-sort/)
- [Brilliant - Insertion sort](https://brilliant.org/wiki/insertion/)
- [Brilliant - Sorting Algorithms](https://brilliant.org/wiki/sorting-algorithms/)
- [GeeksForGeeks - Selection sort](https://www.geeksforgeeks.org/selection-sort/)
- [George Seif - A tour of the top 5 sorting algorithms with Python code](https://medium.com/@george.seif94/a-tour-of-the-top-5-sorting-algorithms-with-python-code-43ea9aa02889)
- [Khan Academy - Selection sort](https://www.khanacademy.org/computing/computer-science/algorithms/sorting-algorithms/a/selection-sort-pseudocode)
- [Victor S. Adamchick - Sorting](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Sorting%20Algorithms/sorting.html)
- [Wikipedia - Bubble sort](https://en.wikipedia.org/wiki/Bubble_sort)
- [Wikipedia - Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort)
