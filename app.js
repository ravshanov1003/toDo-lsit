const express = require('express')
const mongoose = require('mongoose')

const listRoute = require('./routes/listRoute')

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

app.get("/lists", (req, res) => {
    res.redirect("/")
});

// use routes
app.use(listRoute);

app.use((req, res) => {
    res.status(404).send('<h1>Ups! Page not founded...</h1>')
})