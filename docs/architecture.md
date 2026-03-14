Architecture — Phase 01 Docker Foundation

Esta fase implementa a primeira versão funcional da plataforma utilizando Docker Compose.

O objetivo é criar um ambiente local de microsserviços que simule uma arquitetura de produção simplificada, permitindo evolução incremental da infraestrutura e das práticas DevOps.

Todos os serviços executam em containers Docker conectados através de uma rede virtual chamada:

devops-network

Arquitetura Geral

                        Internet
                           │
                           ▼
                        Nginx
                   (Reverse Proxy)
                           │
                           ▼
                    Docker Network
                ┌──────────┼──────────┐
                │          │          │
              API       Worker      Redis
               │           │
               │           │
               └──────── PostgreSQL
               
                ▲
                │
          React Dashboard

Descrição dos Componentes

Nginx

Atua como gateway da aplicação.
Recebe requisições HTTP externas e encaminha para o serviço de API.

API Service

Aplicação Node.js responsável por expor endpoints HTTP e integrar os componentes da plataforma.

Endpoints principais:

/
/health
/redis
/db
/metrics

Redis

Utilizado como cache e mecanismo de comunicação entre serviços.

Worker Service

Processo assíncrono que consome tarefas ou executa rotinas em background utilizando Redis.

PostgreSQL

Banco de dados relacional utilizado pela aplicação para persistência de dados.

Dashboard (React)

Aplicação frontend utilizada para visualizar métricas da API através de gráficos interativos.

O dashboard consome diretamente endpoints HTTP da API.

Rede de Containers

Todos os serviços são conectados à rede:

devops-network

Essa rede permite que os containers se comuniquem usando nomes de serviço como hostname.

Exemplos:

api → redis
api → postgres
worker → redis
dashboard → api

Fluxo de Requisições

Fluxo de acesso da API:

Client → Nginx → API → Redis/PostgreSQL

Fluxo de visualização do dashboard:

Client → Dashboard → API → Redis/PostgreSQL

Dependências de Serviços

API depende de:

Redis
PostgreSQL

Worker depende de:

Redis

Dashboard depende de:

API

Nginx depende de:

API

Essas dependências são definidas no docker-compose utilizando depends_on e health checks.

Rede e Orquestração

A orquestração da plataforma é realizada utilizando Docker Compose.

Os serviços são conectados através de uma rede bridge:

devops-network

Volumes persistentes são utilizados para armazenamento de dados do PostgreSQL.

Decisões de Arquitetura

Separação entre serviços de aplicação e infraestrutura
Uso de Redis para comunicação entre serviços
Uso de Nginx como gateway reverso
Uso de containers independentes para cada componente
Dashboard desacoplado consumindo apenas a API

Essa arquitetura fornece uma base sólida para evolução da plataforma nas próximas etapas do projeto.