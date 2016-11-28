const router = require('express').Router();

const documentsCtrl = require('../../app/controllers/documents');

router.route('/')
  .get(documentsCtrl.index)
  .post(documentsCtrl.create);

router.route('/:id')
  .get(documentsCtrl.show)
  .put(documentsCtrl.edit)
  .delete(documentsCtrl.destroy);

module.exports = router;
