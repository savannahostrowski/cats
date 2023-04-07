FROM node:19-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM caddy
COPY --from=builder /app/build /usr/share/caddy