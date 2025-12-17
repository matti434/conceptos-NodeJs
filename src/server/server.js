/*Creacion del servidor web*/
const express = require("express");
const path = require("path");

const startServer = (opcions) => {
  const { port, public_path = "public" } = opcions;
  /* equivale a:
  const port = options.port;
  const public_path = options.public_path || 'public';
 */
  console.log(port);
  console.log(public_path);

  //Para poder usar middlewares se usa la palabra use(express)
  app.use(express.static(public_path)) // contenido estatico que ponemos disponible

  //req= peticion res=respuesta
  app.get('*'),(req, res)=>{ 
    const indexPath = path.join(__dirname + `../../../${public_path}/index.html`)
    res.sendFile(indexPath);
  } 
};

module.exports = {
  startServer,
};
