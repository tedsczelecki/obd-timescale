const Router = require('express-promise-router');

const Controller = require('./controller');

const router = Router();

router
  .post('/feed', Controller.create)

module.exports = router;
