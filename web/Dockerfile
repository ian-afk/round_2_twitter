FROM node:22-alpine AS build

ARG VITE_BACKEND_URL=htt://localhost:30001

WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 — run
FROM nginx AS final
WORKDIR /usr/share/nginx/html

COPY --from=build /build/dist .

CMD ["node", "dist/index.js"]