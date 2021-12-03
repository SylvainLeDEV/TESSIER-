const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceControllers = require('../controllers/sauces');

router.post('/', auth, multer, sauceControllers.createSauce);
router.get('/', auth, sauceControllers.getAllSauce);
router.get('/:id', auth, sauceControllers.getOneSauce);
router.put('/:id', auth, multer, sauceControllers.modifySauce);
router.delete('/:id', auth, sauceControllers.deleteSauce);
router.post('/:id/like', auth, sauceControllers.likeSauce);


module.exports = router;