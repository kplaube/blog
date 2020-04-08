---
title: Assegure a qualidade do seu código Python - Dodgy
date: 2019-12-18 08:10:00
tags: ["python", "qualidade", "linter", "seguranca", "dodgy"]
slug: assegure-qualidade-seu-codigo-python-dodgy
thumbnail: ./images/python-logo.png
---

Ferramentas de [qualidade de código](/tag/qualidade.html "Leia mais sobre qualidade") parece um tópico com conteúdo infinito
quando o assunto é [_Python_](/tag/python.html "Leia mais sobre Python"). Hoje a dica é rápida e rasteira, de uma ferramenta
extremamente simples, mas que pode ser muito útil para dar aquele "up" no quesito segurança do seu projeto. Apresento-lhe
o [_Dodgy_](https://github.com/landscapeio/dodgy "Veja o repositório no Github")!

## Talk is cheap...

Tudo começa com o nosso queridíssimo comando `pip install`:

```text
$ pip install dodgy
```

E na sequência, com a execução do utilitário via terminal:

```text
$ cd ~/hello-world-em-django/
$ dodgy
{
    "warnings": [
        {
        "path": "hello_world/settings.py",
        "line": 23,
        "code": "secret",
        "message": "Possible hardcoded secret key"
        }
    ]
}
```

O _Dodgy_ é uma ferramenta de código aberto, que tem
por objetivo utilizar expressões regulares para inspecionar o seu código e identificar problemas como `diffs` esquecidos
nos arquivos, senhas expostas, e _secrets_ (como o exemplo acima) sendo "commitados". A biblioteca é extremamente simples,
e caso você não goste do "barulho" que o [_Bandit_](/2019/02/21/assegure-qualidade-seu-codigo-python-bandit.html "Leia mais sobre Bandit")
faz, pode ser uma alternativa.

![Trinity em The Matrix](./images/dodge-this.png "Desvia disso! (vulturehound.co.uk)")

E claro, podemos utilizá-la com o [_pre-commit_](https://pre-commit.com/ "pre-commit hooks"). Adicione o seguinte _snippet_ ao `.pre-commit-config.yaml` do seu projeto:

```yaml
repos:
- repo: https://github.com/kplaube/pre-commit-dodgy
    rev: "0.0.1"
    hooks:
    - id: dodgy
```

Podemos utilizá-la nos editores também. Ganhamos o utilitário "de graça" com o uso do [_Prospector_](https://prospector.readthedocs.io/en/master/index.html "Python Static Analysis").

## Considerações finais

Para quem está dando os primeiros passos em direção a um controle mais apurado de um projeto, o _Dodgy_ pode ser uma boa pedida. Mas na realidade, se você está querendo de fato maior segurança, vá para o [_Bandit_](https://github.com/PyCQA/bandit "Find common security issues in Python code"), sem medo de ser feliz.

Ou utilize o _Prospector_ e tenha os dois à disposição ¯\\\_(ツ)\_/¯

Até a próxima.
