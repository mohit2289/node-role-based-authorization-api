﻿const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const Logger = require('_helpers/logger');

router.post('/authenticate', authenticate,Logger());     // public route
router.get('/', getAll); // admin only
router.get('/:id', getById);       // all authenticated users
router.post('/adduser',addNewUser,Logger());
module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
        next();
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
        next();
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
   /* if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }*/

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
        next();
}

function addNewUser(req,res,next){
        var postData  = req.body;
        userService.addNewUser(postData).then(users => res.json(users)).catch(err => next(err));
}