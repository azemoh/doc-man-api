const router = require('express').Router();

const rolesCtrl = require('../../app/controllers/roles');
const Auth = require('../../app/middlewares/auth');

router.route('/')
  .get(Auth.verifyToken, rolesCtrl.index)
  .post(Auth.verifyToken, Auth.permitAdmin, rolesCtrl.create);

router.route('/:id')
  .get(Auth.verifyToken, Auth.permitAdmin, rolesCtrl.show)
  .put(Auth.verifyToken, Auth.permitAdmin, rolesCtrl.edit)
  .delete(Auth.verifyToken, Auth.permitAdmin, rolesCtrl.destroy);

module.exports = router;
