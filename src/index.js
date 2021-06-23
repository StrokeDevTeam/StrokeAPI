const mysql = require('mysql2');
require('dotenv').config();

var express = require("express");

var app = express();

var con = mysql.createConnection({
    host: process.env.DATABASEHOST,
    port: process.env.DATABASEPORT,
    user: process.env.DATABASEUSER,
    password: process.env.DATABASEPASS,
    database: process.env.DATABASENAME
});


con.connect(function (err) {
    if(err) throw  err;
    console.log("Connected!")
});

con.on('error', function (err) {
    console.log("[mysql error]", err);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/api/player", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    var ps = 'SELECT * FROM playerdata';

    con.query(ps, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result);
        }
    });
});