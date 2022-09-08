const mongoose = require('mongoose')// 取得資料庫連線狀態
const Rest = require('../rest')

mongoose.connect(process.env.REST_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  const restaurantList = require('../../restaurant.json')
  Rest.create(restaurantList.results)
  console.log('done.')
})