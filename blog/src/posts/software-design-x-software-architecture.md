---
title: Software Design x Software Architecture
date: 2020-01-07 16:00:00
modified: 2023-11-12 19:41:00
tags: ["arquitetura-de-software", "design-de-software", "agile", "safe"]
slug: software-design-software-architecture
thumbnail: ./images/postits.jpg
---

Uma das características que eu mais gosto no [_agile_](/tag/agile.html "Leia mais sobre ágil")
é o conhecimento compartilhado nos times. E eu não falo apenas dos desenvolvedores generalistas,
falo também das responsabilidades que em um modelo mais parecido com o
_waterfall_ seriam atribuídas a um indivíduo apenas, mas que no ágil são diluídas na equipe.

Como o time geralmente trabalha em um escopo focado,
com quem fica a responsabilidade da arquitetura de toda uma solução?
Quem pensa no longo prazo? Na comunicação entre serviços e componentes?

Até onde vai a responsabilidade de _design_ e começa a de arquitetura?

## Definição

Fundamentalmente, há distinção entre as disciplinas de _software design_ e
_software architecture_:

- **Software design**: Foca nos aspectos mais "baixo nível" do sistema;
- **Software architecture**: Olha para aspectos mais "alto nível" do sistema.

![Oráculo e Neo em The Matrix](/media/matrix-filosofia.jpg "Calma! Não vamos misturar filosofia e programação. Mas piadas com o The Matrix estão liberadas (rottenmelon.tripod.com)")

Mesmo assim, não é raro misturarmos as duas responsabilidades e atribuí-las a um papel só. O que não é
necessariamente um problema, já que as disciplinas podem ser encaradas como o mesmo problema
em escalas diferentes.

## Software Architecture

