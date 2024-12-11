const express = require('express')
const morgan = require('morgan')
const handlebars = require ('handlebars')
const { engine } = require('express-handlebars');
const mongoose = require ('mongoose')

const path = require('path');
const app = express()
const port = 3000

const db = require('../config/database/db')
db.connect()

app.use(morgan('combined'))



app.engine('hbs', engine({
  extname: 'hbs',
  helpers: {
    multiply: (a, b) => a * b
  }
}));
handlebars.registerHelper('shortId', function(id) {
  // Kiểm tra nếu id không phải là null/undefined và có phương thức toString
  if (id && typeof id.toString === 'function') {
    return id.toString().substring(0, 8); // Chuyển id thành chuỗi và lấy 8 ký tự đầu tiên
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