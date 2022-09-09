const express = require('express')
const router = express.Router()

const Rest = require('../../models/rest') // 載入 Rest model
//瀏覽全部餐廳
router.get('/', (req, res) => {
    Rest.find({})
    .lean()
    .sort({name: 'asc'})
    .then(rests =>res.render('index', { rests }))
    .catch(error => console.error(error)) // 錯誤處理
})

//瀏覽搜尋結果
router.get('/search', (req, res) => {
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

router.get('/new', (req, res) => {
    return res.render('new')
})
module.exports = router