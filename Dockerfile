# Create a basic Dockerfile to run a NextJS 13.06 app
FROM node:14.17.6-alpine3.14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN source ~/.bashrc
RUN nvm install v18.17.0

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Run app
CMD [ "npm", "start" ]
