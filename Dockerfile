# Base image
FROM node:16

# Create project directory
WORKDIR /opt/api-gateway

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Build latest dist version
RUN yarn build

# Start command
CMD ["node", "dist/main.js"]

# Export port to public
EXPOSE 4003

# BUILD docker build -t api-gateway-image .

# RUN docker run -it --name api-gateway-container -p 4003:4003 api-gateway-image