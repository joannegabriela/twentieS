import express from 'express';
import { router } from './routes/routes';
var bodyParser = require('body-parser');
var expressSession = require('express-session');

const app = express();

app.use(expressSession({
    secret: process.env.SPOTIFY_CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
    maxAge: 2 * 60 * 60 * 1000 // 2 hours 
})); 

app.use(express.json());

app.use(router);

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


export { app };