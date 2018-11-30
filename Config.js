// Global App Configuration
 const config = {
    FRONTEND_URI: process.env.FRONTEND_URI || 'http://localhost:4200/',
    SECRET: '32876qihsdh76@&#!742(*#HG&#28702y&##@^!()(&^#))jhscbd',
    db: {
      host: 'mongo',
      port: 27017,
      name: 'onlinecompanion'
    }
    //MONGO_URI:'mongodb://mongo:27017/onlinecompanion'
  };

  module.exports = config