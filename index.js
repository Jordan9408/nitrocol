const mysql = require('mysql');
const express = require("express");
const session = require('express-session');

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nitrocol.db'
})
const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (request, response) {
    response.render("insertProduit")
});

app.post('/accueil', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
        connexion.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true; //Ouvrir la session
                request.session.username = username;
                response.redirect('/views/insertProduit')
            } else {
                response.send('usernmae ou mdp ERREUR ')
            }
            response.end();
        })
    } else {
        response.send('enter user et mdp');
        response.end();
    }
});

app.get('/views/insertProduit', function (request, response) {
    if (request.session.loggedin) {
        response.send('hello , ' + request.session.username + '');
    } else {
        response.send('go login');
    }
    response.end();
});

class Produit {
    constructor(titre, descript, image, date, avis, prix) {
        this.titre = titre;
        this.descriptions = descript;
        this.image = image;
        this.date = datetime;
        this.avis = avis;
        this.prix = prix;
    }
};

app.post("/nitrocol", (request, response) => {
    const querys = "INSERT INTO PRODUITS (titre, descript, image, date, avis, prix) VALUES ('" + request.body.titre + "', '" + request.body.descript + "', '" + request.body.image + "', '" + request.body.date + "', '" + request.body.avis + "', '" + request.body.prix + "');";
    console.log(querys);
    connect.query(querys, function (err, result) {
        if (err) throw err;
        console.log(result);
        response.redirect('/liste-de-produit')
    })

});


app.get("/nitrocol", function (request, response) {
    const result = false
    response.render("produit", { produit: result })
})
app.listen(8081);