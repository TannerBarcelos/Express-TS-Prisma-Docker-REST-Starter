# prisma scripts
migration:
	npm run db:migrate
format-schema:
	npx prisma format
studio:
	npx prisma studio
seed:
	npx prisma db seed
client:
	npx prisma generate

run-build:
	docker compose -f docker-compose-dev.yaml up -d --build

run:	
	docker compose -f docker-compose-dev.yaml up -d

down:
	docker compose -f docker-compose-dev.yaml down

prune:
	docker system prune

# Testing scripts
test:
	npm run test

# Lint and format
pretty:
	npm run pretty