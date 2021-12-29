const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimite = require('express-rate-limit');
require('dotenv').config({ encoding: "latin1" });
const mongoMask = require('mongo-mask')

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/users');


// Pour créer une application Express, appelez simplement la méthode  express()
const app = express();

// Mongoose est un package qui facilite les interactions avec notre base de données MongoDB
mongoose.connect(process.env.MONGOOSE_KEY,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


//CORS Police : Cross Origin Resource Sharing
app.use((req, res, next) => {
    // d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Origin', '*');
    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Par exemple, Node.js a un module de cookies avec HttpOnly, et un middleware appelé Helmet.
app.use(helmet());

// Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  application/json
// et met à disposition leur  body  directement sur l'objet req
app.use(express.json());

app.use(rateLimite({
    windowMs: 24 * 60 * 60 * 1000,
    max: 100,
    message: "Vous avez effectué plus de 100 requétes dans une limite de 24 heures!",
    headers: true,
}));

const path = require('path');

// Router
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;