const express = require('express');
const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController');
const bookService = require('../services/goodreadsService');

/*
const { Client } = require('pg');

const client = new Client();
client.connect();
 */

const bookRouter = express.Router();

function router() {
  const { getIndex, getById } = bookController(bookService);
  const { requireSignedIn } = authController();

  bookRouter.use(requireSignedIn);
  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
  /*
.all((request, response, next) => {
  (async function query() {
    const res = await client.query('SELECT * from books where id = $1', [request.params.id]);
    [request.book] = res.rows;
    next();
  }());
    })
  */
    .get(getById);

  return bookRouter;
}

module.exports = router;
