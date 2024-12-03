
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
    host: '35.238.196.2', //public ip address
    user: 'root',
    password: 'Insync',
    database: 'node',
    port: 3306
});



connection.connect((err)=> {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
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
//app.get("/history", function (req, res){
  //  res.sendFile(__dirname + "/history.html");
//})

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

//Serve Tutorial page
app.get("/tutorial", function (req, res){
    res.sendFile(__dirname + "/tutorial.html");
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

// Handle saving translation
app.post('/save_translation', express.json(), (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    const userId = req.session.user.user_id;
    const { original_text, translate_text, target_lang } = req.body;
    const timestamp = new Date();

    connection.query(
        "INSERT INTO history (user_id, original_text, translate_text, target_lang, timestamp) VALUES (?, ?, ?, ?, ?)",
        [userId, original_text, translate_text, target_lang, timestamp],
        (error, results) => {
            if (error) {
                console.error("Database insert error:", error);
                res.status(500).send({ error: 'Error saving translation' });
            } else {
                res.send({ status: 'success' });
            }
        }
    );
});

// Serve history page
app.get("/history", function (req, res){
    if (!req.session.user) {
        return res.redirect("/"); // Redirect to login if not logged in
    }

    const userId = req.session.user.user_id;

    connection.query("SELECT * FROM history WHERE user_id = ? ORDER BY timestamp DESC", [userId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            res.status(500).send("Error retrieving translation history");
        } else {
            res.render("history.ejs", { translations: results });
        }
    });
});


// Start the server
const PORT = process.env.PORT || 4500; // Use the port from environment variables if set, otherwise default to 4500
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
