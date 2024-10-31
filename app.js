const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const encoder = bodyParser.urlencoded();

app.use("/styles", express.static("styles")); // For css files
app.use("/scripts", express.static("scripts")); // For JavaScript files
app.use("/images", express.static("images"));   // For image files

// Database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "UmaizaSehrish1#2",
    database: "node"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("Connected to the database successfully");
});

// Serve HTML pages
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

// Handle login
app.post("/", encoder, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    connection.query("SELECT * FROM login_user WHERE user_name=? AND pass=?", [username, password], (error, results) => {
        if (error) {
            console.error(error);
            res.redirect("/");
        } else if (results.length > 0) {
            res.redirect("/homepage");
        } else {
            res.send("<script>alert('Wrong user information. Please try again.'); window.location.href='/';</script>");
        }
    });
});

//when login success
app.get("/homepage", function (req, res) {
    res.sendFile(__dirname + "/homepage.html")
})


// Serve profile page
app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/profile.html");
});

//Serve signup page
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

// Handle signup
app.post("/signup", encoder, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Insert user into the database
    connection.query("INSERT INTO login_user (user_name, pass) VALUES (?, ?)", [username, password], (error, results) => {
        if (error) {
            console.error(error);
            res.send("<script>alert('Signup failed. Please try again.'); window.location.href='/signup';</script>");
        } else {
            res.redirect("/homepage");
        }
    });
});

//when signup success
app.get("/homepage", function (req, res) {
    res.sendFile(__dirname + "/homepage.html")
})

// Start the server
const PORT = 4500;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
