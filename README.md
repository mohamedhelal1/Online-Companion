# OnlineCompanion

The Twelve Factor application from its name is an online companion. It provides a means of writing notes, knowing the weather of the user's current location and provides some inspiration if inspiration is needed.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

The only thing you need for this application to run is Docker


* For new Mac and Windows: [Docker Desktop](https://www.docker.com/products/docker-desktop)

* For older versions of Mac and Windows: [Docker Toolbox](https://docs.docker.com/toolbox/) 


### Running you Online Companion

After installing docker do the following:

Clone the repo by running the following command in the terminal

```
git clone https://github.com/mohamedhelal1/Online-Companion.git
```

Navigate to the project folder

```
cd Online-Companion
```

Add config files

There are two config files in our project one for the backend and one for the frontend

```
touch Config.js
```

Add the following content to the Config.js

```
const config = {
  FRONTEND_URI: process.env.FRONTEND_URI || 'http://localhost:4200/',
  SECRET: //can be anything, jwt uses it to decrypt the user token ,
  //for the below variables create a new project in https://console.developers.google.com/ and use the Google+ API for the project , 
  //then add the necessary credentials and they will provide a client ID and client secret
  google:{
    clientID: //check above note ,
    clientSecret://check above note
  },
  db: {
    host: //The mongoDB host ex: localhost,
    port: //the desired port that mongo runs on,
    name: //database name
  },
  weatherAppID: //register to https://openweathermap.org/api to get the id
};

module.exports = config
```
Now create the config file for the front end

```
cd frontend 
touch app.config.ts
```

In app.config.ts add the following

```
export const appConfig = {
    backendUrl: 'http://' + HOST + ':' + PORT + '/',
	//HOST is where the application is running ex: localhost or the ip of docker-machine in case virtual box is used
	//Port is the port where you decide where to run node, found in Dockerfile in Online-Component
    googleClientId: //same as the one you inserted in Config.js
  };
```

Now it is time to run the application!

All of this application 's dependencies are installed using the following command that runs npm install

```
docker-compose up --build
```
The --build flag runs both Dockerfile-s in the front and backend before running the containers. It acts as a shortcut to running the Dockerfile-s explicitly as shown below.

In **Online-Companion** run the following commands as an **alternative** for the above command.

```
docker run onlinecompanion
cd frontend
docker run angular
docker-compose up 
``` 

Navigate in your browser to http://localhost:4200/ and enjoy our app

To stop and remove running containers execute the following command

```
docker-compose down
```

## Contributors

* **[Mohamed Hesham Helal](https://github.com/mohamedhelal1)**
* **[Mahmoud Mohamed Saleh](https://github.com/mmsmhh)**
* **[Mariam Dessouki](https://github.com/Mariam-Dessouki)**



## Acknowledgments
We would like to thank the creators of both of these tutorials 

* [Docker Compose with Node & MongoDB](https://www.youtube.com/watch?v=hP77Rua1E0c&feature=share&fbclid=IwAR2j3eAmFwEJWp1-8D4KvkY-uIMd-Ub-cNXWFg1wnWPdFkJmWqWom_O6Ga8)
* [Containerizing MEAN Stack Application | DevOps Tutorial](https://www.youtube.com/watch?v=WZa7GsqyS3w)


for helping our application get up and running

