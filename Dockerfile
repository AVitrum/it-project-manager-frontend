# Stage 1: Build the application
FROM node:alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with a production-ready environment
FROM node:alpine AS production
WORKDIR /app
COPY package.json .
RUN npm install
COPY --from=build /app/dist ./build
CMD ["npm", "run", "dev"]
