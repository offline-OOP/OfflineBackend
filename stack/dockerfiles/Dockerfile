FROM node:14.16.0-alpine3.12
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:14.16.0-alpine3.12
COPY --from=0 /build/dist /app
COPY --from=0 /build/node_modules /app/node_modules
WORKDIR /app
CMD ["npm", "start:prod"]