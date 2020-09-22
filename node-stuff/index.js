const express = require('express');
const app = express();
const midd = require('./middleware');

app.get("/", (req, res, next) => {
    midd.createAndSave((err, data) => {
        if (err) return next(err);
    })
    next();
},(req, res) => {
    res.send("Uploaded");
})

app.get("/delete", (req, res, next) => {
    midd.deleteItem((err, data) => {
        if (err) return next(err);
    })
    next();
}, (req, res) => {
    res.send("Deleted");
})

app.get("/deleteCol", (req, res, next) => {
    midd.deleteCol((err, data) => {
        if (err) return next(err);
    })
    next();
}, (req, res) => {
    res.send("Deleted collection");
})

app.listen(3000);