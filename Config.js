// Global App Configuration
const config = {
  FRONTEND_URI: process.env.FRONTEND_URI || 'http://localhost:4200/',
  SECRET: '32876qihsdh76@&#!742(*#HG&#28702y&##@^!()(&^#))jhscbd',
  google:{
    clientID:'1056543646824-gj2qrem1jjrq55vmjo86adrqnip6aol5.apps.googleusercontent.com',
    clientSecret:'3E7ZN6w30BhnnSM8YMgVUSgB'
  },
  db: {
    host: 'mongo',
    port: 27017,
    name: 'onlinecompanion'
  }
  //MONGO_URI:'mongodb://mongo:27017/onlinecompanion'
};

module.exports = config