FROM node:19
WORKDIR /app
COPY ./package*.json ./
COPY tsconfig.json ./
COPY ./prisma ./
RUN npm install --only=prod
COPY ./ ./
RUN npm run build

FROM node:19
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=base /app/dist .
CMD ["node", "dist/src/app.js"]