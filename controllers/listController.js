const List = require('../models/list')

const list_index = (req, res) => {
    List.find().sort({ createdAt: -1 })
        .then(result => res.render('index', { title: 'ToDoList', lists: result }))
        .catch(err => console.log(err))
}

const list_create = (req, res) => {
    res.render('create', { title: "Create Todo List" })
}

const list_post = (req, res) => {
    const list = new List(req.body)
        // res.send(lists.push(list))
    list.save()
        .then((result) => res.redirect('/lists'))
        .catch(err => console.log(err))
}

module.exports = {
    list_index,
    list_create,
    list_post,

}