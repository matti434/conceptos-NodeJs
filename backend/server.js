import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); /*Lee el archivo .env del proyecto y carga esas variables en process.env*/

const app = express(); /*Crea una instancia de express*/
const PORT = process.env.PORT || 3001;

// Middlewares (Funciones que se ejecutan antes que la ruta)
app.use(cors()) // Permite peticiones del Frontend con la API
app.use(express.json()) // Convierte JSON a Objeto JavaScript

// Ruta de prueba
app.get('/')
