const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("hello from my app")
})

app.listen(3000)
