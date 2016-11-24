const router = require('express').Router();

const usersCtrl = require('../../app/controllers/users');

router.route('/')
  .get(usersCtrl.index)
  .post(usersCtrl.create);

router.route('/:id')
  .get(usersCtrl.show)
  .put(usersCtrl.edit)
  .delete(usersCtrl.destroy);

module.exports = router;
