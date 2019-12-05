title: Software Design x Software Architecture
date: 2019-12-21 16:34:00
category: desenvolvimento
tags: desenvolvimento, análise, arquitetura-de-software, design-de-software
slug: software-design-software-architecture
Image: /images/blog/postits.jpg
Alt: Post-its

Uma das características que eu mais gosto no [_agile_]({tag}agile "Leia mais sobre ágil")
é o conhecimento compartilhado nos times. E eu não falo apenas dos desenvolvedores generalistas,
falo também das responsabilidades que em um modelo mais parecido com o
_waterfall_ seriam atribuídas a um indivíduo apenas, mas que no ágil são diluídas na equipe.

<!-- PELICAN_END_SUMMARY -->

Como o time geralmente trabalha em um escopo focado,
com quem fica a responsabilidade da arquitetura de toda uma solução?
Quem pensa no longo prazo? Na comunicação entre serviços e componentes?

Até onde vai a responsabilidade de _design_ e começa a de arquitetura?

## Definição

Fundamentalmente, há uma clara distinção entre as disciplinas de _software design_ e
_software architecture_:

- **Software design**: Foca nos aspectos mais "baixo nível" do sistema;
- **Software architecture**: Olha para aspectos mais "alto nível" do sistema.

Mesmo assim, não é raro misturarmos as duas responsabilidades e atribuí-las a um papel só. O que não é
necessariamente um problema, já que as disciplinas podem ser encaradas como o mesmo problema
em escalas diferentes.

## Software Design

O [curso _Object-Oriented Design_](https://www.coursera.org/learn/object-oriented-design/ "Object-Oriented Design no Coursera"),
da Universidade de Alberta, define _software design_ da seguinte forma:

> The process of planning a software solution, taking the requirements and constraints into account.
> Divided into higher-level conceptual design and more specific technical design.

O foco está em pensar na solução para um problema específico, projetando detalhes de um determinado
componente e suas responsabilidades, e utilizando de artefatos que ajudem no debate
com a camada mais próxima de negócios (_high-level_, mais conceitual) e mais próxima de implementação
(_low-level_, técnica).

Esse passo tem presença constante no início das iterações no modelo iterativo/incremental, e pode ser desempenhado
por diferentes papéis dentro de um time (naturalmente, com envolvimento dos desenvolvedores).

### Design conceitual

Partimos do princípio que tudo origina-se de um requisito:

    ::text
    Quero ver a minha lista de músicas favoritas.

Requisitos podem ser "funcionais" (como o exemplo acima), ou "não funcionais" (minha lista tem que ser leve, pois opero
em uma rede móvel de baixa performance). Quando falamos de _design_ conceitual, geralmente nos referimos
ao primeiro tipo, e através de discussões mais próximas do negócio exploramos soluções para o problema levantado.

Nessa etapa é comum lidar com ferramentas, preferencialmente de baixo custo e fácil alteração, que consigam
"traduzir" a solução sendo discutida em artefatos visuais, como por exemplo:

- **Diagramas de alto nível:** Para exemplificar relacionamentos entre o usuário, interface e demais componentes (não técnico);
- **Wireframes:** Para discutirmos elementos em uma interface de usuário;
- **Protótipos:** Para demonstrar comportamentos;
- **Mockups:** Para refletir decisões de _design_ como cores, _layouts_, tipografia, interações, etc.

Uma outra forma de debatermos requisitos sob uma ótica conceitual é através da construção de _user stories_. Com elas,
podemos tomar algumas liberdades para sermos mais específicos sobre as necessidades e expectativas que precisam ser atendidas:

    ::text
    Eu como um usuário autenticado,
    Quero poder visualizar as minhas músicas favoritas,
    Para que eu consiga ouví-las com facilidade e maior frequência.

### Design técnico

Com o _design_ técnico, estamos enfim discutindo aspectos voltados à "engenharia" por trás da construção da solução conceituada anteriormente.

Nessa etapa, ainda podemos ser expostos a ferramentas visuais, como por exemplo, se você estiver fazendo uso de _OOP_:

- [Diagrama de Entidades e Relacionamento (ER)](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-entidade-relacionamento "O que é um diagrama de entidade e relacionamento?"): Caso você esteja partindo de uma abordagem de modelagem de dados a partir da ótica de banco de dados;
- UML: Caso você queira esquematizar relacionamentos e ciclo de vida dos seus componentes;
- Cartões CRC: Uma alternativa mais "barata" ao UML, útil para descrever relacionamentos entre entidades.

Ainda utilizando o contexto de orientação a objetos, outro tópico que pode aparecer nesse momento são os _Design Patterns_. No caso da construção de _APIs_, é possível que aqui apareça, por exemplo, a construção do contrato via _swagger file_.

https://www.coursera.org/learn/object-oriented-design/lecture/i53HB/1-1-5-competing-qualities-and-trade-offs

## Software Architecture

## Referências

- [Atomic Object - CRC Cards](https://atomicobject.com/resources/oo-programming/crc-cards)
- [Codeburst.io - Software Architecture: The Difference Between Architecture And Design](https://codeburst.io/software-architecture-the-difference-between-architecture-and-design-7936abdd5830)
- [Experience UX - What is wireframing?](https://www.experienceux.co.uk/faqs/what-is-wireframing/)
- [Lucidchart - O que é um diagrama entidade relacionamento?](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-entidade-relacionamento)
- [UXPin - What is a Mockup: The Final Layer of UI Design](https://www.uxpin.com/studio/blog/what-is-a-mockup-the-final-layer-of-ui-design/)
- [Wikipedia - Requisito não funcional](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional)

- https://www.synopsys.com/software-integrity/resources/knowledge-database/software-architecture.html
- https://www.tutorialspoint.com/software_architecture_design/introduction.htm
- https://www.coursera.org/learn/object-oriented-design/lecture/91ABf/1-1-4-software-requirements-conceptual-and-technical-designs
