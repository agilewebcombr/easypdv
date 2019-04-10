const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors());

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })
});

mongoose.connect("mongodb://easypdv:XzJasOSrvXbLrz08hNGdnEPf903ehPXhL7qSleA3xQ1iK5ww89sUXv6NUkF26jfEpTlfVHRkc8ZRUFmK7McSMg%3D%3D@easypdv.documents.azure.com:10255/easypdv?ssl=true", {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3333);