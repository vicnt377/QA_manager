const express = require('express')
const morgan = require('morgan')
const handlebars = require ('express-handlebars')
const mongoose = require ('mongoose')

const path = require('path');
const app = express()
const port = 3000

const db = require('../config/database/db')
db.connect()

app.use(morgan('combined'))



app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const route = require('../routes')
route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})