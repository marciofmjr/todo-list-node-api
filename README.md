<div id="top"></div>

<br />
<div align="center">
  <img src="docs/images/node-logo-api.png" alt="Logo" width="80" height="80">
  <h3 align="center">To Do List: <strong>API</strong></h3>
</div>


### Preview
O projeto está publicado e pode ser acessado através do link: https://todo-list-ionic.vercel.app/

### Sobre o projeto

Esse projeto foi desenvolvido com o intuito de estudar e melhorar as técnicas de desenvolvimento usando novas tecnologias, ferramentas e padrões.

Essa aplicação é uma lista de tarefas, usada para gerenciar items que precisam ser feitos.

#### Essa aplicação é composta por 2 projetos:
- <strong>Backend</strong>: API feita com Node.JS
- <strong>Frontend</strong>: Painel feito com Ionic + Angular

<br>

<strong>Esse repositório remete ao projeto do backend</strong>, <a href="https://github.com/marciofmjr/todo-list-ionic" target="_blank">para acessar o projeto do frontend, clique aqui</a>

<div align="center">
  <img src="https://github.com/marciofmjr/todo-list-ionic/raw/master/docs/images/preview.png" alt="Logo" width="600">
</div>

### Construído com

Esse projeto foi construído utilizando as tecnologias, ferramentas e técnicas abaixo:

* [Node.js](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)
* [Prisma](https://www.prisma.io/)
* [Jest](https://jestjs.io/)
* [Faker](https://github.com/tamnil/Faker-br)
* [Husky](https://github.com/typicode/husky)
* [Github Actions](https://github.com/features/actions)
* [Heroku](https://www.heroku.com/)

### Cobertura de testes:
<img src="docs/images/tests.png" alt="Cobertura de testes" width="700">

### Iniciando

#### Pré-requisitos:
- É necessário de ter o Node instalado

#### Configuração:
- Antes de iniciar o projeto pela primeira vez, é necessário criar o arquivo <strong>.env</strong> na raiz do projeto com o seguinte conteúdo:
```
DATABASE_URL="postgresql://root:root@localhost:6655/todolist_postgres_dev"
```

Para iniciar o projeto, execute os comandos abaixo:
```bash
# entre na pasta do projeto clonado
cd ~/pasta-do-repo-clonado

# instale as dependências do projeto
npm install

# para gerar o build do projeto
npm run build

# para iniciar o servidor com api
npm run start

# alternativa ao: npm run start, para usar para desenvolvimento (auto-reload)
npm run dev

# para rodar os testes da aplicação
npm run test
```

Se tudo estiver OK, o projeto vai estar rodando no link:
- http://localhost:3020/

### Contato

Marcio Junior - [@marciofmjr](https://twitter.com/marciofmjr) - marciofmjr2@gmail.com
