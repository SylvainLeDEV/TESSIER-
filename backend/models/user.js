const mongoose = require('mongoose');
//Controle le format des emails / Pas obligé de faire une regex
const { isEmail } = require('validator');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, validate: [isEmail], unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);