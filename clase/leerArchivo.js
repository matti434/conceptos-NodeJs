/*
 Modulos nativos:
 fs,http,path,os
 */
const colors = require("colors");
const fs = require('fs');

try{
    const data= fs.readFileSync("./personajes.txt","utf-8")
    console.log(data);
    console.log("Hola amarillo".yellow);
    
}catch(error){
  console.error(`Ocurrio un error al leer el archivo de forma asincrona\n ${error}`);
}