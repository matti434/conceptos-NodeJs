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
  const app= express();
  //Para poder usar middlewares se usa la palabra use(express)
  app.use(express.static(public_path)) // contenido estatico que ponemos disponible

  //req= peticion res=respuesta
  app.get('*',(req, res)=>{ 
    const indexPath = path.join(__dirname + `../../../${public_path}/index.html`)
    res.sendFile(indexPath);
  })
  /*
  app.get("*", ...)
  '*' es un comodin que captura todas las rutas
  Captura cualquier peticion GET que no haya sido capturada por rutas anteriores
  Ejemplo /,/about,/productos/123,/cualquier/cosa
  
  __ dirname = '/ruta/del/proyecto/src/server' // carpeta actual del archivo
  public_path= 'public' //Carpeta public

  path.join crea una ruta de forma segura
  const indexPath=path.join(
  __dirname 1- Desde la carpeta actual
  public_path, 2-  Entrar a 'public'
  index.html 3- Archivo index
  )

  res.sendFile(indexPath)
  Envia un archivo index.html como respuesta
  Express detecta el tipo de contenido (HTML)
  El navegador recibe y renderiza la pagina 
   */
  app.listen(port, () =>{
    console.log(`Escuchando el puerto: ${port}`);    
  })
};

module.exports = {
  startServer,
};
