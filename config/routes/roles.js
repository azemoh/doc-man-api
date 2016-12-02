const router = require('express').Router();

const rolesCtrl = require('../../app/controllers/roles');
const Auth = require('../../app/middlewares/auth');

router.route('/')
  .get(Auth.verifyToken, rolesCtrl.index)
  .post(Auth.verifyToken, rolesCtrl.create);

module.exports = router;
