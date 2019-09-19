const Router = require('express-promise-router');

const Controller = require('./controller');

const router = Router();

router
  .post('/feed', Controller.create)
  .get('/feed', (req, res) => res.send('no') )

module.exports = router;
