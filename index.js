const express = require('express');
const bodyParser = require('body-parser');
const db = require("./database");
const Route = require("./route");

let app = express();
let port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
    console.log(`Application Listening on Port ${port}`)
});

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to Academy Portal Api"
    });
});


app.use("/api/v1", Route);

module.exports = app;