-include .env
export $(shell sed 's/=.*//' .env)

export PROJECT := $(or $(PROJECT), clar-server)

build-local:
	@echo "+\n++ Make: Run/Build locally ...\n+"
	@docker-compose -f docker-compose.yml up --build

run-local:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.yml up

run-local-server:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.yml up server

run-local-db:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.yml up db


close-local:
	@docker-compose -f docker-compose.yml down

local-db-workspace:
	@docker exec -it $(PROJECT)-db sh


local-server-workspace:
	@docker exec -it $(PROJECT)-server sh
