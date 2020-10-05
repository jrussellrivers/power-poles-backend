const express = require("express");
// const bodyParser = require('body-parser');
const cors = require("cors");
const secretInfo = require("./config.js");
const app = express();
const pgp = require("pg-promise")();
const eS = require("express-session");
const expressSession = eS(secretInfo().secret);
const db = pgp(secretInfo().connect)
const port = 7000

//for passport encryption
const bcrypt = require("bcrypt");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

const checkIfExist = require('./js/checkIfExist')
const checkIfLoggedIn = require('./js/checkIfLoggedIn')
const createUser = require('./js/createUser')
const findPole = require('./js/findPole')

// const passInfo = (req, res, next) => {
//     res.db = db;
//     res.saltRounds = saltRounds;
//     res.bcrypt = bcrypt;
//     next();
// };

// app.use(passInfo)
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(bodyParser.json({ limit: "50mb" }))
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

passport.use(
    new Strategy((username, password, callback) => {
        db.one(`SELECT * FROM users WHERE username='${username}'`)
        .then((u) => {
            bcrypt.compare(password, u.password).then((result) => {
            if (!result) return callback(null, false);
            return callback(null, u);
            });
        })
        .catch(() => callback(null, false));
    })

);

passport.serializeUser((user, callback) => callback(null, user.id));

passport.deserializeUser((id, callback) => {
  db.one(`SELECT * FROM users WHERE id='${id}'`)
    .then((u) => {
        return callback(null, u);
    })
    .catch(() => callback({ "not-found": "No User With That ID Is Found" }));
});

app.get(`/`, checkIfLoggedIn, async (req, res) => {});

app.post('/login', passport.authenticate('local'), (req,res)=>{
    if (req.user) {
        return res.send({ loggedin: "true", user: req.user });
    }
    res.send({ loggedin: "false" });
})

app.post('/register', checkIfExist, createUser, (req,res)=>{
    res.send(true)
})

// app.get()

app.listen(port)