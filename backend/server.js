/*
 * Crea un servidor Express
 * Escucha al puerto 3001
 *  Tiene una ruta de prueba en `api/health` que responde con un JSON {status:'OK',message:'server is running'}
 */
// 1- importar express,cors  y dotenv
// 2- congigurar dotenv
// 3- Crear una intancia de express
// 4- definir puerto
// 5- Configurar middlewares -1 cors() 2-expres.json()

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();/*Lee el archivo .env del proyecto y carga esas variables en process.env*/

const app = express() // crear una intancia de express
const PORT = process.env.PORT || 3001 // Definimos el puerto de la app

// Middlewares (Funciones que se ejecutan antes que la ruta)
app.use(cors()) // Permite peticiones del Frontend con la API
app.use(express.json()) // Convierte JSON a Objeto JavaScript

// Ruta de prueba
app.get('/api/health',(req,res)=>{
    res.json({status:'OK',message:'server is running'});
})

app.listen(PORT,() =>{
    console.log(` Server is running on http://localhost:${PORT} `);
    
})
