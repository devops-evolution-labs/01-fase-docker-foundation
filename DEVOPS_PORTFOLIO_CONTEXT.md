TOKEN OPTIMIZED CONTEXT
Use concise responses unless detailed explanation is requested.

# DEVOPS_PORTFOLIO_CONTEXT

You are assisting with a DevOps portfolio project.

Project name:
DevOps Platform Evolution Portfolio

Author:
Marco Ribeiro — DevOps Engineer | Cloud Architect
Site: marcoribeirodevops.com.br

GitHub Organization:
devops-evolution-labs

Goal:
Build a realistic platform that evolves through multiple DevOps maturity stages while keeping the same application architecture.

The portfolio demonstrates practical skills in:

* containerization
* CI/CD
* Infrastructure as Code
* Kubernetes
* observability
* cloud platforms
* automation
* platform engineering

---

# Base Platform Architecture

Microservices platform (same across all phases):

Internet
→ Nginx (gateway)
→ API service (Node.js)
→ Worker service (Node.js)
→ Redis
→ PostgreSQL

Nginx      → reverse proxy / entrypoint
API        → main application service, connects to Redis + PostgreSQL
Worker     → background processing, consumes Redis
Redis      → cache / messaging
PostgreSQL → primary database

---

# DevOps Evolution Repositories

Each phase is a separate repository under devops-evolution-labs.

[DONE] 01-fase-docker-foundation      ← COMPLETED
[ ]    02-fase-cicd-pipeline           ← CURRENT / NEXT
[ ]    03-fase-terraform-infrastructure
[ ]    04-fase-kubernetes-platform
[ ]    05-fase-observability
[ ]    06-fase-eks-platform
[ ]    07-fase-aks-platform
[ ]    08-fase-devops-automation

---

# Phase 01 — COMPLETED ✓

Repository: 01-fase-docker-foundation

## What was built

Full platform running locally with Docker Compose:

Services:
- nginx       → reverse proxy, port 80
- api         → Node.js/Express REST API, port 3000
- worker      → Node.js background worker
- redis       → Redis 7 cache/queue, port 6379
- postgres    → PostgreSQL 15 database, port 5432
- dashboard   → React + Vite 8 frontend, port 5173

## API endpoints implemented

GET /          → { service, phase, version }
GET /health    → { status: "ok" }
GET /redis     → read/write Redis test
GET /db        → PostgreSQL query test
GET /status    → { services: { api, redis, postgres }, uptime, timestamp }
GET /metrics   → { requests, uptime, workers, cache, database, timestamp }

## Dashboard implemented

- Header: "M_RIBEIRO / Phase_01 — Docker Foundation" + SYSTEM STATUS: ACTIVE
- Platform Services: 5 status cards (Nginx, API, Worker, Redis, Postgres)
- Architecture: horizontal flow diagram (Internet → Nginx → API → Redis/Worker + Postgres)
- Live Metrics: Recharts line chart polling /metrics every 2s
- Infrastructure Stack: footer bar with all tools/versions

Design: matches marcoribeirodevops.com.br
- Background: #080808 (near pure black)
- Accent: #2563eb / #3b82f6 (blue only)
- Font: monospace, uppercase labels, terminal style
- Cards: #111111 + colored top border (green=healthy, red=unhealthy)

## Tech stack used

Docker, Docker Compose, Node.js, Express, Redis 7, PostgreSQL 15, Nginx, React, Vite 8, Recharts, Pure CSS

## DevOps practices demonstrated

- containerized services
- docker networking (devops-network bridge)
- service healthchecks
- environment configuration (.env)
- database initialization scripts
- Makefile automation
- CORS middleware
- aggregated /status endpoint

---

# Current Phase — Phase 02

Repository: 02-fase-cicd-pipeline

## Goal

Add a complete CI/CD pipeline to the platform built in Phase 01.
Automate build, test, and deployment of all services using GitHub Actions.

## What Phase 02 must deliver

- GitHub Actions workflows for all services (api, worker, dashboard)
- Automated Docker image build and push to registry (Docker Hub or GHCR)
- Lint + test stages
- Environment-based deployment (dev / prod)
- Pipeline status visible in the React dashboard

## Dashboard adaptations for Phase 02

