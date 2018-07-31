const passport = require('passport');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authController');

function authController() {
  function requireSignedIn(request, response, next) {
    if (request.user) {
      next();
    } else {
      response.redirect('/');
    }
  }

  function getSignUp(request, response) {
    response.render('signup', { nav: require('../common/nav')(request), title: 'Library' });
  }

  function postSignUp(request, response) {
    // Create user
    const { username, password } = request.body;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected properly to the server');
        const db = client.db(dbName);
        const collection = db.collection('users');
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
          response.redirect('/');
        } else {
          const user = { username, password };
          const results = await collection.insertOne(user);
          debug(results);
          // And log them in
          request.login(results.ops[0], () => {
            response.redirect('/auth/profile');
          });
        }
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function getSignIn(request, response) {
    response.render('signin', { nav: require('../common/nav')(request), title: 'Library' });
  }

  const postSignIn = passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureRedirect: '/',
  });

  function signOut(request, response) {
    request.logout();
    response.redirect('/');
  }

  function getProfile(request, response) {
    response.render('profile',
      {
        nav: require('../common/nav')(request),
        title: 'Library',
        id: request.user._id,
        username: request.user.username,
        password: request.user.password,
      });
  }

  return {
    requireSignedIn, getSignUp, postSignUp, getSignIn, postSignIn, signOut, getProfile,
  };
}

module.exports = authController;
