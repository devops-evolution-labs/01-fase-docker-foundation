DevOps Platform Evolution — Phase 01: Docker Foundation

Este repositório implementa a primeira fase de uma plataforma de microsserviços construída com foco em práticas DevOps. A proposta é criar um ambiente local que simule uma arquitetura de produção utilizando containers Docker, comunicação entre serviços e um gateway de acesso.

A plataforma inclui serviços de API, processamento assíncrono, banco de dados, cache e um dashboard web para visualização de métricas.

A organização do projeto segue o laboratório:

devops-evolution-labs

O objetivo desta fase é estabelecer a base containerizada sobre a qual novas capacidades poderão ser adicionadas ao longo da evolução da plataforma.

Arquitetura da Plataforma

A arquitetura implementa um gateway de entrada, serviços de aplicação e infraestrutura de dados executando em containers conectados através de uma rede Docker.

Fluxo geral da arquitetura:

Internet
   │
   ├── Nginx (Reverse Proxy)
   │        │
   │        ▼
   │     API Service (Node.js)
   │        │
   │   ├── Redis (Cache / Messaging)
   │   └── PostgreSQL (Database)
   │
   └── Dashboard (React)
            │
            ▼
         API Service

Componentes da Plataforma

Nginx
Gateway de entrada da aplicação. Atua como reverse proxy encaminhando requisições HTTP para o serviço de API.

API Service (Node.js)
Serviço principal responsável por expor endpoints HTTP e integrar Redis e PostgreSQL.

Worker Service (Node.js)
Serviço de processamento em background. Executa tarefas assíncronas utilizando Redis como backend de comunicação.

Redis
Sistema de cache e mensageria utilizado pela API e pelo worker.

PostgreSQL
Banco de dados relacional principal da aplicação.

Dashboard (React)
Interface web utilizada para visualizar métricas da API e informações da plataforma através de gráficos interativos.

Todos os serviços executam em containers Docker e se comunicam através de uma rede interna chamada:

devops-network

Estrutura do Repositório

phase-01-docker-foundation
│
├── api/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── worker/
│   ├── Dockerfile
│   ├── package.json
│   └── worker.js
│
├── dashboard/
│   └── React application
│
├── nginx/
│   └── nginx.conf
│
├── postgres/
│   └── init.sql
│
├── docs/
│   └── architecture.md
│
├── docker-compose.yml
├── .env
├── .env.example
├── .dockerignore
├── Makefile
└── README.md

Tecnologias Utilizadas

Docker
Docker Compose
Node.js
Express
Redis
PostgreSQL
Nginx
React
Recharts
Vite

Conceitos Demonstrados

Containerização de serviços de aplicação
Orquestração multi-container com Docker Compose
Arquitetura com reverse proxy
Comunicação entre serviços em rede Docker
Configuração baseada em variáveis de ambiente
Serviço de processamento assíncrono (worker)
Dashboard interativo consumindo API

Executando a Plataforma

1 — Clonar o repositório

git clone https://github.com/devops-evolution-labs/phase-01-docker-foundation.git
cd phase-01-docker-foundation

2 — Configurar variáveis de ambiente

cp .env.example .env

3 — Iniciar a plataforma

Utilizando Makefile:

make up

Ou diretamente com Docker Compose:

docker compose up --build

Acessando os serviços

API

http://localhost

Health Check

http://localhost/health

Redis Test Endpoint

http://localhost/redis

Database Test Endpoint

http://localhost/db

Metrics Endpoint

http://localhost/metrics

Dashboard

http://localhost:5173

Comandos Úteis

make up
Build e inicia todos os containers da plataforma.

make down
Para e remove todos os containers.

make logs
Exibe logs agregados dos containers.

make ps
Lista os containers em execução.

Práticas DevOps Implementadas

Containerização de serviços
Infraestrutura reproduzível com Docker Compose
Uso de variáveis de ambiente para configuração
Health checks de containers
Arquitetura com gateway reverso
Processamento assíncrono com worker
Documentação de arquitetura
Dashboard para observabilidade básica

Documentação de Arquitetura

Uma descrição detalhada da arquitetura pode ser encontrada em:

docs/architecture.md

O documento inclui:

topologia de rede entre containers
fluxo de requisições
dependências entre serviços
decisões de arquitetura

architecture.md