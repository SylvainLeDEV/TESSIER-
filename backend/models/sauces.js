const mongoose = require('mongoose');

const sauceShema = mongoose.Schema({

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

module.exports = mongoose.model('Sauce', sauceShema);