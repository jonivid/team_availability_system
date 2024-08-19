# Dockerfile for Frontend (Vite)
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Vite build step
RUN npm run build

EXPOSE 3000

# Use Vite's preview mode for serving the built app
CMD ["npx", "vite", "preview", "--port", "3000", "--host"]
