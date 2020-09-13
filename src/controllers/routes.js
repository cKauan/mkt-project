const express = require('express');
const routes = express.Router();
const passport = require('passport');
const UsersControllers = require('./UsersControllers');
const Auth = require('./UsersAuthentication');
require('./passport-auth');


routes.get('/login', passport.authenticate('google', { scope: ['profile'] }))
// Authentication
routes.get('/login/callback', passport.authenticate('google', { failureRedirect: '/login' }), UsersControllers.userAuthenticated)
// Logout 
routes.get('/logout', Auth.isLogged, UsersControllers.userLogout)
// Dashboard
routes.get('/', Auth.isLogged, UsersControllers.mainPage);
// All Users
routes.get('/users', Auth.isLogged, UsersControllers.indexUsers);
// Get only the loyal users
routes.get('/users/loyal', Auth.isLogged, UsersControllers.listLoyalUsers);
// User By ID (Not implemented, now i'm using nunjucks templates to show user details!)
routes.get('/users/show/:id', Auth.isLogged, UsersControllers.showUsers);
// It shows the form to create an user
routes.get('/users/create', Auth.isLogged, UsersControllers.createForm);
// Edits an user based on its ID
routes.get('/users/edit/:id', Auth.isLogged, UsersControllers.editUser);
// Really creates an user 
routes.post('/users/create', Auth.isLogged, UsersControllers.createUser);
// Updates an user based on its ID
routes.put('/users/edit/:id', Auth.isLogged, UsersControllers.updateUser);
// Deletes an user based on its ID
routes.delete('/users/:id', Auth.isLogged, UsersControllers.destroyUser);

module.exports = routes;