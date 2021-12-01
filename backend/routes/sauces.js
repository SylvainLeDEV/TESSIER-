const express = require('express');
const router = express.Router();

const sauceControllers = require('../controllers/sauces');
const auth = require('../middleware/auth');


router.post('/', auth, sauceControllers.createSauce);
router.get('/', auth, sauceControllers.getAllSauce);
router.get('/:id', auth, sauceControllers.getOneSauce);
router.put('/:id', auth, sauceControllers.modifySauce);
router.delete('/:id', auth, sauceControllers.deleteSauce);


module.exports = router;