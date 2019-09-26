const Router = require('express-promise-router');

const Controller = require('./controller');

const router = Router();

router
  .get('/feed', Controller.getAll)
  .post('/feed', Controller.create)

module.exports = router;
