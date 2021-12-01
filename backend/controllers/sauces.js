const sauces = require('../models/sauces');

// exports.createSauce = (req, res, next) => {
//     console.log('Requête reçue !');
//     next();
// };

exports.deleteSauce = (req, res, next) => {
    sauces.findOne({_id: req.params.id})
        .then((sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('objet non trouvé ! ')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({
                    error: new Error('Requête non autorisée !')
                });
            }
            sauces.deleteOne({_id: req.params.id})
                .then(() => {
                    res.status(200).json({
                        message: 'Deleted'
                    });
                })
                .catch((error) => {
                    res.status(400).json({
                        error: error
                    })
                })
        })
};