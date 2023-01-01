# prisma scripts
migration:
	npx prisma migrate dev
format-schema:
	npx prisma format
studio:
	npx prisma studio
seed:
	npx prisma db seed
client:
	npx prisma generate

# Docker
build:
	docker compose -f docker-compose-dev.yaml up -d --build
run:	
	docker compose -f docker-compose-dev.yaml up -d
down:
	docker compose -f docker-compose-dev.yaml down

# Testing scripts
test:
	npm run test

# Format
pretty:
	npm run pretty

# Lint
lint:
	npm run lint
lint-fix:
	npm run lint:fix