require('dotenv').config();  // Load environment variables from .env
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const encoder = bodyParser.urlencoded();

const session = require('express-session');

app.use(session({
    secret: 'InSyncFall2024', // Secret key
    resave: false,
    saveUninitialized: false,
}));


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/styles", express.static("styles")); // For css files
app.use("/scripts", express.static("scripts")); // For JavaScript files
app.use("/images", express.static("images"));   // For image files

// Database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
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
            req.session.user = results[0]; // Store user info in the session
            res.redirect("/homepage");
        } else {
            res.redirect("/?error=invalid-credentials");
        }
    });
});


//when login success
app.get("/homepage", function (req, res) {
    res.sendFile(__dirname + "/homepage.html");
})

//Serve translate page
app.get("/translate", function (req, res){
    res.sendFile(__dirname + "/translate.html");
})

//Serve history page
app.get("/history", function (req, res){
    res.sendFile(__dirname + "/history.html");
})

//Serve learn page
app.get("/learn", function (req, res){
    res.sendFile(__dirname + "/learn.html");
})

//Serve flashcard page
app.get("/flashcard", function (req, res){
    res.sendFile(__dirname + "/flashcards.html");
})

//Serve dictionary page
app.get("/dictionary", function (req, res){
    res.sendFile(__dirname + "/dictionary.html");
})

//Serve quiz page
app.get("/quiz", function (req, res){
    res.sendFile(__dirname + "/Quiz.html");
})

// Serve profile page
app.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/"); // Redirect to login if not logged in
    }

    const user = req.session.user; // Retrieve user info from session
    res.render("profile.ejs", { user });
});

//profile update
app.post("/profile/update", encoder, (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Unauthorized");
    }

    const { user_name, user_email, pass } = req.body;
    const userId = req.session.user.user_id; 

    connection.query(
        "UPDATE login_user SET user_name = ?, user_email = ?, pass=? WHERE user_id = ?",
        [user_name, user_email, pass, userId],
        (error, results) => {
            if (error) {
                console.error("Database update error:", error);
                return res.status(500).send("Error updating profile");
            }

            // Update the session with the new data
            req.session.user.user_name = user_name;
            req.session.user.user_email = user_email;
            req.session.user.pass = pass;

            res.send({ success: true });
        }
    );
});



//Serve signup page
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

// Handle signup
app.post("/signup", encoder, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // Insert user into the database
    connection.query("INSERT INTO login_user (user_name, pass, user_email) VALUES (?, ?, ?)", [username, password, email], (error, results) => {
        if (error) {
            console.error(error);
            res.send("<script>alert('Signup failed. Please try again.'); window.location.href='/signup';</script>");
        } else {
            res.redirect("/homepage");
        }
    });
});

// Start the server
const PORT = process.env.PORT || 4500; // Use the port from environment variables if set, otherwise default to 4500
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
