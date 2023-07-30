# Create a basic Dockerfile to run a NextJS 13.06 app
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Run app
CMD [ "npm", "start" ]
