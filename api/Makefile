include .env

DOCKER_PATH = ./docker/docker-compose.yml
ENV_OPTION = --env-file ./.env

start:
	docker compose ${ENV_OPTION} -f ${DOCKER_PATH} up -d --build

stop:
	docker compose ${ENV_OPTION} -f ${DOCKER_PATH} down

logs:
	docker compose ${ENV_OPTION} -f ${DOCKER_PATH} logs -f

exec:
	docker compose ${ENV_OPTION} -f ${DOCKER_PATH} exec app sh

db:
	docker compose ${ENV_OPTION} -f ${DOCKER_PATH} exec database mysql -u ${MYSQL_USER} -p ${MYSQL_PASSWORD} ${MYSQL_DB}

test:
	docker compose ${ENV_OPTION} -f ${DOCKER_PATH} exec app ./mvnw test

# La commande docker compose marche (même sans avoir docker installé sur le debian)
# car Docker Desktop (windows) expose le daemon Docker via wsl