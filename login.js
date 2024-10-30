const mysql=require("mysql2");

const express = require("express");

const bodyParser = require("body-parser");
const encoder=bodyParser.urlencoded();

const app=express();



app.use("/styles", express.static("styles"));

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"UmaizaSehrish1#2",
    database:"node"
});

connection.connect(function(error){
    if(error) throw error
    else console.log("connected to the database successfully")
})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/login.html");
})

app.post("/", encoder, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    connection.query("SELECT * FROM login_user WHERE user_name=? AND pass=?", [username, password], function(error, results) {
        if (error) {
            console.error(error);
            res.redirect("/"); // Redirect on error
        } else if (results.length > 0) {
            res.redirect("/homepage");
        } else {
            res.redirect("/");
        }
    });
});

//when login success
app.get("/homepage", function(req, res){
    res.sendFile(__dirname + "/homepage.html")
})

app.listen(4500);