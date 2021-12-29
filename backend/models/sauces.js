const mongoose = require('mongoose');

// La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.
const sauceShema = mongoose.Schema({
    // _id : Automatiquement généré par Mongoose
    name: { type: String, required: true },
    manufacturer:{ type : String, required: true},
    mainPepper:{ type : String, required: true},
    heat:{ type : Number, required: true},
    likes:{ type : Number },
    dislikes:{ type : Number },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    usersLiked: [{ type: String }],
    usersDisliked: [{ type: String }],

});

// La méthode  model  transforme ce modèle en un modèle utilisable.
module.exports = mongoose.model('Sauce', sauceShema);