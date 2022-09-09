const express = require('express')
const router = express.Router()

const Rest = require('../../models/rest') // 載入 Rest model

//排序
router.get('/', (req, res) => {
    const sort = req.query.sort
    var sort1 = false
    var sort2 = false
    var sort3 = false
    var sort4 = false
    var sort5 = false
    var sort6 = false
    if(sort === 'name'){
        sort1 = true
        Rest.find({})
            .lean()
            .sort({name: 'asc'})  
            .then(rests =>res.render('index', { rests, sort1 }))
            .catch(error => console.error(error)) // 錯誤處理
    }else if(sort === 'nameDesc'){
        sort2 = true
        Rest.find({})
            .lean()
            .sort({name: 'desc'})  
            .then(rests =>res.render('index', { rests, sort2 }))
            .catch(error => console.error(error)) // 錯誤處理
    }else if(sort === 'rateDesc'){
        sort3 = true
        Rest.find({})
            .lean()
            .sort({rating: 'desc'})  
            .then(rests =>res.render('index', { rests, sort3 }))
            .catch(error => console.error(error)) // 錯誤處理
    }else if(sort === 'rate'){
        sort4 = true
        Rest.find({})
            .lean()
            .sort({rating: 'asc'})  
            .then(rests =>res.render('index', { rests, sort4 }))
            .catch(error => console.error(error)) // 錯誤處理
    }else if(sort === 'cate'){
        sort5 = true
        Rest.find({})
            .lean()
            .sort({category: 'asc'})  
            .then(rests =>res.render('index', { rests, sort5 }))
            .catch(error => console.error(error)) // 錯誤處理
    }else {
        sort6 = true
        Rest.find({})
            .lean()
            .sort({location: 'asc'})  
            .then(rests =>res.render('index', { rests, sort6 }))
            .catch(error => console.error(error)) // 錯誤處理
    }
})

module.exports = router