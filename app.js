const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const Rest = require('./models/rest') // 載入 Rest model
// 引用 body-parser
const bodyParser = require('body-parser')

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
app.engine('hbs',exphbs({defaultLayout:'main', extname:'.hbs'}))
app.set ('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
// routes setting

//瀏覽全部餐廳
app.get('/', (req, res) => {
    Rest.find({})
    .lean()
    .then(rests =>res.render('index', { rests }))
    .catch(error => console.error(error)) // 錯誤處理
})

//瀏覽特定餐廳
app.get('/restaurants/:_id', (req, res) => {
    const id = req.params._id
    return Rest.findById(id)
    .lean()
    .then((rest) => res.render('show', {rest}))
    .catch(error => console.log(error))
})

//瀏覽搜尋結果
app.get('/search', (req, res) => {
    console.log(!req.query.keywords)
    if (!req.query.keywords) {
        return res.redirect('/')
    }

    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()

    Rest.find({})
        .lean()
        .then(
            rests => {
            const filterRests = rests.filter(
                data =>
                data.name.toLowerCase().includes(keyword) ||
                data.category.includes(keyword)
            )
            res.render("index", { rests: filterRests, keywords })
        })
    .catch(error => console.log(error))
})

app.get('/new', (req, res) => {
    return res.render('new')
})

app.post('/restaurants', (req, res) => {
    const {name,name_en,category,image,location,phone,google_map,rating,description} = req.body      // 從 req.body 拿出表單裡的 name 資料
    return Rest.create({name,name_en,category,image,location,phone,google_map,rating,description})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:_id/edit', (req, res) => {
    const id = req.params._id
    return Rest.findById(id)
        .lean()
        .then((rest) => res.render('edit', {rest }))
        .catch(error => console.log(error))
})

app.post('/restaurants/:_id/edit', (req, res) => {
    const id = req.params._id
    const {name,name_en,category,image,location,phone,google_map,rating,description} = req.body
    return Rest.findById(id)
        .then(rest => {
            rest.name = name
            rest.name_en = name_en
            rest.category = category
            rest.image = image
            rest.location = location
            rest.phone = phone
            rest.google_map = google_map
            rest.rating = rating
            rest.description = description
            return rest.save()
        })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
app.post('/restaurants/:_id/delete', (req, res) => {
    const id = req.params._id
    return Rest.findById(id)
        .then(rest => rest.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})