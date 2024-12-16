# Step 1: Build Angular application
FROM node:22 as build-step

WORKDIR /app

# Copy package.json and package-lock.json for the frontend
COPY client/package*.json ./frontend/

RUN cd frontend && npm install

COPY client/ ./frontend/

RUN cd frontend && npm run build --prod

# Step 2: Build Express application
FROM node:22 as build-express

WORKDIR /app

COPY api/package*.json ./backend/

RUN cd backend && npm install

COPY api/ ./backend/

COPY --from=build-step /app/frontend/dist/ /app/backend/public/

# Step 3: Create final runtime image
FROM node:22

WORKDIR /app

COPY --from=build-express /app/backend/ .

EXPOSE 3000

CMD ["npm", "start"]
