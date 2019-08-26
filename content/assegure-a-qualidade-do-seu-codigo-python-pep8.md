Title: Assegure a qualidade do seu código Python - pep8
Date: 2011-08-26 13:51:00
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, qualidade, pep8
Slug: assegure-qualidade-seu-codigo-python-pep
meta_description: As "PEPs" (Python Enhancement Proposal) são documentos que geralmente abordam alguma nova funcionalidade da linguagem, propósitos, procedimentos ou ambiente. O pep8 é uma ferramenta simples (e muito eficaz) que analisa o seu código Python segundo as convenções de código descritas na PEP 8.


{% img representative-image /images/blog/python-code.jpg 180 180 Código-fonte Python %}
**Convenções de código!** Já tive a oportunidade de [escrever sobre elas no *Profissionais TI*][]. Benção ou
maldição? Há quem goste, há quem ache uma perda de tempo…

<!-- PELICAN_END_SUMMARY -->

Acredito muito que a organização e a qualidade do código são benéficas
para qualquer projeto, principalmente para aqueles que possuem alta
rotatividade de profissionais. Padrões de projetos, padrões estruturais
e de escrita facilitam a “assimilação” do que já foi produzido, facilita
a manutenção e “orienta” as novas produções.

Se você tem problemas em decorar convenções e boas práticas, não
desanime! O [*Python*][] possui algumas ferramentas “bacanudas” que vão
te auxiliar a deixar o *software* mais próximo do “estado da arte”, seja
garantindo as convenções de código, seja avaliando a qualidade do mesmo.


Python Enhancement Proposals
----------------------------

As “PEPs“ (*Python Enhancement Proposal*) são documentos que geralmente
abordam alguma nova funcionalidade da linguagem, propósitos,
procedimentos ou ambiente. Em suma, são “guidelines” que te orientam num
melhor uso da linguagem e suas funcionalidades, bem como podem ajudar em
questões como arquitetura, ambiente ou processos de sua aplicação.

Para saber mais sobre *PEPs*, acesse a [*PEP 1*][] que é justamente um documento
explicando o que são e o que fazem as *Python Enhancement Proposals*.


pep8
----

O **pep8** é uma ferramenta simples (e muito eficaz) que analisa o seu
código *Python* segundo as convenções de código descritas na
[*PEP 8*][].

Vamos analisar o código do [*Django Brasil*][] (você não sabia? O site é
*open source*!), mais especificamente o arquivo **models.py** da *app*
**blog**:

    ::bash
    $ pep8 src/djangobrasil/apps/blog/models.py

    src/djangobrasil/apps/blog/models.py:42:65: W291 trailing whitespace
    src/djangobrasil/apps/blog/models.py:62:1: E302 expected 2 blank lines, found 1
    src/djangobrasil/apps/blog/models.py:105:80: E501 line too long (89 characters)

Como podemos ver, a ferramenta nos mostra a linha e coluna onde o
problema foi encontrado, apresentando uma breve descrição da incoerência
que estamos cometendo em relação às recomendações da
*PEP 8*.

Para obter uma resposta mais “verbose“, podemos passar alguns parâmetros
para o **pep8**:

    ::bash
    $ pep8 src/djangobrasil/apps/blog/models.py --show-source --show-pep8

Viu só?! Dessa forma podemos aprender sobre a *PEP 8* enquanto “ferimos” as 
convenções de código em nossos projetos :D

Para finalizar, podemos contar as ocorrências de problemas com a
*PEP 8* em determinada região do projeto:

    ::bash
    $ pep8 src/djangobrasil/apps/blog/ --statistics -qq --filename=*.py

    1       E225 missing whitespace around operator
    7       E302 expected 2 blank lines, found 1
    1       E303 too many blank lines (2)
    11      E501 line too long (89 characters)
    4       W291 trailing whitespace
    2       W391 blank line at end of file

Nenhum problema muito grave de convenções de código na *app blog* do
*DjangoBrasil* ;)

Confira: [*pep8 – Python style guide checker*][].


Referências
-----------

* [*Python.org – Index of Python Enhancement Proposals (PEPs)*][]
* [*Python.org – PEP 1: Purpose and Guidelines*][]
* [*Python.org – PEP 8: Style Guide for Python Code*][]
* [*Viva o Linux* – *PEP 8*: Guia de estilo para código *Python*][]
* [*GitHub – pep8*][]

Nos próximos *posts*, vamos dar uma pincelada no *pylint*, *pyflakes* e
*clone digger*.

Até a próxima…


  [escrever sobre elas no *Profissionais TI*]: http://www.profissionaisti.com.br/2009/06/codifique-como-um-verdadeiro-pythonista/
    "Codifique como um verdadeiro Pythonista"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*PEP 1*]: http://www.python.org/dev/peps/pep-0001/
    "PEP1 - PEP Purpose and Guidelines"
  [*PEP 8*]: http://www.python.org/dev/peps/pep-0008/
    "PEP 8 - Style Guide for Python Code"
  [*Django Brasil*]: https://github.com/djangobrasil/djangobrasil.org
    "Repositório no GitHub do site do Django no Brasil"
  [*pep8 – Python style guide checker*]: https://github.com/jcrocholl/pep8/
    "Repositório no GitHub do pep8"
  [*Python.org – Index of Python Enhancement Proposals (PEPs)*]: http://www.python.org/dev/peps/
    "Conheça os tipos de PEPs e quais os seus propósitos"
  [*Python.org – PEP 1: Purpose and Guidelines*]: http://www.python.org/dev/peps/pep-0001/
    "Saiba o que é, o que faz, e como é feita uma PEP"
  [*Python.org – PEP 8: Style Guide for Python Code*]: http://www.python.org/dev/peps/pep-0008/
    "Conheça as convenções de código Python"
  [*Viva o Linux* – *PEP 8*: Guia de estilo para código *Python*]: http://www.vivaolinux.com.br/artigo/PEP-8-Guia-de-estilo-para-codigo-Python
    "Artigo do Viva o Linux que é uma adaptação para o Português da PEP 8"
  [*GitHub – pep8*]: https://github.com/jcrocholl/pep8/
    "Repositório no GitHub do projeto pep8"
