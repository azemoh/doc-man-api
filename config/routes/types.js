const router = require('express').Router();

const typesCtrl = require('../../app/controllers/types');
const Auth = require('../../app/middlewares/auth');

router.route('/')
  .get(Auth.verifyToken, typesCtrl.index)
  .post(Auth.verifyToken, typesCtrl.create);

module.exports = router;
