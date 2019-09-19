const express = require('express');

const Controller = require('./controller');
const PostsRoute = require('./trip');

const router = express.Router();

router.get('/ping', Controller.ping);

router.use('/trip', PostsRoute);

module.exports = router;
