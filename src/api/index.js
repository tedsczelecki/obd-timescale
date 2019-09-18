const express = require('express');

const Controller = require('./controller');
const PostsRoute = require('./trip');
const UsersRoute = require('./users');

const router = express.Router();

router.get('/ping', Controller.ping);

router.use('/trip', PostsRoute);
router.use('/users', UsersRoute);

module.exports = router;
