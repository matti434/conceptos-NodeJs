const fs = require("fs")

const textoNuevo = "\n 'Nuevo personaje' \n 4-Thor \n 5-Loki \n 6-Spiderman \n 7-Venom"
fs.appendFile("./personaje.txt, textoNuevo,'utf-8' ",(error) =>{
    if(error){
        return console.error("Ocurrio un error al escribir en el archivo"+error)
    }
    console.log("Archivo actualizado");
})