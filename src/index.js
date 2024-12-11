const express = require('express')
const morgan = require('morgan')
const handlebars = require ('handlebars')
const { engine } = require('express-handlebars');
const mongoose = require ('mongoose')

const path = require('path');
const app = express()
const port = 3000

const { format } = require('date-fns');


const db = require('../config/database/db')
db.connect()

app.use(morgan('combined'))



app.engine('hbs', engine({
  extname: 'hbs',
  helpers: {
    multiply: (a, b) => a * b,
    formatDate: function (date) {
      return format(new Date(date), 'dd/MM/yyyy');
  }
  }
}));
handlebars.registerHelper('shortId', function(id) {
  if (id && typeof id.toString === 'function') {
    const idString = id.toString(); // Chuyển id thành chuỗi
    return idString.substring(idString.length - 4); // Lấy 8 ký tự cuối cùng
  }
  return ''; // Trả về chuỗi rỗng nếu id không hợp lệ
});


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.static('uploads'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const route = require('../routes')
route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})