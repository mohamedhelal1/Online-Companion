# base image
FROM node:9.6.1


WORKDIR /usr/src/app

COPY package*.json ./

# add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install
RUN npm install -g @angular/cli@1.7.1

# add app
COPY . .

EXPOSE 4200

# start app
CMD ng serve 