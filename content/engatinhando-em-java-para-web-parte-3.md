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

Recaptulando o protótipo, precisamos implementar a funcionalidade de adicionar uma tarefa ao _todo list_.

Se inspecionarmos o método `service`, da classe `HttpServlet`, veremos que ele já se encarrega de determinar qual verbo _HTTP_
está sendo utilizado pela requisição. Portanto, ao invés de sobrescrevê-lo, é mais eficiente implementarmos os métodos nos quais
queremos suportar.

Renomeie o método `service` para `doGet`, e crie um método vazio para o `POST`:

    ::java
    @WebServlet(urlPatterns = "")
    public class OlaMundoServlet extends HttpServlet {
        List<Tarefa> tarefas = List.of(
                new Tarefa("Tarefa A"),
                new Tarefa("Tarefa B"),
                new Tarefa("Tarefa C")
        );

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
