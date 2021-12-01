const express = require('express');
const router = express.Router();

const sauceControllers = require('../controllers/sauces');
const auth = require('../middleware/auth');


// router.post( '/',auth , sauceControllers.createSauce);
// router.get('/',auth, sauceControllers.getAllStuff);
// router.get('/:id',auth, sauceControllers.getOneThing);
// router.put('/:id',auth, sauceControllers.modifyThing);
// router.delete('/:id',auth, sauceControllers.deleteThing);



module.exports = router;