const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booksSchema = new Schema(
  {
    imgLoc: {
       type: String,
       trim: true,
       required: [true,'The thumbnail location']
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
      type: String,
      required: [true,'Enter a Description']
    },    
    link: {
        type: String,
        required: [true,'Enter a url for repository']
      }
  }
);

const books  = mongoose.model("books", booksSchema);

module.exports = books;
