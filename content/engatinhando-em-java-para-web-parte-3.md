Title: Engatinhando em Java para a web - Parte 3
Date: 2019-12-21 09:15:00
Category: desenvolvimento
Tags: desenvolvimento, web, java, servlet, jsp, jstl
Slug: engatinhando-em-java-web-parte-3
Image: /images/blog/java-mascot.png
Alt: Mascote da linguagem Java

No [_post_ anterior]({filename}engatinhando-em-java-para-web-parte-2.md "Confira a parte 2") falamos sobre a especificação
_Servlet_, bem como sobre o uso de _JavaServer Pages_ e _Expression Language_.
Para finalizar o protótipo proposto, e encerrarmos essa introdução ao [_Java_]({tag}java "Leia mais sobre Java"),
precisamos implementar o método `POST`, e durante esse percurso abordaremos os conceitos de _filters_ e _listeners_.

<!-- PELICAN_END_SUMMARY -->

## doGet e doPost

Recaptulando o protótipo: Precisamos implementar a funcionalidade de adicionar uma tarefa ao _todo list_.

Se inspecionarmos o método `service` da classe `HttpServlet`, veremos que ele já se encarrega de determinar qual verbo _HTTP_
está sendo utilizado pela requisição. Portanto, ao invés de sobrescrevê-lo, é mais eficiente implementarmos os métodos nos quais
queremos suportar.

Renomeie o método `service` para `doGet`, e crie um método vazio para o `doPost`:

    ::java
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

Note a alteração em `List<Tarefa> tarefas`.

Com a seguinte adição de código ao método `doPost`, temos um protótipo que atinge o seu objetivo:

    ::java
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final Tarefa tarefa = new Tarefa(req.getParameter("nome"));
        tarefas.add(tarefa);

        req.setAttribute("tarefas", tarefas);
        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/index.jsp");
        rd.forward(req, resp);
    }

Executando o _Maven_ (`mvn clean tomcat7:run`), e através do endereço `http://localhost:8080`, somos capazes de ver o resultado:

{% img align-center-keep-size /images/blog/java-post-browser.png 400 300 Exemplo de POST %}

Ao analisar o código acima, além das possibilidades de melhoria de código (como reaproveitar o
`req.getRequestDispatcher("/WEB-INF/index.jsp")` ao invés de duplicá-lo), há algo muito importante que precisa ser salientado: _Servlets_ não são "thread safe".

## Don't repeat yourself

Segundo o [material da _Caelum_](https://www.caelum.com.br/apostila-java-web/servlets/#uma-nica-instncia-de-cada-servlet "Leia mais na apostila da Caelum"):

> De acordo com a especificação de Servlets, por padrão, existe uma única instância de cada Servlet declarada. Ao chegar
> uma requisição para a Servlet, uma nova Thread é aberta sobre aquela instância que já existe.

> Isso significa que, se colocássemos em nossa Servlet uma variável de instância, ela seria compartilhada entre todas
> as threads que acessam essa Servlet! Em outras palavras, seria compartilhado entre todas as requisições e todos os
> clientes enxergariam o mesmo valor. Provavelmente não é o que queremos fazer.

Nosso protótipo está pronto, e a brincadeira com o atributo de instância nos permitiu interagir com o método `POST`.

Se quisermos seguir em frente e tornar a aplicação mais "production ready", outros
aspectos terão que ser considerados, como persistência, segurança, validação de dados, modularidade, e não podemos esquecer
desses detalhes como a natureza _multithreading_ que envolve o _Java_.

E se nesse momento você ainda está disposto a fazer isso "all by yourself", reconsidere. Para fins de aprendizado,
esse tipo de experimento é ótimo mas nada produtivo, portanto, considere o uso de algum _framework_.

## Para finalizar: Filters & Listeners

Mas calma! Há dois tópicos que valem a pena ser compreendidos antes de pular para o uso de algum _framework_.

Diretamente de uma [_thread_ do _StackOverflow_](https://stackoverflow.com/questions/4720942/difference-between-filter-and-listener-in-servlet-java-ee "Difference between Filter and Listener"):

> Servlet Filter is used for monitoring request and response from client to the servlet, or to modify the request and
> response, or to audit and log.

> Servlet Listener is used for listening to events in a web containers, such as when you create a session, or place an
> attribute in an session or if you passivate and activate in another container, to subscribe to these events you can
> configure listener in web.xml, for example HttpSessionListener.

Em outras palavras:

- **Filtros:** Usados para interagir com a requisição e com a resposta.
- **Listeners:** Usados para interagir com eventos que acontecem dentro de um _container_.

### Filters

Assim como a interface `Servlet`, possuímos uma interface para a escrita de filtros. O propósito do filtro abaixo é
"logar" o endereço _IP_ do usuário que está realizando a requisição:

    ::java
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

Com o uso da _annotation_ `WebFilter`, dizemos que queremos aplicar o filtro para todas as requisições (`/*`). A _annotation_ também é responsável por não precisarmos tocar no arquivo `web.xml`, e temos o filtro funcionando a partir do momento que reiniciamos o _Tomcat_.

Com `Filter` agora temos a capacidade de aplicar de uma maneira mais modular conceitos como [_cache_]({filename}o-cache-e-o-http.md "O cache e o HTTP"), compactação da
resposta, controle de sessão, [segurança]({filename}problemas-comuns-de-seguranca-em-aplicacoes-web.md "Problemas comuns em aplicações web"), entre outros.

[Leia mais sobre filtros na apostila de desenvolvimento _web_ em Java, da _Caelum_](https://www.caelum.com.br/apostila-java-web/recursos-importantes-filtros/ "Recursos importantes: Filtros").

### Listeners

## Antes de ir: EJB, JSF, e o lado enterprise da força

https://dzone.com/articles/developers-perspective-spring

## Considerações finais

## Referências

- [Caelum: Apostila Java para Desenvolvimento Web - Servlets](https://www.caelum.com.br/apostila-java-web/servlets/)
- [Dinesh on Java: What is the DispatcherServlet in Spring and its uses?](https://www.dineshonjava.com/what-is-dispatcherservlet-in-spring-and-its-uses/)
- [StackOverflow: Difference between Filter and Listener in Servlet (Java EE)](https://stackoverflow.com/questions/4720942/difference-between-filter-and-listener-in-servlet-java-ee)
- [StackOverflow: Why Servlets are not thread safe?](https://stackoverflow.com/questions/9555842/why-servlets-are-not-thread-safe)
