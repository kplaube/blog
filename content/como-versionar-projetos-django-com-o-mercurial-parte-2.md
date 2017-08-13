Title: Como versionar projetos Django com o Mercurial - Parte 2
Date: 2011-05-22 11:04
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, django, mercurial
Slug: como-versionar-projetos-django-mercurial-parte-2
meta_description: Conheça os comandos básicos do Mercurial e aprenda a criar um repositório remoto e a compartilhar o seu código com outros desenvolvedores.


{% img align-left /images/blog/mercurial-logo.png 180 216 Logotipo do Mercurial %}
Dando continuidade ao *post* [Como versionar
projetos *Django* com o *Mercurial*][], e a série [Montando seu ambiente
de desenvolvimento *Django* no *Linux*][], vamos dar uma pincelada nos
funcionamentos básicos do [*Mercurial*][].

<!-- PELICAN_END_SUMMARY -->

hg? Mas não era Mercurial?
--------------------------

*Mercury* em português significa mercúrio (nenhuma novidade até aqui),
que é um elemento químico com o símbolo *Hg* e o número atômico 80
(assim disse a [*Wikipedia*][] (: ). É devido a isso que você utilizará
o Mercurial em linha de comando através de comandos iniciados por
**hg**.

Antes de iniciarmos, vamos dizer ao *Mercurial* quem nós somos. Abra o
arquivo **.hgrc** do seu **home**:

    ::bash
    $ vim ~/.hgrc

É fundamental que nossos *commits* estejam marcados com nosso nome, e um
e-mail para contato. Vamos escrever estas duas informações neste
arquivo:

    ::ini
    [ui]
    username = seu nome < seuemail@provedor.com >

Salve o arquivo… e estamos prontos para iniciar.


Primeiros passos…
-----------------

Os passos que vou exemplificar aqui não são muito diferentes dos que
você encontrará na [página oficial do *Mercurial*][]. Preguiça minha?
Talvez… mas você verá que usar o *Mercurial* é extremamente simples! As
dificuldades são as exceções do dia-à-dia.

Para deixar o exemplo mais interessante, vamos utilizar o *virtualenv*.
Dúvidas? Confira o *post* [*Python*, *Django* e *virtualenv*][] e
visualize aonde pretendemos chegar:

    ::bash
    $ cd ˜/Projetos/
    $ virtualenv DjangoComHG --no-site-packages

    $ cd DjangoComHG

Agora sim, vamos criar um projeto através da seguinte expressão:

    ::bash
    $ hg init django-com-hg

Projeto criado… vamos partir para as tarefas mais comuns no *Mercurial*.


Altere, adicione e “comite”
---------------------------

O *Mercurial* é [*DVCS*][], isto quer dizer que, quando você clonar um
repositório remoto você terá uma cópia exata dele em seu computador.
Logo, as alterações que você “persistir” estarão disponíveis apenas na
sua cópia local. Pode parecer um pouco confuso, mas com o tempo faz todo
o sentido.

Para o primeiro *commit* (persistir nossas alterações localmente)
escreva um arquivo **.hgignore** ([saiba mais do que se trata][]) e um
arquivo **README**:

    ::bash
    $ cd django-com-hg/
    $ ls -a

    .hg     .hgignore     README

A pasta **.hg** na verdade é quem vai identificar e armazenar todas as
informações do nosso projeto. Sem ela, você deixa de ter o controle
sobre as versões dos arquivos e subpastas do projeto.

Execute o comando **hg status** e veja o que aparece… acredito que o
resultado seja auto-sugestivo. O *Mercurial* ainda não sabe o que fazer
com os arquivos no projeto, portanto diremos a ele que queremos
versionar estes arquivos:

    ::bash
    $ hg add .hgignore README

Uma nova execução do **hg status** vai apontar que os arquivos foram
marcados para adição, porém, ainda não foram adicionados. Você vai
confirmar está operação através do comando *commit*:

    ::bash
    $ hg commit -m "Primeiro commit com .hgignore"

O parâmetro **-m** serve para passarmos uma mensagem de descrição do
*commit* que estamos fazendo. Isto facilita na leitura do *log* de
*commits* realizados:

    ::bash
    $ hg log

Estes serão os comandos que provavelmente você usará constantemente
enquanto desenvolve.


Compartilhando as suas produções
--------------------------------


{% img align-left /images/blog/bitbucket-logo.png 180 180 Logotipo do BitBucket %}
Se você ainda não tem uma conta no
[*Bitbucket*][], essa é uma grande oportunidade para fazer uma.

Vamos criar um repositório para praticarmos o comando **push**. No
*Bitbucket*:

* Eu vou dar o nome de “post-django-com-hg” ao repositório, fique a
  vontade para dar o nome que você desejar;
* Escolha o [*Python*][] como linguagem;
* Coloque uma pequena descrição;
* Eu vou marcar a opção *Issue tracking*, caso haja algum problema com
  o código e vocês queiram sugerir melhorias.

[Confira o resultado][].

No repositório local vamos utilizar o comando **push** com o endereço do
repositório no *Bitbucket*. Isso enviará todas as alterações que
persistidas em nosso repositório local para o repositório remoto,
mesclando-as com as contribuições de outros usuários envolvidos no
projeto:

    ::bash
    $ hg push https://bitbucket.org/kplaube/post-django-com-hg

**Lembre-se** de mudar o endereço acima para o endereço do seu
repositório no *Bitbucket*. Visite a página do seu repositório e veja o
que aconteceu… bacana, não?

Mas dessa forma, teremos que sempre executar o comando **push**
informando o endereço do repositório. Vamos deixar esta tarefa mais
simples editando o arquivo **hgrc** dentro da pasta **.hg** do projeto:

    ::bash
    $ cd ~/Projetos/DjangoComHG/django-com-hg/
    $ vim .hg/hgrc

Coloque o seguinte:

    ::ini
    [paths]
    default = https://kplaube@bitbucket.org/kplaube/post-django-com-hg

**Lembre-se** de mudar o endereço acima para o endereço do seu
repositório no *Bitbucket*.

Pronto! Quando você for “pushear” não precisará mais informar o endereço
do repositório remoto.

Altere alguns arquivos… **commit**. Adicione alguns arquivos…
**commit**. Ao final do dia, dê um **push** e deixe o resto da equipe
saber o que você fez ;)


