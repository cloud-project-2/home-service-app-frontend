FROM 835474150232.dkr.ecr.us-east-1.amazonaws.com/node-base-images:18-slim AS build


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM 835474150232.dkr.ecr.us-east-1.amazonaws.com/node-base-images:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=build /usr/src/app/build ./build
COPY server.js ./

EXPOSE 3000

# Start the production server
CMD ["npm", "run", "server"]