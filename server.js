const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
require('./src/modules/ApiModels');

const apiRouter = require('./src/modules/ApiRoutes');

mongoose.connect('mongodb://localhost/metinetjs');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open',
    function () {
        const app = express();

        app.use(cors());

        app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
        app.use(bodyParser.json()); // parse application/json

        app.use(function (req, res, next) {
            if (app.get('env') === 'development') {
                console.log(`${req.method} ${req.baseUrl}`);
            }

            req.data = {};
            next();
        });

        app.use('/api', apiRouter);// ALL /api

        app.use(express.static(__dirname + '/public'));

        app.use(function (req, res, next) {
            next({
                message: `Erreur 404 : ${req.method} ${req.url} introuvable.`,
                status: 404
            });
        });

        app.use(function (err, req, res, next) {
            const status = err.status || 500;
            res.status(status);

            if (app.get('env') === 'development') {
                console.error(err); // en développement uniquement
            }

            res.format({
                'text/plain': function () {
                    res.send(err.message);
                },

                'text/html': function () {
                    res.send(
                        `<!DOCTYPE html>
                    <html lang="fr">
                        <head>
                            <meta charset="utf-8">
                        <title>Erreur ${status}</title>
                        </head>
                        <body>
                            <pre>${err.message}</pre>
                        </body>
                    </html>`
                    );
                },

                'application/json': function () {
                    res.send({"message": err.message});
                },

                'default': function () {
                    res.status(406).send("\"Accept\" Header Not Acceptable.");
                }
            });
        });

        app.listen(3000, function () {
            console.log("Le serveur écoute sur le port 3000");
        });
    }
);