Referências
-----------

* [Site oficial do projeto *Mercurial*][]
* [Artigo na *Wikipedia* sobre *Mercurial*][]
* [Artigo na *Wikipedia* sobre Mercúrio (o elemento químico)][]
* [*Mercurial Hg* – Controlando as Versões do seu *Software*][]
* [*Mercurial*: *The Definitive Guide*][]

No próximo *post*, vamos concluir a trilogia mostrando uma forma bacana
de utilizar o *Mercurial* para versionar seus projetos *Django*.

Até a próxima…


  [Como versionar projetos *Django* com o *Mercurial*]: {filename}como-versionar-projetos-django-com-o-mercurial-parte-1.md
    "Leia a primeira parte deste post"
  [Montando seu ambiente de desenvolvimento *Django* no *Linux*]: {filename}03-montando-seu-ambiente-de-desenvolvimento-django-no-linux.md
    "Tá começando com Django? É usuário Linux? Este post pode te interessar"
  [*Mercurial*]: {tag}mercurial
    "Leia mais sobre Mercurial"
  [*Wikipedia*]: http://en.wikipedia.org/wiki/Mercury_(element)
    "Leia mais sobre o elemento químico Mercúrio"
  [página oficial do *Mercurial*]: http://mercurial.selenic.com/
    "Visite a página oficial do projeto Mercurial"
  [*Python*, *Django* e *virtualenv*]: {filename}/python-django-e-virtualenv.md
    "Construa projetos isolados do seu sistema com virtualenv"
  [*DVCS*]: http://en.wikipedia.org/wiki/Distributed_revision_control
    "Leia mais sobre Distributed Version Control System"
  [saiba mais do que se trata]: http://mercurial.selenic.com/wiki/.hgignore
    "Entenda para que serve o arquivo .hgignore"
  [*Bitbucket*]: http://bitbucket.org/
    "Bitbucket, compartilhe o seu código"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [Confira o resultado]: https://bitbucket.org/kplaube/post-django-com-hg
    "Confira o repositório criado no Bitbucket"
  [Site oficial do projeto *Mercurial*]: http://mercurial.selenic.com/
    "Mercurial, work easier, work faster"
  [Artigo na *Wikipedia* sobre *Mercurial*]: http://en.wikipedia.org/wiki/Mercurial
    "Leia mais sobre Mercurial na Wikipedia"
  [Artigo na *Wikipedia* sobre Mercúrio (o elemento químico)]: http://en.wikipedia.org/wiki/Mercury_(element)
    "Leia mais sobre Mercúrio no Wikipedia"
  [*Mercurial Hg* – Controlando as Versões do seu *Software*]: http://tocadoelfo.blogspot.com/2011/03/mercurial-hg-controlando-as-versoes-do.html
    "Excelente post sobre Mercurial, TI e gerência de projetos"
  [*Mercurial*: *The Definitive Guide*]: http://hgbook.red-bean.com/read/
    "Excelente e-book de Bryan O'Sullivan sobre Mercurial"
