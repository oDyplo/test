const express = require("express")
const db = require("better-sqlite3")("myApp.db")
db.pragma("journal_mode = WAL")

//db setup
const createTables = db.transaction(() => {
    db.prepare(
        `
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username STRING NOT NULL UNIQUE,
        password STRING NOT NULL
        )
        `

    ).run()
})

createTables()

//db setup ends here

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))

app.use(function (req, res, next) {
    res.locals.errors = []
    next()
})

//start home
app.get("/", (req, res) => {
    res.render("homepage")
})

//load login page
app.get("/login", (req, res) => {
    res.render("login")
})

//post 
app.post("/register", (req, res) => {
    const errors = []

    if (typeof req.body.username !== "string") req.body.username = ""
    if (typeof req.body.password !== "string") req.body.password = ""

    req.body.username = req.body.username.trim()

    if (!req.body.username) errors.push("You must provide a username.")
    if (req.body.username && req.body.username.length < 3) errors.push("Username must be atleast 3 characters")
    if (req.body.username && req.body.username.length > 12) errors.push("Username cannot exceed 12 characters")
    if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) errors.push("Username can only contain letters and numbers")
   
        if (!req.body.password) errors.push("You must provide a password.")
        if (req.body.password && req.body.password.length < 8) errors.push("Password must be atleast 8 characters")
        if (req.body.password && req.body.password.length > 18) errors.push("Password cannot exceed 18 characters")
            

    if (errors.length) {
        return res.render("homepage", {errors})
    }
    // save new user into a db


    // log user in by giving cookie
    
})



//port to listen
app.listen(3000)
