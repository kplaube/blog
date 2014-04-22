Title: Assegure a qualidade do seu código Python - Pyflakes
Date: 2011-10-02 17:58:00
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, pyflakes, qualidade
Slug: assegure-qualidade-seu-codigo-python-pyflakes
meta_description: o Pyflakes é uma ferramenta de qualidade que analisa o seu código Python atrás de erros (de sintaxe e importação, por exemplo), retornando um relatório muito objetivo com o arquivo, linha e o tipo de incoerência que ele encontrou.


{% img align-left /images/blog/software-quality.jpg 180 180 Qualidade %}
Depois da dar uma pincelada na [*pep8*][] e no [*Pylint*][], chegou a hora de
falarmos um pouco sobre o ***Pyflakes***.

Resumidamente, o [*Pyflakes*][] é uma ferramenta de qualidade que
analisa o seu código [*Python*][] atrás de erros (de sintaxe e
importação, por exemplo), retornando um relatório muito objetivo com o
arquivo, linha e o tipo de incoerência que ele encontrou.

Uma excelente ferramenta para você ter “plugada” ao seu editor favorito.

<!-- PELICAN_END_SUMMARY -->


O que o Pyflakes faz que o Pylint não faz?
------------------------------------------

As comparações, acredito, serão inevitáveis. Afinal, o que o *Pyflakes*
faz que o *Pylint* não faz? A resposta que você encontrará é muito
simples: O ***Pyflakes* não analisa a “beleza”** do seu **código**. Ou
seja, ele apenas **verifica erros de lógica e de sintaxe**, não de
convenções de código.

Isso faz do *Pyflakes* o parceiro ideal do seu editor de código
favorito. Por ser objetivo, favorece a análise e traz resultados
interessantes, por exemplo, apontando variáveis criadas que nunca foram
usadas, ou métodos importados que nunca foram chamados no escopo de um
módulo *Python*.

Logo, ter as duas ferramentas à mão é uma excelente pedida para
incrementar ainda mais o seu ambiente de desenvolvimento.


Na prática
----------

Vamos analisar o código de um projeto da faculdade que eu fiz, chamado
[*Social portal for soccer players*][] (encontra-se aberto no
*BitBucket*):

    ::bash
    $ pyflakes apps/notificate/views.py

A resposta é muito clara. Existem classes sendo importadas, mas que não
estão sendo usadas:

    ::bash
    apps/notificate/views.py:3: 'EmptyPage' imported but unused
    apps/notificate/views.py:3: 'InvalidPage' imported but unused

O funcionamento básico do *Pyflakes* é esse… simples como as melhores
coisas devem ser!


Pyflakes + Vim
--------------

Se assim como eu, você tem um “tropeço” pelo [*vim*][], você não pode
deixar passar esse bom *plugin* chamado [*pyflakes.vim*][].

Para instalá-lo, basta seguir o guia de instalação contido no arquivo
**README** ([leia diretamente do *GitHub*][]). Para que o *plugin*
funcione corretamente, o seu *vim* deve ter suporte a *Python* (se não
tiver, basta compilá-lo com o parâmetro **-–enable-pythoninterp**).

Uma vez instalado, quando estiver editando um código *Python*, basta
utilizar o comando **:cc** para navegar entre os erros encontrados pelo
*plugin*.


Referências
-----------

* [*Pyflakes in Launchpad*][]
* [*pyflakes.vim: check Python code on the fly*][]

Até a próxima…


  [*pep8*]: {filename}/04-assegure-a-qualidade-do-seu-codigo-python-pep8.md
    "Assegura a qualidade do seu código Python com a pep8"
  [*Pylint*]: {filename}/05-assegure-a-qualidade-do-seu-codigo-python-pylint.md
    "Assegure a qualidade do seu código Python com o Pylint"
  [*Pyflakes*]: https://launchpad.net/pyflakes "Pyflakes no Launchpad"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*Social portal for soccer players*]: https://bitbucket.org/kplaube/social-portal-for-soccer-players/overview
    "Visite o repositório do projeto no BitBucket"
  [*vim*]: http://www.vim.org/ "Página oficial do Vi Improved"
  [*pyflakes.vim*]: http://symbolsystem.com/pyflakes-vim/
    "pyflakes.vim - Verifique o seu código em tempo real"
  [leia diretamente do *GitHub*]: https://github.com/kevinw/pyflakes-vim#readme
    "README do pyflakes.vim no GitHub"
  [*Pyflakes in Launchpad*]: https://launchpad.net/pyflakes
    "Faça download agora mesmo do Pyflakes"
  [*pyflakes.vim: check Python code on the fly*]: http://symbolsystem.com/pyflakes-vim/
    "Utilize o Pyflakes em seu VIM"
