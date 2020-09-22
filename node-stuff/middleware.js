require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
const Schema = mongoose.Schema;

let testSchema = new Schema({
    name: String
})

let Test = mongoose.model('Test', testSchema);

let createAndSave = function(done) {
    let test1 = new Test({
        name: "testy1"
    });
    test1.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    })
}

let deleteItem = function (done) {
    Test.findOneAndDelete({name: "testy1"}, (err, data) => {
        if (err) return console.error(err);
        done(null, data);
    })
}

let deleteCol = function (done) {
    db.dropCollection("tests", (err, data) => {
        if (err) return console.error(err);
        done(null, data);
    })
}

exports.createAndSave = createAndSave;
exports.deleteItem = deleteItem;
exports.deleteCol = deleteCol;