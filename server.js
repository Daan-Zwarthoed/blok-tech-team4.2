const express = require("express");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const router = require("src/routes/router.js");

const app = express();
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`

// Static files
app.use(express.static("static/public"));

app.use(express.json());
app.use(express.urlencoded());
app.use("/", router);

nunjucks.configure("src/views", {
    autoescape: true,
    express: app,
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        throw err;
    });
