# Dockerfile for Backend with Sequelize migration and seeding
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

EXPOSE 8001

# Automatically run migrations and seeders on container startup
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start"]
