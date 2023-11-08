---
title: "Assegure a qualidade do seu código Python - Bandit"
date: 2019-02-21 12:45:00
modified: 2023-11-08 15:39:00
tags: ["python", "qualidade", "linter", "seguranca", "bandit"]
slug: assegure-qualidade-seu-codigo-python-bandit
thumbnail: ./images/bandit-logo.png
---

Já falamos sobre algumas ferramentas de qualidade de código [_Python_](/tag/python.html "Leia mais sobre Python") aqui no _blog_. De [_pycodestyle_](/2011/08/26/assegure-qualidade-seu-codigo-python-pep.html "Assegure a qualidade do seu código Python - pep8") a [_Clone Digger_](/2011/10/16/assegure-qualidade-seu-codigo-python-clone-digger.html "Assegure a qualidade do seu código Python - Clone digger"), passando por [_Pyflakes_](/2011/10/02/assegure-qualidade-seu-codigo-python-pyflakes.html "Assegure a qualidade do seu código Python - Pyflakes") e [_Pylint_](/2011/09/06/assegura-a-qualidade-de-codigo-python-pylint.html "Assegure a qualidade do seu código Python - Pylint"). Além do _flake8_ (que acredito não precisar de apresentações), uma ferramenta que passei a ter sempre no meu _toolbelt_ foi o [_Bandit_](https://github.com/PyCQA/bandit "Repositório do Bandit").

Na verdade, ele não é exatamente um _code linter_, mas sim uma ferramenta para testar a segurança do seu projeto _Python_. Em tempos onde cada vez mais somos expostos a falhas de segurança em aplicações, e tais falhas podem ser um fator crucial para o fracasso de um negócio, cuidado nunca é demais.

## O seguro morreu de velho

O _Bandit_ é uma ferramenta construída para encontrar problemas comuns de segurança em projetos _Python_. Livre e de código aberto ([_Apache 2_](https://github.com/PyCQA/bandit/blob/master/LICENSE "Leia mais no repositório da ferramenta")), está disponível para instalação através do `pip`:

```text
pip install bandit
```

Uma vez instalado, basta executá-lo através do terminal:

```text
bandit -r caminho-para-projeto-python
```

Note que o parâmetro `-r` acima instrui o utilitário a executar de forma recursiva, iterando sobre todos os arquivos e pastas dentro do caminho especificado. Outro parâmetro comum é o `-t`, onde é possível especificar quais testes você quer executar:

```text
bandit -r ~/Workspace/klaus/blog -t B101,B102
```

O _Bandit_ considera como vulnerabilidades desde o uso de `assert` (B101), passando pelo uso de `eval` (B307), até possíveis brechas para _SQL injection_ (B608). Uma lista completa de todos os _plugins_ está disponível na [documentação oficial](https://bandit.readthedocs.io/en/latest/plugins/index.html#complete-test-plugin-listing "Confira a lista de falhas cobertas pelo Bandit").

![Foto do filme Agarre-me Se Puderes](/media/bandit.jpg "Segurança na web é como fazer parte do filme Agarra-me Se Puderes (adorocinema.com)")

Se você utiliza _pytest_ para escrever os seus testes, o item B101 pode ser um problema, uma vez que é normal utilizar `assert` ao invés do convencional `self.assertEquals`. Nesse caso, uma das formas de contornar esse comportamento é ignorando os testes:

```text
bandit -r . -x tests/
```

Também é possível ter um arquivo de configuração (`.bandit`) na raíz do seu projeto:

```toml
[bandit]
exclude: tests
```

Para finalizar, através do parâmetro `-f` é possível emitir a saída em diferentes formatos, como _CSV_, _HTML_, _JSON_, _XML_ e _YAML_.

## Considerações finais

O _Bandit_ é aquela ferramenta perfeita para você ter em seu [_pre-commit_](https://github.com/PyCQA/bandit#version-control-integration "Veja como integrá-lo com o Git") ou em seu _CI_. Inclusive, o [_Codacy_](https://www.codacy.com/ "The standard for automated code reviews"), serviço super bacana que avalia a qualidade do seu código, utiliza o _Bandit_ em seu processo de análise. Com isso, fica fácil de integrá-lo ao seu processo de _Pull Request_/_Code Review_.

Um bom custo vs. benefício para o seu projeto.

Até a próxima.

## Referências

- [Github - Bandit](https://github.com/PyCQA/bandit)
