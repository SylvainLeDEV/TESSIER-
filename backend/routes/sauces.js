const express = require('express');
const router = express.Router();

const sauceControllers = require('../controllers/sauces');


router.post( '/' , sauceControllers.createSauce);
// router.get('/', sauceControllers.getAllStuff);
// router.get('/:id', sauceControllers.getOneThing);
// router.put('/:id', sauceControllers.modifyThing);
// router.delete('/:id', sauceControllers.deleteThing);



module.exports = router;