Definir arquitetura de _software_ é um desafio. O [_Wikipedia_](https://pt.wikipedia.org/wiki/Arquitetura_de_software "Arquitetura de Software no Wikipedia") define o termo da seguinte forma:

> (...) consiste na definição dos componentes de software, suas propriedades externas, e seus relacionamentos com outros softwares. O termo também se refere à documentação da arquitetura de software do sistema. A documentação da arquitetura do software facilita: a comunicação entre os stakeholders, registra as decisões iniciais acerca do projeto de alto-nível, e permite o reúso do projeto dos componentes e padrões entre projetos.

Eu me dou conta que estou nos "domínios" da arquitetura de _software_ quando estou debatendo as "ilities" de um projeto. Portanto, a definição do [_Codeburst_](https://codeburst.io/software-architecture-the-difference-between-architecture-and-design-7936abdd5830 "Software Architecture - The Difference Between Architecture and Design") casa melhor com a minha compreensão sobre o assunto:

> In simple words, software architecture is the process of converting software characteristics such as flexibility, scalability, feasibility, reusability, and security into a structured solution that meets the technical and the business expectations. This definition leads us to ask about the characteristics of a software that can affect a software architecture design. There is a long list of characteristics which mainly represent the business or the operational requirements, in addition to the technical requirements.

Portanto, quando há um requisito de produto que demanda rápida adaptação do modelo de negócios, pois a empresa ainda está procurando o seu _market fit_, a solução poderia ser **extensível**, **modular** e de **fácil alteração**. Essas qualidades possivelmente não se encaixarão em um projeto de perfil mais conservador, como um sistema bancário, por exemplo, que teria como uma provável _ility_ a **segurança**.

![O Keymaker em The Matrix](/media/the-matrix-the-keymaker.jpg "Quem tem que lidar com certificados no cotidiano reza para ter um Keymaker na empresa (reddit.com)")

[Confira uma lista completa de _system quality attributes_](https://en.wikipedia.org/wiki/List_of_system_quality_attributes "Veja a lista no Wikipedia").

Esses aspectos são de responsabilidade do arquiteto de _software_ de levantar, debater, e de setar como _boundaries_ do projeto em questão. Sem dúvida elas passam a influenciar o _design_ dos componentes que serão construídos durante o tempo de projeto.

### O arquiteto

_Kostadis Roussos_, no breve (mas excelente) ["21 architecturalist papers: always be right, right now."](https://medium.com/@kostadisroussos/21-architecturalist-papers-always-be-right-right-now-1552af8dc330 "Leia na íntegra no Medium") define o papel do arquiteto salientando o seguinte atributo:

> An architect has visions of the future, and those visions are often years away from delivery, and worse, even more years away from solving any of the immediate problems engineering management has.

Segundo _Kostadis_, o arquiteto precisa guiar o projeto para a direção correta. Dentro do contexto ágil, sabemos que essa direção pode mudar, mas ainda assim o arquiteto deve ser capaz de se adaptar a essa mudança, mudar o curso, e continuar fazendo com que o projeto siga o caminho certo.

![O arquiteto em The Matrix](/media/the-architect.png "Não é desse arquiteto que estamos falando (quora.com)")

Além de ser "high-level o suficiente" para ter a visão do todo, o arquiteto ainda é responsável por gerenciar expectativas de gerentes, diretores, _product owners_, e até mesmo dos próprios engenheiros. E em relação à engenharia a balança pode ser ainda mais frágil, uma vez que ele deve ser "distante o suficiente" para que um _gap_ criativo seja formado, e que engenharia tenha a oportunidade de inovar.

Então chegamos ao melhor parágrafo do texto de _Roussos_:

> In short, you need to be right, and high-level enough that you can’t be wrong, but if that’s where you end, you fail.

_Chris Richardson_, no livro [_Microservices Patterns_](https://www.goodreads.com/book/show/34372564-microservice-patterns?ac=1&from_search=true&qid=cFhoy0HIPb&rank=1 "Veja no Goodreads"), estressa um pouco mais sobre a importância desse papel:

> Architecture is important because it enables an application to satisfy the second category of requirements: its quality of service requirements. These are also known as quality attributes and are the so-called -ilities. The quality of service requirements define the runtime qualities such as scalability and reliability. They also define development time qualities including maintainability, testability, and deployability. The architecture you choose for your application determines how well it meets these quality requirements.

### Padrões e ferramentas

Encontramos alguns estilos já estabelecidos e bem conhecidos de arquiteturas que resolvem combinações de qualidades, como o caso do [_Monolithic Architecture_](https://microservices.io/patterns/monolithic.html "Leia mais no microservices.io"), [_Event-Driven (Implicit Invocation) Architecture_](https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven "Leia mais na documentação do Azure"), e talvez o mais "hypado", [_Microservices Architecture_](https://www.infoq.com/br/news/2014/07/introducing-microservices/ "Leia a introdução no InfoQ").

Eles podem fazer uso de um ou mais padrões de arquitetura, como por exemplo, a arquitetura monolítica pode ser composta pelos padrões [_n-tier_](https://en.wikipedia.org/wiki/Multitier_architecture "Leia na íntegra no Wikipedia") e [_model-view-controller_](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller "LEia na íntegra no Wikipedia").

![Neo e Arquiteto em The Matrix](/media/the-matrix-architect-neo.jpg "Não é só de terno e vis-a-vis que vive um arquiteto (lascimmiapensa.com)")

[Lista de estilos e padrões de arquitetura de _software_](https://en.wikipedia.org/wiki/List_of_software_architecture_styles_and_patterns "List of software architecture styles and patterns").

Algumas ferramentas estão disponíveis para auxiliar o arquiteto na tarefa de modelar a solução, bem como de expor determinados detalhes para diferentes tipos de _stakeholders_. Talvez a _top of mind_ seja a própria [_UML_](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/modeling-software-architecture-with-package/ "UML: Modeling Software Architecture with Packages"). Outra opção é o _4 + 1 architectural view model_, que é uma espécie de _framework_ que auxilia na separação de diferentes aspectos do sistema em diferentes visões (que podem inclusive utilizar artefatos da _UML_ para os seus propósitos).

As visões são:

- **Logical view:** Preocupa-se com a funcionalidade que o sistema provê para o usuário final. Utiliza [diagramas de classe](https://en.wikipedia.org/wiki/Class_diagram "Class diagram") e de [estado](https://en.wikipedia.org/wiki/State_diagram "State diagram") da _UML_, e é relevante para desenvolvedores;
- **Process view:** Descreve processos concorrentes dentro de um sistema. Pode englobar requisitos não funcionais, como performance e disponibilidade, e é representado através do [diagrama de atividade](https://www.tutorialspoint.com/uml/uml_activity_diagram.htm "Activity diagram") da _UML_;
- **Development view:** Foca na ótica do programador, e descreve componentes do sistema. Utiliza o diagrama de [componente](https://en.wikipedia.org/wiki/Component_diagram "Component diagram") e de [pacote](https://en.wikipedia.org/wiki/Package_diagram "Package diagram").
- **Physical view:** Descreve a topologia do sistema de uma perspectiva física. Por exemplo, quantos nós são utilizados, o que é "deployado" em cada nó, como escala, etc. Utiliza o [diagrama de _deploy_](https://en.wikipedia.org/wiki/Deployment_diagram "Deployment diagram") da _UML_;
- **Use case view:** Descreve a funcionalidade do sistema da perspectiva do mundo exterior, ou seja, ilustra o que o sistema deveria fazer através de cenários, que são determinantes para identificar elementos da arquitetura e validar _design_. Utiliza casos de uso da _UML_, e todas as outras visões utilizam dessa (e de seus cenários) para guiá-las.

[Assista à introdução ao _4 + 1_ no Coursera](https://www.coursera.org/lecture/software-architecture/3-1-2-kruchtens-4-1-model-view-z65ZO "Kruchten's 4 + 1 Model View").

Para finalizar, outra prática bem interessante é a escrita de [_Quality Attribute Scenarios_](https://etutorials.org/Programming/Software+architecture+in+practice,+second+edition/Part+Two+Creating+an+Architecture/Chapter+4.+Understanding+Quality+Attributes/4.3+System+Quality+Attributes/ "Leia o artigo na íntegra"), que são requisitos não funcionais, específicos para mensurar a qualidade da sua solução para problemas específicos.

![Exemplo de Quality Attributes revisados](/media/example-quality-attributes.png)

[Veja mais na excelente aula do _Coursera_ sobre _Quality Attributes_](https://www.coursera.org/lecture/software-architecture/3-3-1-quality-attributes-xAwkW "Quality Attributes").

## Software Design

O [curso _Object-Oriented Design_](https://www.coursera.org/learn/object-oriented-design/ "Object-Oriented Design no Coursera"),
da Universidade de Alberta, define _software design_ da seguinte forma:

> The process of planning a software solution, taking the requirements and constraints into account.
> Divided into higher-level conceptual design and more specific technical design.

O foco está em pensar na solução para um problema específico, projetando detalhes de um determinado
componente e suas responsabilidades, e utilizando de artefatos que ajudem no debate
com a camada mais próxima de negócios (_high-level_, mais conceitual) e mais próxima de implementação
(_low-level_, técnica).

![Mouser em The Matrix](/media/the-matrix-mouser.jpg "Um viva para o designer da Mulher de Vermelho (ballardwachowskiproject.wordpress.com)")

Esse passo tem presença constante no início das iterações no modelo iterativo/incremental, e pode ser desempenhado
por diferentes papéis dentro de um time (naturalmente, com envolvimento dos desenvolvedores).

### Design conceitual

Partimos do princípio que tudo origina-se de um requisito:

```text
Quero ver a minha lista de músicas favoritas.
```

Requisitos podem ser "funcionais" (como o exemplo acima), ou "não funcionais" (como o exemplo de "ilities" da seção anterior).
Quando falamos de _design_ conceitual, geralmente nos referimos ao primeiro tipo, e através de discussões mais próximas do problema exploramos soluções.

Nessa etapa é comum lidar com ferramentas, preferencialmente de baixo custo e fácil alteração, que consigam
"traduzir" a solução sendo discutida em artefatos visuais, como por exemplo:

- **Diagramas de alto nível:** Para exemplificar relacionamentos entre o usuário, interface e demais componentes (não técnico);
- **Wireframes:** Para discutir elementos em uma interface de usuário;
- **Protótipos:** Para demonstrar comportamentos;
- **Mockups:** Para refletir decisões de _design_ como cores, _layouts_, tipografia, interações, etc.

Uma outra forma de debatermos requisitos sob uma ótica conceitual é através da construção de _user stories_. Com elas,
podemos tomar algumas liberdades para sermos mais específicos sobre as necessidades e expectativas que precisam ser atendidas:

```text
Eu como um usuário autenticado,
Quero poder visualizar as minhas músicas favoritas,
Para que eu consiga ouví-las com facilidade e maior frequência.
```

### Design técnico

Com o _design_ técnico, estamos enfim discutindo aspectos voltados à "solução prática". Mas nem por isso deixamos de ser expostos a abstrações, como por exemplo, se você estiver utilizando [_OOP_](/tag/oop.html "Leia mais sobre Orientação a Objetos"):

- [Diagrama de Entidade e Relacionamento (ER)](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-entidade-relacionamento "O que é um diagrama de entidade e relacionamento?"): Caso você esteja partindo da ótica do seu banco de dados;
- [_UML_](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-uml/ "What is Unified Modeling Language?"): Caso você queira esquematizar relacionamentos e ciclo de vida dos seus componentes;
- [Cartões _CRC_](https://atomicobject.com/resources/oo-programming/crc-cards "CRC Cards"): Uma alternativa mais "barata" ao _UML_, útil para descrever relacionamentos entre entidades.

Ainda utilizando o contexto de orientação a objetos, outro tópico que pode aparecer nesse momento são os [_Design Patterns_](/tag/design-patterns.html "Leia mais sobre Design Patterns"). No caso da construção de [_APIs_](/tag/api.html "Leia mais sobre APIs"), uma possibilidade é a construção do contrato via [_Swagger file_](/2017/11/25/swagger-e-o-open-api-initiative.html "Swagger e o Open API Initiative"). Enfim, estamos mais próximos de ideias e artefatos que representem de fato o sistema.

![Tank em The Matrix](/media/the-matrix-tank.jpg "Existem ferramentas que te permitem abstrair todo aquele caractere verde escorrendo pelo seu monitor (reddit.com)")

Independente de qual estilo de programação você esteja usando, ou de qual região da aplicação você esteja desenvolvendo, é nesse momento que acontecem discussões sobre os _trade-offs_ entre as qualidades (_code quality_, _security_, _usability_, _performance_, _time to market_, etc) definidas pelo contexto do seu projeto, bem como outros requisitos não funcionais, e como isso impactará o _design_ (e se o mesmo precisa ser alterado para encontrar o balanço ideal).

## Onde cada um se encaixa?

Não é difícil imaginar o papel de _design_ sendo exercido no início de cada iteração, ou em _plannings_ e _groomings_. Além disso,
ter essa responsabilidade diluída no time é natural em um contexto multidisciplinar.

Ele pode acontecer também "ahead of time". Por exemplo, participei de projetos dos quais os "UXizes" estavam alguns _sprints_ na frente, em
relação aos desenvolvedores. Algumas decisões de _design_ são tomadas com antecedência, e os resultados são apresentados ao longo do tempo de vida do projeto.

Já a arquitetura pode exigir um pouco mais de organização e criatividade. Já tive diferentes experiências com esse dilema "agile x software architecture":

- **Todo mundo é arquiteto:** É o mesmo princípio do marco de _design_ ilustrado acima. Comum em _startups_ e empresas relativamente pequenas;
- **A gerência é o arquiteto:** Pode acontecer de gerentes técnicos, _team leads_, ou _CTOs_ "herdarem" essa responsabilidade. Outro cenário comum em _startups_;
- **Um arquiteto por time:** O papel é atribuído a um grupo de pessoas que compartilha uma visão em comum, e essas transitam entre os times afim de manter a visão coesa. "Casa" com a proposta de [_squads_, _chapters_ e _tribes_ do _Spotify_](https://medium.com/productmanagement101/spotify-squad-framework-part-i-8f74bcfcd761 "Spotify Squad framework — Part I");
- **Um time de arquitetos:** O mesmo fenômeno que pode acontecer com _UI_/_UX_. Nesse caso temos um time específico para arquitetura, com seu próprio processo e _backlog_, e ele acaba colaborando com os demais times.

E **quando** ela deve ser exercida pode ser outro desafio. _Miguel Arlandy_ sugere o seguinte processo no ["Software Architecture and Agile. Are they both really compatible?"](https://medium.com/quick-code/software-architecture-and-agile-are-they-both-really-compatible-c1eef0afcbb1):

> (...) As a rule, it would be recommended to do some upfront design at the beginning of the project (Sprint Zero?) and before the first iteration. Besides, we should include an “Architecture review” as part of the Definition of Done (DoD) in each user story. Of course within the Sprint Planning, this fact has to be taken into account. It would be worthwhile if at least one of the team members (if not all of them) will be accountable to ensure both product development and Architecture are aligned.

Uma das possíveis respostas para as perguntas do início desse _post_ é o conceito de [_Agile Architecture_](https://www.scaledagileframework.com/agile-architecture/ "Agile Architecture in SAFe"), usado pelo [_SAFe Framework_](https://www.scaledagileframework.com/ "Scaling Agile"):

> (...) is a set of values, practices, and collaborations that support the active, evolutionary design and architecture of a system. This approach embraces the DevOps mindset, allowing the architecture of a system to evolve continuously over time, while simultaneously supporting the needs of current users. It avoids the overhead and delays associated with the start-stop-start nature and large-scale redesign inherent with phase-gate processes and Big Up Front Design (BUFD).

Onde, resumidamente, inicia-se com um pouco de _upfront design_ que é retroalimentado pelos _feedbacks_, _design_ e decisões futuras dos times autônomos.

![Nível de abstração entre Arquiteto e Time](/media/safe-design-architecture.png "Exemplo de regulação entre arquitetura e design (medium.com)")

Desse modo, teoricamente, é possível ter uma referência sólida de arquitetura, e ainda assim abrir espaço para inovação e alterações nessa referência. Outro aspecto interessante desse modelo é que é possível imaginá-lo com a proposta de _squads_ do _Spotify_.

## Considerações finais

Acredito que o _agile_ e sua comunidade amadureceram o suficiente para compreender que alguns papéis mais "tradicionais" do desenvolvimento de _software_ precisam ser integrados à sua dinâmica. Quando em uma _startup_, em que ainda é possível se ter a "visão do todo", é completamente natural que engenheiros/desenvolvedores assumam responsabilidades de _design_ e arquitetura. Mas em um contexto mais "enterprise", além de difícil, consome-se muito tempo "tentando tirar a cabeça da areia" e olhar em volta, principalmente se o processo esteja montado em torno de times autônomos.

Independente de quem desempenhe tais papéis, essa característica "iterativa/incremental" que conceitos como o _Agile Architecture_ trazem são bem interessantes, e combinam completamente com os valores que desenvolvedores de _software_ mais se identificam quando adotando ferramentas ágeis.

Até a próxima.

## Referências

- [Atomic Object - CRC Cards](https://atomicobject.com/resources/oo-programming/crc-cards)
- [Codeburst.io - Software Architecture: The Difference Between Architecture And Design](https://codeburst.io/software-architecture-the-difference-between-architecture-and-design-7936abdd5830)
- [Coursera - Object-Oriented Design](https://www.coursera.org/learn/object-oriented-design/home/welcome)
- [DZone - The “4+1” View Model of Software Architecture](https://dzone.com/articles/%E2%80%9C41%E2%80%9D-view-model-software)
- [Experience UX - What is wireframing?](https://www.experienceux.co.uk/faqs/what-is-wireframing/)
- [Lucidchart - O que é um diagrama entidade relacionamento?](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-entidade-relacionamento)
- [Medium - 21 architecturalist papers: always be right, right now.](https://medium.com/@kostadisroussos/21-architecturalist-papers-always-be-right-right-now-1552af8dc330)
- [Medium - What is Software Development?](https://medium.com/@designveloper.com/what-is-software-development-862fdcccd3b)
- [Quick Code - Software Architecture and Agile. Are they both really compatible?](https://medium.com/quick-code/software-architecture-and-agile-are-they-both-really-compatible-c1eef0afcbb1)
- [Scaled Agile Framework - Agile Architecture in SAFe](https://www.scaledagileframework.com/agile-architecture/)
- [UXPin - What is a Mockup: The Final Layer of UI Design](https://www.uxpin.com/studio/blog/what-is-a-mockup-the-final-layer-of-ui-design/)
- [Visual Paradigm: What is Unified Modeling Language (UML)?](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-uml/)
- [Visual Paradigm: Modeling Software Architecture with Packages](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/modeling-software-architecture-with-package/)
- [Wikipedia - Requisito não funcional](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional)
