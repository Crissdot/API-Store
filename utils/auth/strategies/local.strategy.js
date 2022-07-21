const { Strategy } = require('passport-local');

const AuthService = require('../../../services/auth.service');
const service = new AuthService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await service.getUser(username, password);
      return done(null, user);
    } catch(error) {
      return done(error, false);
    }
  }
);

module.exports = { LocalStrategy };
