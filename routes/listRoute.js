const express = require('express')

const List = require('../models/list')

const router = express.Router()

router.get('/', (req, res) => {
    List.find().sort({ createdAt: -1 })
        .then(result => res.render('index', { title: 'ToDoList', lists: result }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    res.render('create', { title: "Create Todo List" })
})

router.post('/lists', (req, res) => {
    const list = new List(req.body)
        // res.send(lists.push(list))
    list.save()
        .then((result) => res.redirect('/lists'))
        .catch(err => console.log(err))
})

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