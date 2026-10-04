# BuscaCEP

Aplicação web para consulta de endereços brasileiros utilizando a API ViaCEP.

O projeto permite realizar consultas tanto por **CEP** quanto por **endereço**, oferecendo uma interface web responsiva integrada a uma API REST desenvolvida com Node.js, Express e TypeScript.

Além da funcionalidade de consulta, o projeto foi estruturado com foco em boas práticas de desenvolvimento, incluindo separação entre frontend e backend, tipagem com TypeScript, documentação com Swagger, testes automatizados e containerização com Docker.

---

## Funcionalidades

### Consulta por CEP

Permite consultar um endereço informando um CEP de 8 dígitos.

Exemplo:

```text
06642210
```

A aplicação retorna informações como:

- CEP
- Logradouro
- Bairro
- Cidade
- UF

### Consulta por endereço

Também é possível pesquisar possíveis CEPs utilizando:

- UF
- Cidade
- Logradouro

A busca pode retornar múltiplos resultados, que são apresentados em uma tabela paginada na interface.

### Interface responsiva

O frontend foi desenvolvido para funcionar tanto em desktop quanto em dispositivos móveis.

A interface também possui suporte a:

- modo claro;
- modo escuro;
- visualização responsiva dos resultados;
- paginação;
- realização de novas consultas sem recarregar a página.

---

## Interface

### Consulta de endereço

![Tela de consulta](./docs/images/search.png)

### Resultados da consulta CEP

![Resultados da consulta para CEP](./docs/images/CEP-Praça-da-Sé.png)

### Resultados da consulta Endereço

![Resultados da consulta para Endereço](./docs/images/Avenida-Paulista.png)

# Arquitetura

A aplicação utiliza uma arquitetura separada entre frontend e backend.

```text
                        Usuário
                           │
                           ▼
                  ┌─────────────────┐
                  │     Frontend    │
                  │                 │
                  │ React + Vite    │
                  │ TypeScript      │
                  │ Styled Components
                  └────────┬────────┘
                           │
                           │ HTTP
                           ▼
                  ┌─────────────────┐
                  │     Backend     │
                  │                 │
                  │ Node.js         │
                  │ Express         │
                  │ TypeScript      │
                  └────────┬────────┘
                           │
                           │ HTTP
                           ▼
                  ┌─────────────────┐
                  │     ViaCEP      │
                  │                 │
                  │ API externa     │
                  └─────────────────┘
```

O frontend é responsável pela interação com o usuário e apresentação dos resultados.

O backend centraliza:

- validação das entradas;
- comunicação com o ViaCEP;
- tratamento das respostas;
- tratamento de erros;
- exposição dos endpoints REST.

A aplicação não utiliza banco de dados, pois seu objetivo é realizar consultas em tempo real e não existe necessidade de persistência dos resultados.

---

# Tecnologias

## Frontend

- React
- TypeScript
- Vite
- Styled Components

## Backend

- Node.js
- Express
- TypeScript
- CORS
- Swagger

## Testes

- Vitest
- Supertest

## Infraestrutura

- Docker
- Docker Compose
- Nginx

---

# Estrutura do projeto

```text
BuscaCepDados/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── tests/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   └── ...
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   ├── package.json
│   └── package-lock.json
│
├── docker-compose.yml
└── README.md
```

---

# API

O backend disponibiliza dois endpoints principais.

## Buscar por CEP

```http
GET /api/search/cep/:cep
```

Exemplo:

```http
GET /api/search/cep/06642210
```

Exemplo de resposta:

```json
{
  "cep": "06642-210",
  "logradouro": "Rua Ametista",
  "complemento": "",
  "bairro": "Nova Higienópolis",
  "localidade": "Jandira",
  "uf": "SP"
}
```

---

## Buscar por endereço

```http
GET /api/search/address
```

Parâmetros:

| Parâmetro | Descrição | Exemplo |
|---|---|---|
| `uf` | Unidade Federativa | `SP` |
| `cidade` | Nome da cidade | `São Paulo` |
| `rua` | Logradouro | `Avenida Paulista` |

