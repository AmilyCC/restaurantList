const express = require('express')
const router = express.Router()

const Rest = require('../../models/rest') // 載入 Rest model

//瀏覽特定餐廳
router.get('/:id', (req, res) => {
    const id = req.params.id
    return Rest.findById(id)
    .lean()
    .then((rest) => res.render('show', {rest}))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
    const {name,name_en,category,image,location,phone,google_map,rating,description} = req.body      // 從 req.body 拿出表單裡的 name 資料
    return Rest.create({name,name_en,category,image,location,phone,google_map,rating,description})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Rest.findById(id)
        .lean()
        .then((rest) => res.render('edit', {rest }))
        .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
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
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Rest.findById(id)
        .then(rest => rest.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router