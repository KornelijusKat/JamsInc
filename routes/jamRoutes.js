const express = require('express');
const jamController = require('../controllers/jamController')
const router = express.Router();

//router.param('id', jamController.checkId);
router
    .route('/efficiency')
    .get(jamController.getEfficiency)
router
    .route('/')
    .get(jamController.getJams)
    .post(jamController.checkBody, jamController.createJam)
router
    .route('/:id')
    .get(jamController.checkId,jamController.getJamById)
    .patch(jamController.checkId,jamController.checkBody,jamController.updateJam)
    .delete(jamController.checkId,jamController.deleteJam)
module.exports = router;