const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const express = require('express');
const app = express();

const knex = require('knex');
const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'asn@pg',
        database: 'smartbrains'
    }
})


// Middleware
app.use(express.json());
app.use(cors());

// Serve Requests
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, postgres, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, postgres, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, postgres)})

app.put('/image', (req, res) => {image.handleImage(req, res, postgres)})


// Listen for Requests
app.listen(3000, () => {
    console.log("Connected to Port");
})