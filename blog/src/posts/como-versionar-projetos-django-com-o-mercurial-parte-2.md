---
title: "Como versionar projetos Django com o Mercurial - Parte 2"
date: 2011-05-22 11:04
modified: 2023-11-12 19:34
category: desenvolvimento
tags:
  [
    "desenvolvimento-web",
    "ambiente-de-desenvolvimento",
    "python",
    "django",
    "mercurial",
    "vcs",
  ]
slug: como-versionar-projetos-django-mercurial-parte-2
thumbnail: ./images/mercurial-logo.png
---

Dando continuidade ao _post_ [Como versionar
projetos *Django* com o *Mercurial*][], e a série [Montando seu ambiente
de desenvolvimento *Django* no *Linux*][], vamos dar uma pincelada nos
funcionamentos básicos do [*Mercurial*][].

## hg? Mas não era Mercurial?

_Mercury_ em português significa mercúrio (nenhuma novidade até aqui),
que é um elemento químico com o símbolo `Hg` e o número atômico 80
(assim disse a [*Wikipedia*][] 🙂). É devido a isso que você utilizará
o _Mercurial_ em linha de comando através de comandos iniciados por
`hg`.

Antes de iniciarmos, vamos dizer ao _Mercurial_ quem nós somos. Abra o
arquivo `.hgrc` do seu `home`:

```text
vim ~/.hgrc
```

É fundamental que nossos _commits_ estejam marcados com nosso nome, e um
e-mail para contato. Vamos escrever estas duas informações neste
arquivo:

```ini
[ui]
username = seu nome < seuemail@provedor.com >
```

Salve o arquivo, e estamos prontos para iniciar.

## Primeiros passos

Os passos que vou exemplificar aqui não são muito diferentes dos que
você encontrará na [página oficial do *Mercurial*][]. Preguiça minha?
Talvez… mas você verá que usar o _Mercurial_ é extremamente simples! As
dificuldades são as exceções do dia a dia.

Para deixar o exemplo mais interessante, vamos utilizar o _virtualenv_.
Dúvidas? Confira o _post_ [*Python*, *Django* e *virtualenv*][] e
visualize aonde pretendemos chegar:

```text
cd ˜/Projetos/
virtualenv DjangoComHG --no-site-packages

cd DjangoComHG
```

Agora sim, vamos criar um projeto através da seguinte expressão:

```text
hg init django-com-hg
```

Projeto criado… vamos partir para as tarefas mais comuns no _Mercurial_.

## Altere, adicione e “comite”

O _Mercurial_ é [*DVCS*][], isto quer dizer que, quando você clonar um
repositório remoto você terá uma cópia exata dele em seu computador.
Logo, as alterações que você “persistir” estarão disponíveis apenas na
sua cópia local. Pode parecer um pouco confuso, mas com o tempo faz todo
o sentido.

Para o primeiro _commit_ (persistir nossas alterações localmente)
escreva um arquivo `.hgignore` ([saiba mais do que se trata][]) e um
arquivo `README`:

```text
$ cd django-com-hg/
$ ls -a

.hg     .hgignore     README
```

A pasta `.hg` na verdade é quem vai identificar e armazenar todas as
informações do nosso projeto. Sem ela, você deixa de ter o controle
sobre as versões dos arquivos e subpastas do projeto.

Execute o comando `hg status` e veja o que aparece… acredito que o
resultado seja auto-sugestivo. O _Mercurial_ ainda não sabe o que fazer
com os arquivos no projeto, portanto diremos a ele que queremos
versionar estes arquivos:

```text
hg add .hgignore README
```

Uma nova execução do `hg status` vai apontar que os arquivos foram
marcados para adição, porém, ainda não foram adicionados. Você vai
confirmar está operação através do comando `commit`:

```text
hg commit -m "Primeiro commit com .hgignore"
```

O parâmetro `-m` serve para passarmos uma mensagem de descrição do
`commit` que estamos fazendo. Isto facilita na leitura do _log_ de
_commits_ realizados:

```text
hg log
```

Estes serão os comandos que provavelmente você usará constantemente
enquanto desenvolve.

## Compartilhando as suas produções

![Logotipo do BitBucket](/media/bitbucket-logo.png "Logotipo do BitBucket")

Se você ainda não tem uma conta no
[*Bitbucket*][], essa é uma grande oportunidade para fazer uma.

Vamos criar um repositório para praticarmos o comando `push`. No
_Bitbucket_:

- Eu vou dar o nome de “post-django-com-hg” ao repositório, fique a
  vontade para dar o nome que você desejar;
