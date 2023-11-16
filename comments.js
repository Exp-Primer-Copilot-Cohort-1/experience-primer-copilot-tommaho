//create web server
const express = require('express');
const app = express();
const port = 3000;

//set view engine
app.set('view engine', 'ejs');

//set public folder
app.use(express.static('public'));

//use body parser
app.use(express.urlencoded({ extended: true }));

//use method override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//connect to mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

//define schema
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now },
});
const Blog = mongoose.model('Blog', blogSchema);