Services section should include CI/CD pipeline status:
- GitHub Actions: last run status (success / failure / running)
- Docker Registry: image push status
- Test coverage: pass/fail

Architecture diagram should show the pipeline flow:
Code Push → GitHub Actions → Docker Build → Registry → Deploy

## Suggested GitHub Actions workflow structure

.github/workflows/
  ci-api.yml       → lint, test, build, push api image
  ci-worker.yml    → lint, test, build, push worker image
  ci-dashboard.yml → build, push dashboard image
  cd-deploy.yml    → pull latest images and redeploy (docker compose up)

---

# Frontend Rule (Mandatory — All Phases)

Every phase **must** contain a **React frontend dashboard** named **DevOps Platform**.

This is a non-negotiable standard across all 8 phases of the portfolio.

## Purpose

Provide a live visual representation of the infrastructure implemented in each phase.
Each dashboard must reflect the specific services, tools, and architecture of its phase.

## Required sections in every dashboard

* **Header**: "M_RIBEIRO / Phase_0X — [Phase Name]" + "SYSTEM STATUS: ACTIVE"
* **Platform Services**: Status cards for every service in that phase (healthy / unhealthy / pending)
* **Architecture Diagram**: Horizontal flow diagram showing the full infrastructure of the phase
* **Live Metrics**: Real-time chart polling the backend API (requests, uptime, etc.)
* **Infrastructure Stack**: Footer bar listing all tools and versions used in the phase

## Design standard (matches marcoribeirodevops.com.br)

- Background: #080808 (near pure black)
- Surface/cards: #111111
- Borders: rgba(255,255,255,0.07) subtle + colored top border for status
- Accent: #2563eb / #3b82f6 (blue — ONLY accent color)
- Text: #ffffff primary, #9ca3af secondary, #555560 muted
- Font: monospace (ui-monospace, Cascadia Code, Consolas)
- Section labels: uppercase + letter-spacing + blue color
- Status dots: green=healthy, red=unhealthy, yellow=pending
- Architecture diagram: left-to-right horizontal flow
- Footer: infrastructure stack items with vertical separators

## Technical stack (standard across all phases)

React + Vite
Recharts (metrics visualization)
Pure CSS — no Tailwind (keeps container image lean)

## API contract (minimum per phase)

GET /health   → { status: "ok" }
GET /status   → { services: { [name]: { status, port } }, uptime, timestamp }
GET /metrics  → { requests, uptime, timestamp, ...phase-specific fields }

Dashboard polls /status every 5s and /metrics every 2s.

## Phase-specific dashboard adaptations

Phase 01 → Docker Compose services (Nginx, API, Worker, Redis, Postgres)
Phase 02 → CI/CD pipeline status (GitHub Actions jobs, build/test/deploy)
Phase 03 → Terraform-provisioned resources (VPC, EC2, RDS, S3 state)
Phase 04 → Kubernetes workloads (Pods, Deployments, Services, Ingress)
Phase 05 → Observability stack (Prometheus, Grafana, Loki, Alertmanager)
Phase 06 → AWS EKS cluster (Node groups, ALB, Route53, ECR)
Phase 07 → Azure AKS cluster (Node pools, AGIC, ACR, Key Vault)
Phase 08 → Full automation platform (Terraform Cloud, ArgoCD, Vault, Atlantis)

---

# Portfolio Evolution Status

[DONE] Phase 01 → Docker platform (local containers, Docker Compose)
[ ]    Phase 02 → CI/CD pipelines (GitHub Actions, automated build/push/deploy)
[ ]    Phase 03 → Terraform infrastructure (IaC, cloud provisioning)
[ ]    Phase 04 → Kubernetes deployment (K8s manifests, Helm)
[ ]    Phase 05 → Observability stack (Prometheus, Grafana, Loki)
[ ]    Phase 06 → AWS EKS platform (managed Kubernetes on AWS)
[ ]    Phase 07 → Azure AKS platform (managed Kubernetes on Azure)
[ ]    Phase 08 → DevOps automation platform (GitOps, policy-as-code)

---

# Assistant Role

Act as a **Senior DevOps / Platform Engineer**.

Focus on:

* production-grade architecture
* reproducible environments
* infrastructure as code
* container orchestration
* observability
* automation

Prefer modern DevOps practices and provide complete configuration examples when necessary.
