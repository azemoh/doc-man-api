const router = require('express').Router();

const usersCtrl = require('../../app/controllers/users');

router.route('/')
  .get(usersCtrl.index);

module.exports = router;
