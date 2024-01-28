---
title: Engatinhando em Java para a web - Parte 3
date: 2019-12-10 13:50:00
modified: 2023-10-13 10:13:00
tags: ["desenvolvimento-web", "java", "servlet"]
slug: engatinhando-em-java-web-parte-3
thumbnail: /media/java-mascot.png
---

No [_post_ anterior](/2019/12/02/engatinhando-em-java-web-parte-2.html "Confira a parte 2") falamos sobre a especificação
_Servlet_, bem como sobre o uso de _JavaServer Pages_ e _Expression Language_.
Para finalizar o protótipo proposto, e encerrar essa introdução ao [_Java_](/tag/java.html "Leia mais sobre Java"),
precisamos implementar o método `POST`. Durante esse percurso abordaremos os conceitos de _filters_ e _listeners_.

## doGet e doPost

Recaptulando o protótipo: Precisamos implementar a funcionalidade de adicionar uma tarefa ao _todo list_.

![Cypher em The Matrix](/media/cypher-ignorance.jpg "Se continuar no Python é ficar na Matrix, pode me deixar lá (filmfoodsafari.wordpress.com)")

Se inspecionarmos o método `service` da classe `HttpServlet`, veremos que ele já se encarrega de determinar qual verbo _HTTP_
está sendo utilizado pela requisição. Portanto, ao invés de sobrescrevê-lo é mais eficiente implementarmos os métodos nos quais
queremos suportar.

Renomeie o método `service` para `doGet`, e crie um método vazio para o `doPost`:

```java
@WebServlet(urlPatterns = "")
public class OlaMundoServlet extends HttpServlet {
    List<Tarefa> tarefas = new ArrayList<>() {
        {
            add(new Tarefa("Tarefa A"));
            add(new Tarefa("Tarefa B"));
            add(new Tarefa("Tarefa C"));
        }
    };

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("tarefas", tarefas);

        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/index.jsp");
        rd.forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {

    }
}
```

Note a alteração em `List<Tarefa> tarefas`.

Com a seguinte adição de código ao método `doPost` temos um protótipo que atinge o seu objetivo:

```java
@Override
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    final Tarefa tarefa = new Tarefa(req.getParameter("nome"));
    tarefas.add(tarefa);

    req.setAttribute("tarefas", tarefas);
    RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/index.jsp");
    rd.forward(req, resp);
}
```

Executando o _Maven_ (`mvn clean tomcat7:run`), e através do endereço `http://localhost:8080`, somos capazes de ver o resultado:

![Exemplo de POST](/media/java-post-browser.png)

Ao analisar o código acima, além das possibilidades de melhoria de código (como reaproveitar o
`req.getRequestDispatcher("/WEB-INF/index.jsp")` ao invés de duplicá-lo, ou fazer um `redirect`),
há algo muito importante que precisa ser salientado: _Servlets_ não são "thread safe".

## Don't repeat yourself

