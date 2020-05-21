const express = require('express');
const bodyParser = require('body-parser');
const db = require("./database");
// const authRoute = require("./Routes/authRoute");

let app = express();
let port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
    console.log(`Application Listening on Port ${port}`)
});

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to Academy Portal Api"
    });
});


// app.use("/api/v1", authRoute);
