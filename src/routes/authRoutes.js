const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

function router() {
  const {
    requireSignedIn, getSignUp, postSignUp, getSignIn, postSignIn, signOut, getProfile,
  } = authController();

  authRouter.route('/signup')
    .get(getSignUp)
    .post(postSignUp);

  authRouter.route('/signin')
    .get(getSignIn)
    .post(postSignIn);

  authRouter.route('/signout')
    .get(signOut);

  authRouter.route('/profile')
    .all(requireSignedIn)
    .get(getProfile);

  return authRouter;
}

module.exports = router;
