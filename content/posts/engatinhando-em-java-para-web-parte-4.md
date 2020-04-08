---
title: "Engatinhando em Java para a web: Spring Boot"
date: 2020-05-20 05:25:00
tags: ["desenvolvimento-web", "java", "spring", "spring-boot"]
slug: engatinhando-em-java-web-spring-boot
thumbnail: ./images/spring-boot-project-logo.png
serie: "Engatinhando em Java para a web"
---

No [_post_ anterior](/2019/12/10/engatinhando-em-java-web-parte-3.html), finalizamos a introdução
a alguns aspectos utilizados pelo _Java EE_ para construção de aplicações _web_. Se você acompanhou
os artigos até aqui, e achou tudo muito doloroso, você não está sozinho.

Desenvolvedores, com o passar do tempo, ansiavam por alternativas menos burocráticas para
desenvolver suas soluções. E foi em 2003, seguindo essa premissa, que _Rob Johnson_ lançava a versão 1.0 do _Spring_.

## Antes do Boot. O que é Spring?

Como a maioria das coisas do mundo _Java_, a resposta para essa pergunta pode ser mais complicada do que parece.

Uma das definições da [documentação oficial](https://spring.io/why-spring) é a seguinte:

> Spring makes programming Java quicker, easier, and safer for everybody. Spring’s focus on speed, simplicity, and productivity has made it the world's most popular Java framework.

O _Spring_ começou como uma resposta à complexidade do _J2EE_. Atualmente ele deve ser compreendido
como um "complemento" à mesma, ou seja, a comunidade do _Spring_ de fato adota partes da especificação _Java EE_,
e com isso torna possível desenvolver aplicações "enterprise" com maior facilidade.

Flexibilidade, modularização, retrocompatibilidade, uma grande e ativa comunidade, e evolução contínua
(além da sua famosa [_Dependency Injection_](/2015/10/24/injecao-de-dependencia.html "DI explicada com Angular")),
fazem do _Spring_ um dos _frameworks_ _Java_ mais famosos do mercado.

Logo, como tantos outros _frameworks_ espalhados por aí, o propósito do _Spring_ é facilitar e acelerar o desenvolvimento, provendo
bibliotecas e ferramentas que te permitam focar no negócio. No entanto, quando falamos em "Spring",
provavelmente estamos falando de todo o seu ecossistema.

![Organograma do ecossistema Spring](./images/spring-hierarchy.png "Conheça a família Spring (pluralsight.com)")

Chegaremos no _Spring Boot_, mas antes, vamos por partes, como diria aquele famoso _serial killer_.

## O Spring Framework

A definição do _Spring_ como plataforma pode ser utilizada para compreender o _Spring_ como _framework_. Segundo
a [documentação oficial](https://spring.io/projects/spring-framework "Spring Framework documentation"):

> The Spring Framework provides a comprehensive programming and configuration model for modern Java-based enterprise applications - on any kind of deployment platform.

Uma de suas principais características é lidar com aspectos de aplicações _enterprise_,
para que desenvolvedores possam focar em lógica de negócio a nível de aplicação. Outros
benefícios podem ser resumidos em:

- Promove _loose coupling_;
- Oferece ferramentas que facilitam a escrita de testes;
- Diminui a quantidade de _boilerplate code_ para _singletons_ e _factories_;
- Suporta configuração via _XML_ e de forma programática via _annotations_.

Há outros fatores cruciais do _framework_, como o já citado _Dependency Injection_
(e _Inversion of Control_). Com tais características, e com a premissa de abordar diferentes áreas de uma aplicação, é inevitável que o _Spring_ torne-se
algo complexo.

Logo, o _framework_ é separado em seis "áreas fundamentais".

### 1: Core

![Organograma do Spring Framework mostrando suas seis áreas](./images/spring-core-hierarchy.png "Spring Core e sua relação com os demais módulos (pluralsight.com)")

O curso da _Pluralsight_, ["Spring: The Big Picture"](https://www.pluralsight.com/courses/spring-big-picture "Curso mais do que recomendado"), define o _Spring Core_ como:

> Spring Core is a dependency injection container.

Mais uma vez voltamos a citar _Dependency Injection_. E se esse _pattern_ ainda soa exotérico para você,
recomendo o ótimo ["A quick intro to Dependency Injection: what it is, and when to use it"](https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/ "Leia o artigo na íntegra"), do _freeCodeCamp_.

Além disso, é o módulo que fornece funcionalidades como _i18n_, validações, _data binding_, conversores, etc. De maneira geral, é a
"cola" e o fundamento de todo o _framework_.

### 2: Web

![Diagrama com requisição e resposta através do Spring MVC](./images/spring-mvc-request-response.png "Fluxo de requisições e respostas através do Spring MVC (pluralsight.com)")

O módulo _Spring Web_ é responsável por lidar com requisições _web_. Isso pode ser feito através de dois _frameworks_:

- **Spring Web MVC**: Que fornece ferramental para atender requisições e prover respostas através de _Servlets_;
- **Spring WebFlux**: A forma de fazer aplicações _web_ reativas (_non-blocking_) com _Java_ e _Spring_.

O primeiro é a forma mais comum de fazer _web_, já o segundo envolve conceitos de requisições não-bloqueantes, que
pretendo abordar melhor em _posts_ vindouros.

### 3: AOP

_AOP_ é acrônimo para o pomposo _Aspect-Oriented Programming_, que tem por finalidade
aumentar a modularidade ao permitir a separação de _cross-cutting concerns_.

Ou, como muito bem define a [_Wikipedia_](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_orientada_a_aspecto "Programação Orientada a Aspectos"):

> Em Ciência da Computação, programação orientada a aspectos ou POA, é um paradigma de programação de computadores, criado por Gregor Kiczales e equipe na Xerox PARC (divisão de pesquisa da empresa Xerox), que permite aos desenvolvedores de software organizar o código fonte de acordo com a importância de uso na aplicação e separar em módulos (separation of concerns). Em contrapartida aos programas escritos no paradigma orientado a objetos, que possui código alheio a implementação do comportamento do objeto; todo código utilizado para implementar funcionalidades secundárias e que se encontra espalhado por toda a aplicação (crosscutting concern). A POA permite que esse código seja encapsulado e modularizado.

E se ainda está complicado de compreender, imagine a necessidade de aplicar a checagem
de permissões por operações do usuário. É o tipo de responsabilidade que pode ficar
espalhada pela aplicação. Com _Spring AOP_ temos algo como abaixo:

```java
@PreAuthorize("hasRole('admin')")
public void sensitiveOperation() {
    ...
}
```

Os detalhes da implementação de segurança não interessam ao `sensitiveOperation`, assim
como o inverso.

### 4: Data

Com o _Spring Data_, interagir com dados fica muita mais simples. Abaixo, um exemplo
de `SELECT` utilizando _JDBC_ "na unha":

```java
// Exemplo de database query com JDBC

try {
    Statement stmnt = conn.createStatement();

    try {
        ResultSet rs = stmnt.executeQuery(
            "SELECT COUNT(*) FROM foo");

        try {
            rs.next();
            int cnt = rs.getInt(1);
        } finally {
            rs.close();
        }
    } finally {
        stmnt.close();
    }
} catch (SQLException e) {
    // handle error
} finally {
    try {
        conn.close();
    } catch (SQLException e) {
        // handle error
    }
}
```

Agora o mesmo ensaio, só que com _Spring Data_:

```java
int cnt = new JdbcTemplate(ds)
    .queryForInt("SELECT COUNT(*) FROM foo");
```

Nem preciso mencionar que gerenciar transações também fica muito mais simples:

```java
@Transactional
public void operation() {
    // 1 ou mais queries
}
```

Para finalizar, controle de erros e inclusive ferramental para testes automatizados,
são garantias fornecidas pelo _Spring Data_.

### 5: Integration

![Imagem com a afirmação: Integração é sobre fazer diferentes sistemas e aplicações funcionarem juntos](./images/spring-integration.png "Integração é sobre fazer diferentes sistemas e aplicações funcionarem juntos (pluralsight.com)")

A intenção do _Spring Integration_ é fazer com que sistemas se conversem. Não é só sobre expor suas soluções, mas também sobre consumir outros serviços.

Por exemplo, para criar um _endpoint_ _REST_, anotações como `RestController`
e `GetMapping` são ferramentas essenciais, fornecidas por esse módulo:

```java
@RestController
public class AccountController {

    @GetMapping("/account/{id}")
    public Account find(@PathVariable int id) {
        ...
    }
}
```

Outro companheiro fiel é o `RestTemplate`, que você pode
[ler mais aqui](https://www.baeldung.com/rest-template "The Guide to RestTemplate").

### 6: Testing

O _Dependency Injection_ é uma excelente ideia para garantir modularização e
diminuir as amarras do acoplamento.

Com o _Spring Testing_, utilizar [_mocks_, _stubs_ e _spies_](/2014/08/07/os-testes-e-os-dubles-parte-1.html "Os testes e os dublês"), como dependências
injetáveis, fica muito mais fácil. Testar unitariamente (ou até mesmo de forma integrada) a sua aplicação é algo
prático e factível.

## O Spring Boot

![Imagem com as dependências do spring-boot-starter-web](./images/spring-boot-starter-dependencies.png "Árvore de dependências do Spring Boot (journaldev.com)")

Ok. Finalmente! O que é o _Spring Boot_?

A documentação oficial [define da seguinte forma](https://spring.io/projects/spring-boot "Spring Boot documentation"):

> Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".
>
> We take an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss. Most Spring Boot applications need minimal Spring configuration.

Imagine que para utilizar o _Spring_, cada módulo descrito acima é uma dependência
que precisa ser instalada e configurada. E com isso, você vai ter uma porção de código
_boilerplate_ para executar o seu projeto.

Com _Spring Boot_, a biblioteca toma algumas decisões por você, configurando e declarando
quais dependências seu projeto utilizará. Assim, com o mínimo de esforço você consegue
ter a sua aplicação _web_ funcionando em tempo recorde. Com alguns outros agrados, como métricas,
_health check_, utilitários para _deployment_, etc.

Além do "auto-configuration", outro aspecto marcante do _Spring Boot_ é que
ele é _standalone_. Ou seja, toda aquela dança que tivemos com o _Tomcat_
nos _posts_ anteriores não é necessária aqui. O _Spring Boot_ "embeda"
o servidor _web_, e se encarrega disso para você.

É instalar e sair escrevendo código para o negócio, aos invés de
escrever código para o _framework_.

## Considerações finais

Esse _post_ foi completamente baseado no curso [_Spring: The Big Picture_](https://www.pluralsight.com/courses/spring-big-picture), da plataforma de ensino [_Pluralsight_](https://www.pluralsight.com/). Se você quiser dar os seus primeiros passos com _Java_
para _web_, utilizando _Spring_, esse curso é mais do que recomendado.

_Spring Boot_ é sem dúvida a maneira mais indolor de começar a desenvolver para a _web_
utilizando _Java_. Comece por ele, e vá customizando o conjunto de dependências e
configurações sempre que necessário.

[Escreva a sua primeira aplicação em _Spring Boot_ agora](https://spring.io/guides/gs/spring-boot/).

Até a próxima.

## Referências

- [Baeldung - A Comparison Between Spring and Spring Boot](https://www.baeldung.com/spring-vs-spring-boot)
- [DZone - Understanding the Basics of Spring vs. Spring Boot](https://dzone.com/articles/understanding-the-basics-of-spring-vs-spring-boot)
- [Pluralsight - Spring: The Big Picture](https://www.pluralsight.com/courses/spring-big-picture)
- [Wikipedia - Programação orientada a aspecto](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_orientada_a_aspecto)
- [Wikipedia - Spring Framework](https://en.wikipedia.org/wiki/Spring_Framework)
- [Zoltán Raffai - Getting started with Java Spring](https://www.zoltanraffai.com/blog/what-is-spring-framework-in-java/)
