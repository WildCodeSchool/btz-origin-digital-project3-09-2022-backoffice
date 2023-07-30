# Create a basic Dockerfile to run a NextJS 13.06 app
FROM node:14.17.6-alpine3.14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Run app
CMD [ "npm", "start" ]
