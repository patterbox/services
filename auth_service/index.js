require('dotenv').config();

const bodyParser = require('body-parser');
const Controllers = require('./controllers/index');
const express = require('express');
const port = 3001;
const app = express();

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Controllers(app);

app.listen(app.get('port'), () =>{
  console.log(`App listening on ${app.get('port')}`);
})
