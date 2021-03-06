const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
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
    author: {
        type: String,
        trim: true,
        required: [true,'Enter a title']
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

const Portfolio  = mongoose.model("portfolio", portfolioSchema);

module.exports = Portfolio;
