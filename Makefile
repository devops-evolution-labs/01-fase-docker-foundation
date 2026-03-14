# DevOps Evolution Labs
# Phase 01 — Docker Foundation

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f

restart:
	docker compose down && docker compose up --build

ps:
	docker compose ps