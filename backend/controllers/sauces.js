const sauces = require('../models/sauces');

exports.createSauce = (req, res, next) => {
    console.log('Requête reçue !');
    next();
};