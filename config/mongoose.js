const mongoose = require('mongoose') // 載入 mongoose

mongoose.connect(process.env.REST_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('done.')
})

module.exports = db