const express = require('express');

// La méthodeexpress.Router()vous permet de créer des routeurs séparés pour chaque route principale de votre application
//  vous y enregistrez ensuite les routes individuelles.
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