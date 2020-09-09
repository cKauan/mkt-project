const express = require('express');
const routes = express.Router();
const ProductController = require('./UsersControllers');

routes.get('/', ProductController.main);
routes.get('/users', ProductController.index);
routes.get('/users/:id', ProductController.show);
routes.post('/users/create', ProductController.create);
routes.put('/users/:id', ProductController.update);
routes.delete('/users/:id', ProductController.destroy);

module.exports = routes;