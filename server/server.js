// import thư viện express
var express = require('express')
var app = express()
// khai báo cổng chạy dịch vụ
// var PORT = process.env.PORT || 3000
var PORT = 80
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var products = [
  {
    id: 'CPU',
    item: [
      {product: 'i5-9400', price: 5000},
      {product: 'i5-8400F', price: 4200},
      {product: 'i7-9700K', price: 10000}
    ]
  },
  {
    id: 'MainProducts',
    item: [
      {product: 'Asrock', price: 4100},
      {product: 'Asus', price: 5000},
      {product: 'Gigabyte', price: 4500}
    ]
  },
  {
    id: 'RamProducts',
    item: [
      {product: '32GB', price: 9000},
      {product: '16GB', price: 4000},
      {product: '8GBx2', price: 3500}
    ]
  }
]

var menu = [
  {
    tab: 1,
    name: 'Menu',
    url: 'localhost:8080/menu'
  },
  {
    tab: 2,
    name: 'Products',
    url: 'localhost:8080/products'
  },
  {
    tab: 3,
    name: 'Banner',
    url: 'localhost:8080/banner'
  }
]
var banner = [
  {
    id: 0,
    url: 'https://fpt.vn/assets/frontend/img/icon/logo.png'
  }
]

app.get('/menu', function (req, res) {
  res.send(menu)
})

app.get('/products', function (req, res) {
  res.send(products)
})

app.get('/banner', function (req, res) {
  res.send(banner)
})

app.use('/', express.static('./dist'))

app.listen(PORT, function () {
  console.log('Express listening on port' + PORT + '!')
})