- Escolha o [*Python*][] como linguagem;
- Coloque uma pequena descrição;
- Eu vou marcar a opção "Issue tracking", caso haja algum problema com
  o código e vocês queiram sugerir melhorias.

[Confira o resultado][].

No repositório local vamos utilizar o comando `push` com o endereço do
repositório no _Bitbucket_. Isso enviará todas as alterações que
persistidas em nosso repositório local para o repositório remoto,
mesclando-as com as contribuições de outros usuários envolvidos no
projeto:

```text
hg push https://bitbucket.org/kplaube/post-django-com-hg
```

**Lembre-se** de mudar o endereço acima para o endereço do seu
repositório no _Bitbucket_. Visite a página do seu repositório e veja o
que aconteceu… bacana, não?

Mas dessa forma, teremos que sempre executar o comando `pus`h
informando o endereço do repositório. Vamos deixar esta tarefa mais
simples editando o arquivo `hgrc` dentro da pasta `.hg` do projeto:

```text
cd ~/Projetos/DjangoComHG/django-com-hg/
vim .hg/hgrc
```

Coloque o seguinte:

```ini
[paths]
default = https://kplaube@bitbucket.org/kplaube/post-django-com-hg
```

**Lembre-se** de mudar o endereço acima para o endereço do seu
repositório no _Bitbucket_.

Pronto! Quando você for “pushear” não precisará mais informar o endereço
do repositório remoto.

Altere alguns arquivos… `commit`. Adicione alguns arquivos…
`commit`. Ao final do dia, dê um `push` e deixe o resto da equipe
saber o que você fez ;)

## Referências

- [Site oficial do projeto *Mercurial*][]
- [Artigo na *Wikipedia* sobre *Mercurial*][]
- [Artigo na *Wikipedia* sobre Mercúrio (o elemento químico)][]
- [*Mercurial Hg* – Controlando as Versões do seu *Software*][]
- [*Mercurial*: *The Definitive Guide*][]

No próximo _post_, vamos concluir a trilogia mostrando uma forma bacana
de utilizar o _Mercurial_ para versionar seus projetos _Django_.

Até a próxima.

[como versionar projetos *django* com o *mercurial*]: /2011/05/10/como-versionar-projetos-django-mercurial-parte.html "Leia a primeira parte deste post"
[montando seu ambiente de desenvolvimento *django* no *linux*]: /2011/03/03/montando-seu-ambiente-de-desenvolvimento-django.html "Tá começando com Django? É usuário Linux? Este post pode te interessar"
[*mercurial*]: /tag/mercurial.html "Leia mais sobre Mercurial"
[*wikipedia*]: http://en.wikipedia.org/wiki/Mercury_(element) "Leia mais sobre o elemento químico Mercúrio"
[página oficial do *mercurial*]: http://mercurial.selenic.com/ "Visite a página oficial do projeto Mercurial"
[*python*, *django* e *virtualenv*]: /2011/03/18/python-django-virtualenv.html "Construa projetos isolados do seu sistema com virtualenv"
[*dvcs*]: http://en.wikipedia.org/wiki/Distributed_revision_control "Leia mais sobre Distributed Version Control System"
[saiba mais do que se trata]: http://mercurial.selenic.com/wiki/.hgignore "Entenda para que serve o arquivo .hgignore"
[*bitbucket*]: http://bitbucket.org/ "Bitbucket, compartilhe o seu código"
[*python*]: /tag/python.html "Leia mais sobre Python"
[confira o resultado]: https://bitbucket.org/kplaube/post-django-com-hg "Confira o repositório criado no Bitbucket"
[site oficial do projeto *mercurial*]: http://mercurial.selenic.com/ "Mercurial, work easier, work faster"
[artigo na *wikipedia* sobre *mercurial*]: http://en.wikipedia.org/wiki/Mercurial "Leia mais sobre Mercurial na Wikipedia"
[artigo na *wikipedia* sobre mercúrio (o elemento químico)]: http://en.wikipedia.org/wiki/Mercury_(element) "Leia mais sobre Mercúrio no Wikipedia"
[*mercurial hg* – controlando as versões do seu *software*]: http://tocadoelfo.blogspot.com/2011/03/mercurial-hg-controlando-as-versoes-do.html "Excelente post sobre Mercurial, TI e gerência de projetos"
[*mercurial*: *the definitive guide*]: http://hgbook.red-bean.com/read/ "Excelente e-book de Bryan O'Sullivan sobre Mercurial"
