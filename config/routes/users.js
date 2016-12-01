const router = require('express').Router();

const usersCtrl = require('../../app/controllers/users');
const documentsCtrl = require('../../app/controllers/documents');
const Auth = require('../../app/middlewares/auth');

router.route('/')
  .get(Auth.verifyToken, usersCtrl.index)
  .post(usersCtrl.create);

router.route('/:id')
  .get(Auth.verifyToken, usersCtrl.show)
  .put(Auth.verifyToken, usersCtrl.edit)
  .delete(Auth.verifyToken, usersCtrl.destroy);

router.get('/:id/documents', Auth.verifyToken, documentsCtrl.userDocuments);

router.post('/login', usersCtrl.login);
router.post('/logout', usersCtrl.logout);

module.exports = router;
