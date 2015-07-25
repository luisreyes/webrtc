var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'webrtc'
    },
    port: 3000,
    db: 'mysql://localhost/webrtc-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'webrtc'
    },
    port: 3000,
    db: 'mysql://localhost/webrtc-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'webrtc'
    },
    port: 3000,
    db: 'mysql://localhost/webrtc-production'
  }
};

module.exports = config[env];
