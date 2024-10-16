# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Set the default command to run the application
CMD ["node", "dist/app.js"]
