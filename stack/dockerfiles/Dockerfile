FROM node:14.16.0-alpine3.12
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "start"]