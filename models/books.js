const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booksSchema = new Schema(
  {
    imgLoc: {
       type: String
    },
    title: {
      type: String,
      trim: true,
      required: [true,'Enter a title']
    },
    authors: {
        type: Array
      },
    description: {
      type: String
    },    
    link: {
        type: String
      }
  }
);

const books  = mongoose.model("books", booksSchema);

module.exports = books;
