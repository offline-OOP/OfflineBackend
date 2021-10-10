FROM node:14.16.0-alpine3.12 as build
WORKDIR build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:14.16.0-alpine3.12
COPY --from=build /build/dist /app
WORKDIR /app
CMD ["node", "main.js"]