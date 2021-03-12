require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express()
const socketIo = require('socket.io');
const cors = require("cors");


// testing Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});



// const logger = require("morgan");
// app.use(logger("dev"));

const PORT = process.env.PORT || 3030;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static("public"));



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/users", require("./routes/userRoutes"));
app.use("/api", require("./routes/api_routes"));
app.use("/confirm", require("./routes/confirmRoutes"));


app.listen(PORT, () => console.log(`App running on PORT http://localhost:${PORT}`));

