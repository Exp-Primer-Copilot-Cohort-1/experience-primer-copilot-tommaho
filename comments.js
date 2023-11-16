//create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const {Comment} = require('./models');
const {DATABASE_URL, PORT} = require('./config');

app.use(express.static('public'));

//GET request
app.get('/comments', (req, res) => {
  Comment
    .find()
    .limit(10)
    .then(comments => {
      res.json({
        comments: comments.map(
          (comment) => comment.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'})
    });
});

//POST request
app.post('/comments', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  //check if all required fields are present
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    //if any field is missing, send error message
    if (!(field in req.body)) {
      const message = `Missing \'${field}\' in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Comment
    .create({
      title: req.body.title,
      content: req.body.content,