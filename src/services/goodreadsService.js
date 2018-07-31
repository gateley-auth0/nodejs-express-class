const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });

const key = 'wYrSYuSHqCpnqvHuH3m1A';
const secret = '28hpiQgBh4lFQ0zaGJCm12EtOdbRN7U9hGfsHKC0sSU';

function goodreadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=${key}`)
        .then((response) => {
          parser.parseString(response.data, (error, result) => {
            if (error) {
              debug(error);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();
