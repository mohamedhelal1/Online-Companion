# Stage 1
FROM node

RUN mkdir -p /usr/src/

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm cache clean --force

RUN npm install

COPY . /usr/src/app

EXPOSE 4200

CMD ["npm", "start"]
