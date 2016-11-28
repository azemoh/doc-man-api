const router = require('express').Router();

const usersCtrl = require('../../app/controllers/users');
const documentsCtrl = require('../../app/controllers/documents');

router.route('/')
  .get(usersCtrl.index)
  .post(usersCtrl.create);

router.route('/:id')
  .get(usersCtrl.show)
  .put(usersCtrl.edit)
  .delete(usersCtrl.destroy);

router.get('/:id/documents', documentsCtrl.userDocuments);

router.post('/login', usersCtrl.login);
router.post('/logout', usersCtrl.logout);

module.exports = router;
