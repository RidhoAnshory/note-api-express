const express = require('express');
var cors = require('cors');
const db = require('./config/db.config');
const app = express();
const cookieParser = require('cookie-parser');
const routes = require('./routes');
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(routes);

db.authenticate()
  .then(() => {
    app.listen(process.env.APP_PORT, () => {
      console.log('server started on port no. 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });
