# Use an official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc

# Command to run the compiled app
CMD ["node", "--expose-gc", "dist/app.js"]
FROM ubuntu:latest

ENTRYPOINT ["top", "-b"]