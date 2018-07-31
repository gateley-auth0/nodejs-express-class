const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

function router() {
  const books = [
    {
      title: 'War and Peace',
      author: 'Lev Nikolayevech Tolstoy',
      genre: 'Historical Fiction',
      bookId: 656,
      read: false,
    },
    {
      title: 'Les Miserables',
      author: 'Victor Hugo',
      genre: 'Historical Fiction',
      bookId: 24280,
      read: false,
    },
    {
      title: 'The Time Machine',
      author: 'H. G. Wells',
      genre: 'Science Fiction',
      bookId: 656,
      read: false,
    },
    {
      title: 'Journey to the Center of the Earth',
      author: 'Jules Verne',
      genre: 'Science Fiction',
      bookId: 656,
      read: false,
    },
    {
      title: 'The Dark World',
      author: 'Henry Kuttner',
      genre: 'Fantasy',
      bookId: 656,
      read: false,
    },
    {
      title: 'The Wind in the Willows',
      author: 'Kenneth Grahame',
      genre: 'Fantasy',
      bookId: 656,
      read: false,
    },
    {
      title: 'Life on the Mississippi',
      author: 'Mark Twain',
      genre: 'Biography',
      bookId: 656,
      read: false,
    },
    {
      title: 'Childhood',
      author: 'Lev Nikolayevech Tolstoy',
      genre: 'Biography',
      bookId: 656,
      read: false,
    },
    {
      title: 'The Fellowship of the Ring',
      author: 'J. R. R. Tolkein',
      genre: 'Fantasy',
      bookId: 656,
      read: false,
    },
  ];

  adminRouter.route('/')
    .get((request, response) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected properly to the server');
          const db = client.db(dbName);
          const dbResponse = await db.collection('books').insertMany(books);
          response.json(dbResponse);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