Segundo o [material da _Caelum_](https://www.caelum.com.br/apostila-java-web/servlets/#uma-nica-instncia-de-cada-servlet "Leia mais na apostila da Caelum"):

> De acordo com a especificação de Servlets, por padrão, existe uma única instância de cada Servlet declarada. Ao chegar
> uma requisição para a Servlet, uma nova Thread é aberta sobre aquela instância que já existe.
>
> Isso significa que, se colocássemos em nossa Servlet uma variável de instância, ela seria compartilhada entre todas
> as threads que acessam essa Servlet! Em outras palavras, seria compartilhado entre todas as requisições e todos os
> clientes enxergariam o mesmo valor. Provavelmente não é o que queremos fazer.

Nosso protótipo está pronto, e a brincadeira com o atributo de instância nos permitiu interagir com o método `POST`.

Se quisermos seguir em frente e tornar a aplicação mais "production ready", outros
aspectos terão que ser considerados, como persistência, segurança, validação de dados, modularidade, e não podemos esquecer
desses detalhes como a natureza _multithreading_ que envolve o _Java_.

![Trinity em The Matrix](/media/dodge-this.png "Fazer algo funcionar na plataforma JavaEE parece como a Trinity acertando um agente em Matrix (vulturehound.co.uk)")

E se nesse momento você ainda está disposto a fazer isso por conta própria, reconsidere. Para fins de aprendizado
esse tipo de experimento é ótimo mas nada produtivo, portanto, considere o uso de algum _framework_.

## Para finalizar: Filters & Listeners

Mas calma! Há dois tópicos que valem a pena ser compreendidos antes de pular para o uso de algum _framework_.

Diretamente de uma [_thread_ do _StackOverflow_](https://stackoverflow.com/questions/4720942/difference-between-filter-and-listener-in-servlet-java-ee "Difference between Filter and Listener"):

> Servlet Filter is used for monitoring request and response from client to the servlet, or to modify the request and
> response, or to audit and log.
>
> Servlet Listener is used for listening to events in a web containers, such as when you create a session, or place an
> attribute in an session or if you passivate and activate in another container, to subscribe to these events you can
> configure listener in web.xml, for example HttpSessionListener.

Em outras palavras:

- **Filtros:** Usados para interagir com a requisição e com a resposta.
- **Listeners:** Usados para interagir com eventos que acontecem dentro de um _container_.

### Filters

Assim como a interface `Servlet`, possuímos uma interface para a escrita de filtros. O propósito do filtro abaixo é
"logar" o endereço _IP_ do usuário que está realizando a requisição:

```java
// src/main/java/webapp/LogFilter.java
package webapp;

import java.io.IOException;
import java.util.Date;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

@WebFilter("/*")
public class LogFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // vazio
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
        String ipAddress = request.getRemoteAddr();
        String now = new Date().toString();

        System.out.println(String.format("IP: %s; Time: %s", ipAddress, now));

        chain.doFilter(request, response);
    }
}
```

Com o uso da _annotation_ `WebFilter`, dizemos que queremos aplicar o filtro para todas as requisições (`/*`). A _annotation_ também é responsável por não precisarmos tocar no arquivo `web.xml`, e temos o filtro funcionando a partir do momento que reiniciamos o _Tomcat_.

Com `Filter` agora temos a capacidade de aplicar de uma maneira mais modular conceitos como [_cache_](/2012/05/14/o-cache-e-o-http.html "O cache e o HTTP"), compactação da
resposta, controle de sessão, [segurança](/2012/04/15/problemas-de-seguranca-em-aplicacoes-web.html "Problemas comuns em aplicações web"), entre outros.

[Leia mais sobre filtros na apostila de desenvolvimento _web_ em _Java_, da _Caelum_](https://www.caelum.com.br/apostila-java-web/recursos-importantes-filtros/ "Recursos importantes: Filtros").

### Listeners

A necessidade de filtros fica bem evidente, principalmente quando estamos acostumados com [estruturas como a do _Django_](https://www.profissionaisti.com.br/2009/04/entendendo-o-django/ "Entendendo o Django").
Possivelmente a necessidade dos _listeners_ exija um pouco mais de criatividade de nossa parte. O [_JavaTPoint_ pode ajudar](https://www.javatpoint.com/ServletContextEvent "ServletContextEvent and ServletContextListener"):

> If you want to perform some action at the time of deploying the web application such as creating database connection,
> creating all the tables of the project etc, you need to implement ServletContextListener interface and provide the
> implementation of its methods.

Para ilustrar como interagir com os (_context_) _listeners_, temos o código abaixo:

```java
// src/main/java/webapp/MyListener.java
package webapp;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MyListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Imagine que estamos setando um pool de conexões com o banco de dados");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Imagine que estamos fechando o pool de conexões com o banco de dados");
    }
}
```

Que resulta em:

```text
$ mvn tomcat7:run
[INFO] Scanning for projects...
(...)
INFO: Starting Servlet Engine: Apache Tomcat/7.0.47
Imagine que estamos setando um pool de conexões com o banco de dados
```

E quando finalizamos a aplicação:

```text
Imagine que estamos fechando o pool de conexões com o banco de dados
```

E além de fechar o _pool_ de conexões, fechamos também a parte de _Servlets_ dessa série. Fica uma clara impressão de
que grande parte do que precisamos para desenvolver uma plataforma _web_ já é oferecida pela versão atual do
_Java Enterprise Edition_.

[Leia mais sobre context listener na apostilia de desenvolvimento _web_ em _Java_, da _Caelum_](https://www.caelum.com.br/apostila-java-web/apendice-topicos-da-servlet-api/#context-listener "Context Listener").

## Antes de ir: O lado "agente Smith" da força

E aqui chegamos ao fim dessa nossa saga cobrindo aspectos do _Java EE_. Ainda que faltem tópicos relevantes, como o
[_EJB_](https://docs.oracle.com/javaee/7/api/javax/ejb/package-summary.html "Enterprise JavaBeans"), [_JSF_](https://www.oracle.com/technetwork/java/javaee/javaserverfaces-139869.html "JavaServer Faces")
ou [_JPA_](https://www.oracle.com/technetwork/java/javaee/tech/persistence-jsp-140049.html "Java Persistence API"),
cobrimos outros tantos que fazem parte da especificação.

![Agente Smith em The Matrix](/media/agent-smith.jpeg "Seja a resistência! Lute contra os engravatados (antagonist.wikia.com)")

Especificação essa que, além de ter como proposta proporcionar tecnologias para um ambiente mais _enterprise_, possui outras vantagens,
como por exemplo, a premissa de evitar o _vendor lock-in_.

Mas ao contrário do que você possa pensar, e do que eu acreditava até pouco tempo atrás, não seguir essas especificações é uma possibilidade.
De fato, algumas comunidades vem desafiando essas "regras" e apresentando soluções elegantes e inovadoras dentro do ecossistema _Java_ desde
muito tempo. [Talvez a mais relevante delas sendo a do _Spring_](https://docs.spring.io/spring/docs/current/spring-framework-reference/overview.html#overview-history "History of Spring and the Spring Framework"):

> Spring came into being in 2003 as a response to the complexity of the early J2EE specifications. While some consider
> Java EE and Spring to be in competition, Spring is, in fact, complementary to Java EE. The Spring programming model
> does not embrace the Java EE platform specification; rather, it integrates with carefully selected individual
> specifications from the EE umbrella.

Inclusive, em um mundo cada vez mais *microservices*, seguir completamente essas especificações torna-se questionável,
como ilustra _Rod Johnson_ em sua palestra [_Eighteen Years of Spring_](https://www.infoq.com/presentations/principles-successful-frameworks/ "Assista no InfoQ").

E é com o _Spring_ que no próximo artigo experimentaremos esse lado "rebelde" e, sem dúvida, mais divertido, do desenvolvimento [_web_](/tag/desenvolvimento-web.html "Leia mais sobre web") com _Java_.
Mas se você quiser continuar em um ambiente mais _enterprise_: [_Glassfish_](https://en.wikipedia.org/wiki/GlassFish "Open-source application server"), [_WildFly_](https://en.wikipedia.org/wiki/WildFly "Antigo JBoss")
e [_Geronimo_](https://en.wikipedia.org/wiki/Apache_Geronimo "Application server fornecido pela Apache Foundation"); podem ser os próximos passos.

## Considerações finais

E mais uma vez, embora possa ser tentador cair na discussão Spring x Java EE, _Siva Prasad_
deixa essa pérola no artigo ["A developer's perspective on Spring vs. Java EE"](https://dzone.com/articles/developers-perspective-spring "Leia o artigo na íntegra"):

> As an enthusiastic Java developer I read the Spring vs JavaEE discussions hoping there might be few things which I
> don't know such as "in which areas one is better than the other". But I find 70% of discussions goes on lame
> arguments which is not very interesting to me.

Ter uma noção de como funciona a plataforma _EE_ do _Java_ é benéfico, embora não seja lá muito divertido.

Até a próxima.

## Referências

- [Caelum: Apostila Java para Desenvolvimento Web - Servlets](https://www.caelum.com.br/apostila-java-web/servlets/)
- [ConcretePage: @WebListener Annotation Example in Servlet 3 with ServletContextListener](https://www.concretepage.com/java-ee/jsp-servlet/weblistener-annotation-example-in-servlet-3-with-servletcontextlistener)
- [Dinesh on Java: What is the DispatcherServlet in Spring and its uses?](https://www.dineshonjava.com/what-is-dispatcherservlet-in-spring-and-its-uses/)
- [DZone: A Developer's Perspective on Spring vs. JavaEE](https://dzone.com/articles/developers-perspective-spring)
- [InfoQ: Eighteen Years of Spring](https://www.infoq.com/presentations/principles-successful-frameworks/)
- [JavaTPoint: ServletContextEvent and ServletContextListener](https://www.javatpoint.com/ServletContextEvent)
- [Spring: Spring Framework Overview](https://docs.spring.io/spring/docs/current/spring-framework-reference/overview.html#overview-history)
- [StackOverflow: Difference between Filter and Listener in Servlet (Java EE)](https://stackoverflow.com/questions/4720942/difference-between-filter-and-listener-in-servlet-java-ee)
- [StackOverflow: Just what is Java EE really?](https://stackoverflow.com/questions/15774924/just-what-is-java-ee-really)
- [StackOverflow: Why Servlets are not thread safe?](https://stackoverflow.com/questions/9555842/why-servlets-are-not-thread-safe)
