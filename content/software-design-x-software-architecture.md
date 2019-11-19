title: Software Design x Software Architecture
date: 2019-12-21 16:34:00
category: desenvolvimento
tags: desenvolvimento, análise, arquitetura-de-software, design-de-software
slug: software-design-software-architecture
Image: /images/blog/postits.jpg
Alt: Post-its

Uma das características que eu mais gosto no [_agile_]({tag}agile "Leia mais sobre ágil")
é a valorização do conhecimento compartilhado nos times. E eu não falo apenas dos desenvolvedores generalistas,
falo também das responsabilidades que em um modelo mais parecido com o
_waterfall_ seriam atribuídas a um indivíduo apenas, mas que no ágil são diluídas no time.

<!-- PELICAN_END_SUMMARY -->

Como o time geralmente trabalhando em um escopo focado (principalmente quando estamos falando
de [_Scrum of Scrums_](<https://www.agilealliance.org/glossary/scrum-of-scrums/#q=~(infinite~false~filters~(postType~(~'page~'post~'aa_book~'aa_event_session~'aa_experience_report~'aa_glossary~'aa_research_paper~'aa_video)~tags~(~'scrum*20of*20scrums))~searchTerm~'~sort~false~sortDirection~'asc~page~1)> "Leia uma breve definição sobre o assunto")), com quem fica a responsabilidade da arquitetura de toda uma solução?
Quem pensa no longo prazo? Na comunicação entre serviços e componentes?

Teria o papel de arquiteto de _software_ o mesmo destino do de analista de sistemas?
Onde é que o _design_ de _software_ se encaixa nessa história toda?

Fundamentalmente, há uma clara distinção entre as disciplinas de _software design_ e
_software architecture_:

- **Software design**: Foca nos aspectos mais "baixo nível" do sistema;
- **Software architecture**: Olha para aspectos mais "alto nível" do sistema.

Mesmo assim, não é raro misturarmos as duas responsabilidades e atribuí-las a um papel só.

## Software Design

O [curso _Object-Oriented Design_](https://www.coursera.org/learn/object-oriented-design/ "Object-Oriented Design no Coursera"),
da Universidade de Alberta, define _design_ da seguinte forma:

> The process of planning a software solution, taking the requirements and constraints into account.
> Divided into higher-level conceptual design and more specific technical design.

O foco está em pensar na solução para um problema específico, projetando detalhes de um determinado
componente e suas responsabilidades, e utilizando de artefatos que ajudem no debate
com a camada mais próxima de negócios (_high-level_, mais conceitual) e mais próxima de implementação
(_low-level_, técnica).

Esse passo tem presença constante no início das iterações no modelo iterativo/incremental, e pode ser desempenhado
por diferentes papéis dentro de um time (naturalmente, com envolvimento dos desenvolvedores).

### Design conceitual

### Design técnico

### CRC

## Software Architecture

### UML

## Referências

- https://www.synopsys.com/software-integrity/resources/knowledge-database/software-architecture.html
- https://www.tutorialspoint.com/software_architecture_design/introduction.htm
- https://codeburst.io/software-architecture-the-difference-between-architecture-and-design-7936abdd5830
- https://www.coursera.org/learn/object-oriented-design/lecture/91ABf/1-1-4-software-requirements-conceptual-and-technical-designs
