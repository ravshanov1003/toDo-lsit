const express = require('express')

const listController = require('../controllers/listController')

const router = express.Router()

router.get('/', listController.list_index)

router.get('/create', listController.list_create)

router.post('/lists', listController.list_post)

router.get('/lists/:id', listController.list_byId)

router.delete('/lists/:id', listController.list_deleteById)

module.exports = router