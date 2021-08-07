const express = require('express')

const listController = require('../controllers/listController')

const router = express.Router()

router.get('/', listController.list_index)

router.get('/create', listController.list_create)

router.post('/lists', listController.list_post)

router.get('/lists/:id', (req, res) => {
    const id = req.params.id;
    List.findById(id)
        .then(result => res.render('details', { list: result, title: "List details" }))
        .catch(err => console.log(err))
})

router.delete('/lists/:id', (req, res) => {
    const id = req.params.id;
    List.findByIdAndDelete(id)
        .then(result => res.json({ redirect: '/lists' }))
        .catch(err => console.log(err))
})

module.exports = router