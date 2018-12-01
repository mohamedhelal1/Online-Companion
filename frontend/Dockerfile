# Stage 1
FROM node:10

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH


COPY package*.json ./


RUN npm install
RUN npm install -g @angular/cli
COPY . .

EXPOSE 4200

CMD ["ng", "serve"]
