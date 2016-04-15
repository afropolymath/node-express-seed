var _ = require('lodash'),
  validate = require('validate.js');

var bookConnector = require('../models/books.js');

books = bookConnector.loadData();

/*
  Endpoints

  GET   /books            -> Returns all the books in the database
  GET   /books/search?q=q -> Returns all the books that contain q in their title
  POST  /books            -> Creates a new book in the database
  GET   /books/:id        -> Returns information about a single book with id :id
  PUT   /books/:id        -> Update the information about a book with id :id
*/

module.exports = function(router) {
  router.get('/', function(req, res) {
    res.send("Welcome to the homepage!");
  })

  router.get('/books', function(req, res) {
    res.json(books);
  });

  router.get('/books/search', function(req, res) {
    q = req.query.q;
    if(!q) {
      res.status(400).json({message: 'You need to supply a search query string'});
    }
    filtered_books = _.filter(books, function(book) {
      return book.title.indexOf(q) > -1;
    });
    if(filtered_books.length) {
      res.json(filtered_books);
    } else {
      res.status(404).json({message: 'Sorry, we could not find any book with title ' + q + '!'});
    }
  });

  router.use('/books/:id', function(req, res, next) {
    id = req.params.id;
    id = parseInt(id);
    if(isNaN(id)) {
      res.status(400).json({message: 'You can only use an integer id'});
    }
    book = _.find(books, {id: id});
    if(book) {
      req.book = book;
      next();
    } else {
      res.status(404).json({message: 'Sorry, we cannot find that book!'});
    }
  });

  router.get('/books/:id', function(req, res) {
    res.json(req.book);
  });

  router.post('/books', function(req, res) {
    book = req.body;
    errors = validate(book, bookConnector.constraints);
    if(errors) {
      res.status(500).json({message: errors});
    }
    similarBooks = _.filter(books, function(b) {
      return b.id === book.id || (b.title === book.title && b.author === book.author)
    });

    if(similarBooks.length) {
      res.status(400).json({message: 'That book already exists'});
    } else {
      books.push(book);
      res.status(201).json({message: 'Successfully created the new book object'});
    }
  });

  router.put('/books/:id', function(req, res) {
    try {
      data = req.body;
      book = req.book;
      bookModified = _.assignIn(book, data);
      res.json(bookModified);
    } catch (err) {
      res.status(500).json({message: 'Something went wrong!'});
    }
    idx = _.findIndex(books, book)
    errors = validate(modified_book, bookConnector.constraints);
  });
}
