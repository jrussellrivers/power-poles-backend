const express = require("express");
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

const checkIfLoggedIn = require('./js/checkIfLoggedIn')

const User = require('./js/User')()
const Inspections = require('./js/Inspections')()
const Photos = require('./js/Photos')()

app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

app.get('/logout', (req,res)=>{
    req.logout()
})

app.post('/register', async (req,res)=>{
    let status = await User.checkIfExist(db, req.body.username)
    if (status === null) {
        await User.createUser(db, req.body.username, req.body.password, req.body.inspection_id, req.body.admin)
        res.send({status: true})
    } else {
        res.send({status: false})
    }
})

app.get('/user/username/:username', checkIfLoggedIn, async (req,res)=>{
    let result = await User.grabUser(db, req.params.username)
    result !== null ? res.send({status: true, content: result}) : res.send({status: false})
})

app.post('/user/edit/:id', checkIfLoggedIn, async (req,res)=>{
    await User.editUser(db, req.params.id, req.body.username, req.body.password, req.body.inspection_id, req.body.admin)
})

app.get('/inspection/all', checkIfLoggedIn, async (req,res)=>{
    let result = await Inspections.grabALLInspections(db)
    res.send(result)
})

app.get('/inspection/one/:id', checkIfLoggedIn, async (req,res)=>{
    let result = await Inspections.grabInspection(db, req.params.id)
    result !== null ? res.send({status: true, content: result}) : res.send({status: false})
})

app.post('/inspection/create', checkIfLoggedIn, async (req,res)=>{
    let status = await Inspections.checkIfExist(db, req.body.id)
    if (status === null) {
        await Inspections.createInspection(db, req.body.id, req.body.code, req.body.name)        
        res.send({status: true})
    } else {
        res.send({status: false})
    }
})

app.post('/inspection/edit/:id', checkIfLoggedIn, async (req,res)=>{
    await Inspections.editInspection(db, req.params.id, req.body.id, req.body.code, req.body.name)
})

app.get('/grabAllPhotos', checkIfLoggedIn, async (req,res)=>{
    let result = await Photos.grabAllPhotos(db, req.user.inspection_id)
    res.send(result)
})

app.get('/grabSinglePhoto/:name', checkIfLoggedIn, async (req,res)=>{
    let result = await Photos.grabSinglePhoto(db, req.params.name)
    res.send(result)
})

app.listen(port)