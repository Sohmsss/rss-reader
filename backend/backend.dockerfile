# Use the Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port your backend listens on
EXPOSE 5000

# Command to run your app
CMD [ "node", "server.js" ]