Exemplo:

```text
/api/search/address?uf=SP&cidade=São%20Paulo&rua=Avenida%20Paulista
```

A consulta pode retornar múltiplos endereços.

```json
[
  {
    "cep": "01310-100",
    "logradouro": "Avenida Paulista",
    "bairro": "Bela Vista",
    "localidade": "São Paulo",
    "uf": "SP"
  }
]
```

---

# Validações

A API realiza validações antes de consultar o serviço externo.

### CEP

O CEP deve possuir exatamente 8 dígitos.

Exemplo de entrada inválida:

```text
123
```

Resposta:

```json
{
  "error": "CEP deve possuir 8 dígitos"
}
```

### Endereço

Para realizar uma busca por endereço:

- UF deve possuir 2 caracteres;
- cidade deve possuir pelo menos 3 caracteres;
- logradouro deve possuir pelo menos 3 caracteres;
- todos os campos são obrigatórios.

Essas validações são realizadas antes da chamada ao ViaCEP, evitando requisições externas desnecessárias.

---

# Documentação da API

A API possui documentação interativa utilizando Swagger.

Com o backend em execução, a documentação pode ser acessada em:

```text
localhost:3000/api/docs/
```

Através do Swagger é possível visualizar e testar os endpoints disponíveis diretamente pelo navegador.

---

# Testes automatizados

O backend possui testes automatizados utilizando **Vitest** e **Supertest**.

Os testes validam tanto respostas HTTP quanto o comportamento interno da aplicação.

Entre os cenários testados estão:

- consulta de CEP válido;
- rejeição de CEP inválido;
- consulta de endereço válida;
- validação dos parâmetros obrigatórios;
- validação do tamanho da cidade;
- validação do tamanho do logradouro;
- validação da UF;
- retorno de múltiplos endereços;
- garantia de que entradas inválidas não realizem chamadas desnecessárias ao ViaCEP.

Uma característica importante da suíte é o uso de **mocks da função `fetch`**.

Dessa forma, os testes não dependem da disponibilidade real do ViaCEP.

Exemplo conceitual:

```text
Supertest
    │
    ▼
Express
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Mock do fetch
```

Isso torna os testes mais rápidos, previsíveis e independentes de serviços externos.

## Executando os testes

Entre no backend:

```bash
cd backend
```

Execute:

```bash
npm test
```

Para executar a suíte uma única vez:

```bash
npm run test:run
```

---

# Docker

O projeto possui Dockerfiles independentes para frontend e backend.

Isso permite que cada parte da aplicação seja construída e executada em seu próprio container.

## Backend

O Dockerfile do backend utiliza **multi-stage build**.

```text
Node.js
   │
   ├── instala dependências
   │
   ├── compila TypeScript
   │
   ▼
 dist/
   │
   ▼
imagem de produção
   │
   └── Node.js executando JavaScript compilado
```

O TypeScript é compilado durante a construção da imagem.

A imagem final executa:

```bash
node dist/server.js
```

As dependências utilizadas apenas durante desenvolvimento não precisam fazer parte da execução da aplicação.

---

## Frontend

O frontend também utiliza **multi-stage build**.

```text
Node.js
   │
   ├── instala dependências
   │
   ├── executa o build do Vite
   │
   ▼
 dist/
   │
   ▼
 Nginx
   │
   ▼
arquivos estáticos
```

O Node.js é utilizado apenas durante o processo de build.

Após a compilação, os arquivos HTML, CSS e JavaScript gerados pelo Vite são servidos pelo Nginx.

---

# Docker Compose

O Docker Compose é responsável por orquestrar os dois serviços da aplicação:

```text
Docker Compose
│
├── frontend
│   ├── React
│   ├── Vite build
│   └── Nginx
│
└── backend
    ├── Node.js
    ├── Express
    └── ViaCEP
```

Por padrão:

