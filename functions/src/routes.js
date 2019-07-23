const express = require('express');
const NewController = require('../controllers/NewController');
const routes = new express.Router();
routes.get('/new', NewController.newTodo);
module.exports = routes;