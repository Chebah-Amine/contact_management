install:
	docker compose -f ./docker/docker-compose.yml up -d --build
	docker exec -it fsr-app-container npm install
.PHONY: install

start:
	docker exec -it fsr-app-container npm run dev
.PHONY: start

exec:
	docker exec -it fsr-app-container bash
.PHONY: exec