| Serviço | Porta |
|---|---:|
| Frontend | `5173` |
| Backend | `3000` |

---

# Executando com Docker

## Pré-requisitos

Para executar a aplicação utilizando containers é necessário possuir:

- Git
- Docker
- Docker Compose

Não é necessário instalar Node.js, TypeScript, Vite ou Nginx diretamente na máquina.

## 1. Clone o repositório

```bash
git clone <https://github.com/Caio-Hernandes/Busca-Cep.git>
```

Entre no projeto:

```bash
cd BuscaCepDados
```

## 2. Construa e inicie os containers

```bash
docker compose up --build
```

O Docker irá:

1. construir a imagem do backend;
2. instalar as dependências do backend;
3. compilar o TypeScript;
4. construir o frontend;
5. gerar o build de produção do Vite;
6. configurar o Nginx;
7. iniciar os dois serviços.

Após a inicialização:

```text
Frontend: localhost:5173
Backend:  localhost:3000
Swagger:  localhost:3000/api/docs/
```

---

# Executando em segundo plano

Para executar os containers sem manter os logs presos ao terminal:

```bash
docker compose up -d
```

Para acompanhar os logs:

```bash
docker compose logs -f
```

Para encerrar os serviços:

```bash
docker compose down
```

Quando houver alterações no código e for necessário reconstruir as imagens:

```bash
docker compose up --build
```

---

# Executando sem Docker

Também é possível executar frontend e backend separadamente durante o desenvolvimento.

## Backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
localhost:3000
```

## Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
localhost:5173
```

---

# Variáveis de ambiente

O frontend utiliza a variável:

```env
VITE_API_URL=http://localhost:3000/api
```

Ela define a URL base utilizada para comunicação com o backend.

Como aplicações Vite são compiladas para arquivos estáticos, variáveis iniciadas com `VITE_` são utilizadas durante o processo de build do frontend.

No Docker Compose, esse valor pode ser fornecido como argumento durante a construção da imagem.

---

# Fluxo de uma consulta

Uma consulta por CEP percorre aproximadamente o seguinte fluxo:

```text
Usuário
   │
   │ informa CEP
   ▼
React
   │
   │ GET /api/search/cep/:cep
   ▼
Express Router
   │
   ▼
Controller
   │
   ├── valida entrada
   │
   ▼
Service
   │
   │ consulta
   ▼
ViaCEP
   │
   │ resposta
   ▼
Service
   │
   ▼
Controller
   │
   │ JSON
   ▼
React
   │
   ▼
Tabela de resultados
```

A busca por endereço utiliza o mesmo fluxo, podendo retornar múltiplos resultados.

---

# Objetivo do projeto

O BuscaCEP foi desenvolvido como um projeto Full Stack com foco na integração entre diferentes etapas de uma aplicação web.

Embora a consulta de CEP seja propositalmente simples, o projeto explora conceitos importantes utilizados em aplicações reais:

- desenvolvimento de API REST;
- separação de responsabilidades;
- arquitetura baseada em controllers, routes e services;
- integração com API externa;
- TypeScript no frontend e backend;
- validação de entradas;
- tratamento de erros;
- interface responsiva;
- temas claro e escuro;
- documentação de API;
- testes automatizados;
- mocks de dependências externas;
- build de produção;
- containerização;
- multi-stage Docker builds;
- servidor Nginx para arquivos estáticos;
- orquestração de serviços com Docker Compose.

O objetivo principal é demonstrar não apenas a implementação da funcionalidade, mas também a estruturação, documentação, teste e distribuição de uma aplicação Full Stack completa.

---

## Status

Projeto funcional.

Principais recursos implementados:

- [x] Consulta por CEP
- [x] Consulta por endereço
- [x] API REST
- [x] Interface responsiva
- [x] Modo claro e escuro
- [x] Paginação de resultados
- [x] Swagger
- [x] Testes automatizados
- [x] Dockerização do backend
- [x] Dockerização do frontend
- [x] Nginx
- [x] Docker Compose
