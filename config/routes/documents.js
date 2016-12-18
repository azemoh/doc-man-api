const router = require('express').Router();

const documentsCtrl = require('../../app/controllers/documents');
const Auth = require('../../app/middlewares/auth');

router.route('/')
  .get(Auth.verifyToken, documentsCtrl.index)
  .post(Auth.verifyToken, documentsCtrl.create);

router.route('/:id')
  .get(Auth.verifyToken, documentsCtrl.show)
  .put(Auth.verifyToken, documentsCtrl.edit)
  .delete(Auth.verifyToken, documentsCtrl.destroy);

module.exports = router;
