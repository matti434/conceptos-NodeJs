const mongoose = require("mongoose");

const bookScrema = new mongoose.Schema({
        
    title: String,
    author: String,
    genre: String,
    publication_Date: String
})

module.exports = mongoose.model("Book",bookScrema);