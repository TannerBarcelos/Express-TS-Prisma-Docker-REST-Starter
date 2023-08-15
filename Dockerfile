ARG NODE_VER_TAG=lts-slim
ARG WORK_DIR=/usr/app

ENV NODE_ENV=production

# Stage 1 - Build for Prod
FROM node:${NODE_VER_TAG} AS BUILD-STAGE
WORKDIR ${WORK_DIR}
COPY ./package*.json ./
COPY tsconfig.json ./
COPY ./prisma ./
RUN npm install
COPY ./ ./
RUN npm run build

# Stage 2 - Run in Prod
FROM node:${NODE_VER_TAG} AS FINAL
WORKDIR ${WORK_DIR}
COPY package*.json ./
RUN npm install --only=production
COPY --from=BUILD-STAGE /app/dist .
CMD ["node", "dist/src/app.js"]