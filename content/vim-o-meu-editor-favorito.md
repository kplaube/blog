Title: Vim: O meu editor favorito
Date: 2013-03-04 22:34:38
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, editores-de-texto, vim
Slug: vim-o-meu-editor-favorito
meta_description: Há um bom tempo que eu trabalho com o Vim, não pretendo contar a sua história nem ensinar a usá-lo, vou simplesmente apresentar os motivos pelo qual eu gosto desse simpático editor de textos.


{% img representative-image /images/blog/vim-logo.png 180 180 Logo do editor VIM %}
Há um bom tempo que eu trabalho com o [*Vim*][],
tanto tempo que quando estou em qualquer outro editor escrevo **:wq**
para salvar e sair.

Mas não comecei a utilizar o *Vim* por gostar de desafios… foi pura
necessidade! Trabalhei em uma empresa onde desenvolvíamos em uma máquina
remota, através de linha de comando. Logo, entre o *Vim* e *Emacs* (ou
ficar subindo arquivos via *FTP* ou *SSH*), optei pelo mais fácil de
usar. É claro que no início eu não conseguia encontrar facilidade de
jeito nenhum. Navegar pelas teclas **h**, **j**, **k** e **l** não fazia
sentido nenhum para mim, sem falar que (segundo os meus colegas de
trabalho) utilizar o **PageUp** , **PageDown**, **Home** e **End** era
praticamente uma heresia.

<!-- PELICAN_END_SUMMARY -->

Mas aos poucos o editor foi conquistando a minha simpatia, e foi me
mostrando as suas principais virtudes em relação a outras aplicações. É
fato que não sou nenhum “guru” no assunto, mas me sinto na obrigação de
compartilhar alguns dos pontos que mais me chamaram a atenção com o uso
do *Vim*.


Todas as teclas ao alcance das mãos
-----------------------------------

Não vou contar a [história do *Vim*][], muito menos ficar explicando
como [utilizar a ferramenta][]. Eu vou simplesmente apresentar os
motivos pelo qual eu gosto desse simpático editor de textos.

A principal vantagem em usar o *Vim* é que você tem controle total sobre
o conteúdo, sem necessitar movimentar muito as suas mãos. O uso de
*mouse* é totalmente dispensável, sem falar da interface gráfica. Hoje,
com variações como o *Gvim*, *MacVim* e *Pida*, temos algumas
facilidades e melhorias na experiência de uso (principalmente pelo uso
da *GUI*), em relação ao “*Vim* puro”, que tornam o dia-a-dia muito mais
fácil e prático.

{% img align-center /images/blog/vim-layout.png 600 199 Teclas do VIM %}

Outro ponto interessante é que seja no *Linux*, *Mac* ou *Windows*, a
experiência básica é a mesma. Você “sofre” menos com o *layout* do
teclado, principalmente pelo fato do editor “abolir” o uso de
direcionais, e manter a experiência mais “uniforme” independentemente da
plataforma.


Customizações
-------------

Outra característica muito importante do *Vim* é a sua customização. É
possível alterar desde comportamentos básicos como fonte de texto,
cores, teclas de atalho e navegação, até comportamentos mais avançados
como a [exibição de uma árvore de arquivos][].

É possível criar *plugins* utilizando [*Python*][], *Lua*, *Perl*,
*Ruby*, etc. O editor também possui uma linguagem própria de *scripts*
chamada [*Vimscript*][]. No *site* do *Vim* você pode conferir uma
[extensa lista de *plugins*][]. Também é possível acompanhar o
desenvolvimento de [extensões no *GitHub*][].

Um dos *plugins* mais sensacionais é o [*Vundle*][]. Trata-se de um
gerenciador de extensões, onde de maneira muito simples é possível
instalar e atualizar os mais variados tipos de soluções para o editor.
Com ele, fica muito mais fácil [versionar e distribuir o seu *vimrc*][]
para o seu grupo de trabalho.

Abaixo estão algumas extensões que não podem faltar no meu ambiente de
trabalho:

* [*ctrlp.vim*][] – Encontre arquivos e *tags* em seus projetos
* [*nerdtree*][] – Explore o seu projeto através de uma árvore de
    diretórios
* [*syntastic*][] – Verificador de sintaxe que abrange *Python*,
    *Ruby*, *PHP*, *Javascript*, etc
* [*vim-fugitive*][] – Um *wrapper* para utilizar o *Git* sem sair do
    *Vim*
* [*vim-powerline*][] – Adicione uma *statusline* mais eficiente ao
    seu *Vim*
* [*Wombat*][] – Um excelente tema para o editor


Free e open source
------------------

E por último mas não menos importante: O *Vim* é livre, e de código
aberto.

A sua licença de uso é peculiar, já que é compatível com a
*GNU GPL*, mas possui cláusulas que incentivam
doações para [crianças em Uganda][]. Uma causa muito nobre do autor da
ferramenta, *Bram Moolenaar*, que além de manter o *Vim* e fazer
caridade, participa de outros tantos projetos de código aberto.


Considerações finais
--------------------

Algumas ferramentas acabam cativando os seus usuários de tal modo, que
os pontos negativos acabam sendo (propositalmente) esquecidos. No meu
caso o *Vim* é uma dessas ferramentas, e embora eu entenda as críticas
em relação a sua curva de aprendizado, ainda assim o acho mais prático
que muita ferramenta moderna que tem “pipocado” recentemente.

Se você tem interesse, ou acha um desafio interessante utilizar o *Vim*,
eu recomendo que pule de cabeça agora mesmo. Não espere para acabar
aquele manual (ou tutorial) que você vem “negligenciando” há meses. A
maneira mais divertida é ir aprendendo de acordo com a necessidade.

Até a próxima…


  [*Vim*]: http://www.vim.org/
    "Página oficial do Vim"
  [história do *Vim*]: http://en.wikipedia.org/wiki/Vim_(text_editor)
    "Leia mais sobre o Vim na Wikipedia"
  [utilizar a ferramenta]: http://aurelio.net/vim/
    "o site do Aurélio é um dos melhores locais para se aprender Vim"
  [exibição de uma árvore de arquivos]: http://net.tutsplus.com/tutorials/other/vim-essential-plugin-nerdtree/
    "Conheça o NerdTree"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*Vimscript*]: http://en.wikipedia.org/wiki/Vimscript
    "Saiba mais sobre a Vimscript no Wikipedia"
  [extensa lista de *plugins*]: http://www.vim.org/scripts/index.php
    "Vim scripts"
  [extensões no *GitHub*]: https://github.com/vim-scripts
    "vim-scripts no GitHub"
  [*Vundle*]: https://github.com/gmarik/vundle
    "Repositório do Vundle no GitHub"
  [versionar e distribuir o seu *vimrc*]: https://github.com/kplaube/vimfiles
    "Veja o meu vimrc no GitHub"
  [*ctrlp.vim*]: https://github.com/kien/ctrlp.vim
    "Ctrlp no GitHub"
  [*nerdtree*]: https://github.com/scrooloose/nerdtree
    "Nerdtree no GitHub"
  [*syntastic*]: https://github.com/scrooloose/syntastic
    "Syntastic no GitHub"
  [*vim-fugitive*]: https://github.com/tpope/vim-fugitive
    "Vim-fugitive no GitHub"
  [*vim-powerline*]: https://github.com/Lokaltog/vim-powerline
    "Vim-powerline no GitHub"
  [*Wombat*]: https://github.com/vim-scripts/Wombat
    "Wombat no GitHub"
  [crianças em Uganda]: http://www.iccf.nl/news.html
    "Leia os relatórios ICCF"
