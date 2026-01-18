const express = require("express");
const {config} = require("dotenv");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
config();

const bookRoutes = requiered("./routes/book.routes");

//Usamos express para los middlewares
const app = express();
app.use(bodyParser.json()); //Parseador de Bodies

//Aca conectamos la base de datos:
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME })

const db= mongoose.connection;

app.use("/books", bookRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
