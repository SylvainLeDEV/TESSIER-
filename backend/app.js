const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimite = require('express-rate-limit');
const dotenv = require('dotenv').config({ encoding: "latin1" });

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/users');

mongoose.connect(process.env.MONGOOSE_KEY,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//CORS Police
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());

app.use(express.json());

app.use(rateLimite({
    windowMs: 24 * 60 * 60 * 1000,
    max: 100,
    message: "Vous avez effectué plus de 100 requétes dans une limite de 24 heures!",
    headers: true,
}));

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;