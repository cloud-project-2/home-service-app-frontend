FROM 835474150232.dkr.ecr.us-east-1.amazonaws.com/node-base-images:18-slim AS build


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]