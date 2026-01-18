const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");

//MIDDLEWARE
const getBook = async (req,res,next) =>{
    let book;
    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            message: "El ID del libro no es valido"
        })

    }

    try {
        book = await Book.findById(id);
        if(!book){
            return res.status(404).json(
                {
                    message: "Libro no encontrado"
                }
            )
        }
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        )
        
    }

    res.book = book;
    next();
}

// obtener todos los libros [GET ALL]
router.get("/", async (req,res) => {
    try {
        const books = await Book.find();
        res(books);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Crear un nuevo libre [POST]
router.post("/", async (req,res) => {
    
    const {
        title,
        author,
        genre,
        publication_Date
    } = req?.body;

    if(!title || !author || !genre || !publication_Date){
        return res.status(400).json({message: "Todos los campos son obligatorios"})
    }
    
    const book = new Book({
        title,
        author,
        genre,
        publication_Date
    })

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})