const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService) {
  function getIndex(request, response) {
    /*
(async function query() {
  const res = await client.query('SELECT * from books');
  response.render('bookListView',
    {
      nav,
      title: 'Library',
      books: res.rows,
    });
}());
*/
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected properly to the server');
        const db = client.db(dbName);
        const collection = await db.collection('books');
        const books = await collection.find().toArray();
        response.render('bookListView',
          {
            nav: require('../common/nav')(request), title: 'Library', books,
          });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function getById(request, response) {
    const { id } = request.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected properly to the server');
        const db = client.db(dbName);
        const collection = await db.collection('books');
        const book = await collection.findOne({ _id: new ObjectID(id) });
        book.details = await bookService.getBookById(book.bookId);
        debug(book);
        response.render('bookView',
          {
            nav: require('../common/nav')(request),
            book,
          });
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  return { getIndex, getById };
}

module.exports = bookController;
