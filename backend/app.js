const express = require('express');
const helmet = require('helmet');
const rateLimite = require('express-rate-limit');
require('dotenv').config({ path: './config/.env',encoding: "latin1" });
const mongoMask = require('mongo-mask');
const bodyParser = require("body-parser");
require('./config/db');

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/users');


// Pour créer une application Express, appelez simplement la méthode  express()
const app = express();


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

// Par exemple, Node.js a un module de cookies avec HttpOnly, et un middleware appelé Helmet. XSS
app.use(helmet());

// Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  application/json
// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(bodyParser.json());
// or app.use(express.json());

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

//Exemple de middleware
// app.use(endpoint: URL visé par l'api '/api/sauces/.. ', (req, res, next) => {
//     console.log(req.body);
//     res.status(201).json({
//         message: 'Objet créé !'
//     });
// });