---
title: Assegure a qualidade do seu código Python - Prospector
date: 2020-01-21 16:15:00
modified: 2023-11-08 15:46:00
tags: ["python", "qualidade", "linter", "prospector"]
slug: assegure-qualidade-seu-codigo-python-prospector
thumbnail: ./images/python-logo-2.png
---

Mais um ano, mais um _post_ sobre [ferramentas de qualidade de código](/tag/qualidade.html "Leia mais sobre qualidade"). Opções não faltam quando o assunto é [_Python_](/tag/python.html "Leia mais sobre Python"), e elas são dos mais variados fins e complexidade. Com tanta opção, não seria interessante ter "um anel para a todos governar"?

Tanto é interessante que um utilitário vem fazendo parte do _toolbelt_ dos desenvolvedores _Python_ nos últimos tempos justamente por desempenhar esse papel. Estamos falando, claro, do [_Prospector_](https://prospector.readthedocs.io/en/master/ "Leia a documentação oficial").

## One ring to rule them all

O _Prospector_ é uma ferramenta [livre](https://github.com/PyCQA/prospector/blob/master/LICENSE "Confira mais no repositório do projeto"), que analisa código _Python_ e retorna informações sobre potenciais problemas, erros de convenção de código, alertas sobre complexidade, etc.

![O Um Anel](/media/lsp-one-ring.jpeg "Sauron faz um anel para juntar a todos. Bem parecido com a ideia do prospector (lego-lord-of-the-rings.wikia.com)")

Ela agrega a funcionalidade de outras ferramentas de análise, como [_Pylint_](/2011/09/06/assegura-a-qualidade-de-codigo-python-pylint.html "Leia mais sobre o Pylint") e [_pep8_](/2011/08/26/assegure-qualidade-seu-codigo-python-pep.html "Leia mais sobre PEP8"), e disponibiliza algumas configurações padrões, permitindo assim um bom balanço entre cobertura x configuração.

O "lema" do _Prospector_ é ser "out of the box". Segundo a [documentação oficial](https://prospector.readthedocs.io/en/master/ "Leia mais na documentação do Prospector"):

> A common complaint of other Python analysis tools is that it takes a long time to filter through which errors are relevant or interesting to your own coding style. Prospector provides some default profiles, which hopefully will provide a good starting point and will be useful straight away, and adapts the output depending on the libraries your project uses.

## No terminal

Para começar, precisamos instalar a ferramenta:

```text
pip install prospector
```

Por padrão o _Prospector_ utiliza os seguintes utilitários "under the hood":

- _Pylint_
- _pep8_
- [_pyflakes_](/2011/10/02/assegure-qualidade-seu-codigo-python-pyflakes.html "Leia mais sobre o Pyflakes")
- _mccabe_
- [_dodgy_](/2019/12/18/assegure-qualidade-seu-codigo-python-dodgy.html "Leia mais sobre o Dodgy")
- _pydocstyle_

Mas alguns extras (como _mypy_) também estão disponíveis para instalação. Confira a [lista completa de ferramentas suportadas](https://prospector.readthedocs.io/en/master/supported_tools.html "Supported Tools").

Ao executá-lo, ele apontará possíveis problemas em seu projeto:

```text
$ prospector

Messages
========

my_app/views.py
  Line: 1
    pylint: unused-import / Unused render imported from django.shortcuts

manage.py
  Line: 10
    pylint: import-outside-toplevel / Import outside toplevel (django.core.management) (col 8)

my_project/settings.py
  Line: 23
    dodgy: secret / Possible hardcoded secret key

my_second_app/views.py
  Line: 1
    pylint: unused-import / Unused render imported from django.shortcuts



Check Information
=================
         Started: 2020-01-21 11:06:04.832118
        Finished: 2020-01-21 11:06:07.455090
      Time Taken: 2.62 seconds
       Formatter: grouped
        Profiles: default, no_doc_warnings, no_test_warnings, strictness_medium, strictness_high, strictness_veryhigh, no_member_warnings
      Strictness: None
  Libraries Used: django
       Tools Run: dodgy, mccabe, pep8, profile-validator, pyflakes, pylint
  Messages Found: 4

```

Ainda é possível aumentar o nível de rigorosidade:

```text
prospector --strictness veryhigh
```

Utilizando-o com o [_pre-commit_](https://pre-commit.com/ "pre-commit hooks"), tudo fica ainda mais dinâmico:

```yaml
- repo: git://github.com/guykisel/prospector-mirror
  rev: "" # Use the sha / tag you want to point at
  hooks:
    - id: prospector
```

## No VSCode

Admito que conheci o _Prospector_ por causa do [_VS Code_](/2018/06/04/eu-me-rendo-vscode.html "Eu me rendi ao VS Code"), e utilizá-lo com o editor é tão simples quanto o seu uso via linha de comando. Basta adicionar ao seu `settings.json` as seguintes diretivas:

```json
{
  "python.linting.enabled": true,
  "python.linting.prospectorEnabled": true
}
```

E após o editor resolver as dependências, ele passa a funcionar quase que magicamente.

![Exemplo de uso do Prospector + Dodgy + VS Code](/media/prospector-example.png)

## Considerações finais

Se você já está cansado de configurar diferentes ferramentas de _linting_ _Python_, o _Prospector_ pode ser um bom utilitário para manter por perto.

Tenho problemas com a "verbosidade" dele, mas acho que ele funciona bem com editores como o _VS Code_ (por exemplo). Se você quiser ser altamente criterioso em relação ao seu código, vale muito a pena testá-lo em seu processo de _pre-commit_ e durante o _build_ no _CI_.

Até a próxima.

## Referências

- [Github - prospector](https://github.com/PyCQA/prospector/)
