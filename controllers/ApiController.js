const Books = require("../models/books")


module.exports = {
  getBooks: async (req,res) => {
  //verified code works
    Books.find({})
    .then(dbBooks => res.json(dbBooks))
    .catch(err => res.status(400).json(err))
  }, 
  getBooksTag: async (req,res) => {
    //verified code works
      Books.find({
        userID: req.params.id
      })
      .then(dbBooks => res.json(dbBooks))
      .catch(err => res.status(400).json(err))
    }, 
  delBook: async (req, res) =>  {
    Books
      .findById({ _id: req.params.id })
      .then(dbBooks => dbBooks.remove())
      .then(dbBooks => res.json(dbBooks))
      .catch(err => res.status(422).json(err));
  },
  updateBook: async (req,res) => {
    Books.findOneAndUpdate({ _id: req.params.id }, req.body)
   .then(dbModel => res.json(dbModel))
   .catch(err => res.status(422).json(err));
  },
  getBook: async (req,res) => {
    Books.findById(req.params.id)
   .then(dbBooks => res.json(dbBooks))
   .catch(err => res.status(422).json(err));
  },
  createBook:  (req,res) => {
    Books.create(req.body)
    .then(dbBooks => {
      res.json(dbBooks);
    })
    .catch(err => {
      res.status(400).json(err);
    }); 
  }

}


