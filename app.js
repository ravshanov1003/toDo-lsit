const express = require('express')
const mongoose = require('mongoose')

const List = require('./models/list')

// express app
const app = express()

// connect to MongoDB
const dbURI = "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=localHost&3t.defaultColor=208,60,60&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000, _ => console.log("server is running")))
    .catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    List.find().sort({ createdAt: -1 })
        .then(result => res.render('index', { title: 'ToDoList', lists: result }))
        .catch(err => console.log(err))
})

app.get('/create', (req, res) => {
    res.render('create', { title: "Create Todo List" })
})

app.get("/lists", (req, res) => {
    res.redirect("/")
});

app.post('/lists', (req, res) => {
    const list = new List(req.body)
        // res.send(lists.push(list))
    list.save()
        .then((result) => res.redirect('/lists'))
        .catch(err => console.log(err))
})

app.get('/lists/:id', (req, res) => {
    const id = req.params.id;
    List.findById(id)
        .then(result => res.render('details', { list: result, title: "List details" }))
        .catch(err => console.log(err))
})

app.delete('/lists/:id', (req, res) => {
    const id = req.params.id;
    List.findByIdAndDelete(id)
        .then(result => res.json({ redirect: '/lists' }))
        .catch(err => console.log(err))
})

app.use((req, res) => {
    res.status(404).send('<h1>Ups! Page not founded...</h1>')
})