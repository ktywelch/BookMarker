require('dotenv').config();
const express = require('express')
const app = express();
const logger = require("morgan");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3050;
const routes = require("./routes");
app.use(logger("dev"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


const db = mongoose.connection;
db.on('error', (error) => conosle.error(error))
db.once('open', () => console.log('connected to db'))

app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`Backend Appp Started port ${PORT}`))
