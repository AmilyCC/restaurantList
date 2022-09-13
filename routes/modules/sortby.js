const express = require('express')
const router = express.Router()

const Rest = require('../../models/rest') // 載入 Rest model

//排序
router.get('/', (req, res) => {
    const sort = req.query.sort
    if(sort === 'name'){
        var sort1 = sort
        Rest.find({})
            .lean()
            .sort({name: 'asc'})  
            .then(rests =>res.render('index', { rests, sort1 }))
            .catch(error => console.error(error)) // 錯誤處理
    }else if(sort === 'nameDesc'){
        var sort2 = sort
        Rest.find({})
            .lean()
            .sort({name: 'desc'})  
            .then(rests =>res.render('index', { rests, sort2 }))
            .catch(error => console.error(error)) // 錯誤處理
    }else if(sort === 'rateDesc'){
        var sort3 = sort
        Rest.find({})
            .lean()
            .sort({rating: 'desc'})  
            .then(rests =>res.render('index', { rests, sort3 }))
            .catch(error => console.error(error)) // 錯誤處理
    }else if(sort === 'rate'){
        var sort4 = sort
        Rest.find({})
            .lean()
            .sort({rating: 'asc'})  
            .then(rests =>res.render('index', { rests, sort4 }))
            .catch(error => console.error(error)) // 錯誤處理
    }else if(sort === 'cate'){
        var sort5 = sort
        Rest.find({})
            .lean()
            .sort({category: 'asc'})  
            .then(rests =>res.render('index', { rests, sort5 }))
            .catch(error => console.error(error)) // 錯誤處理
    }else {
        var sort6 = sort
        Rest.find({})
            .lean()
            .sort({location: 'asc'})  
            .then(rests =>res.render('index', { rests, sort6 }))
            .catch(error => console.error(error)) // 錯誤處理
    }
})

module.exports = router