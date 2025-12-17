/*arranque de la aplicacion*/
const {envs} = require("./config/env") // lee el archivo .env y lo trasforma en JS - Node lee -env y devuelve un objeto JS usable
const {startServer} = require("./server/server")

const main = () => {
    console.log("Aqui comenzaremos nuestro servidor");
    console.log(envs);
    console.log("aqui llamo a startServer");

    /*
    App.js arranca
    importa env y startServer
    Node.js lee los archivos y los trasforma en objeto js
    ejecuta la main()
    main() llama ahora abajo a startServer
    startServer recibe puerto y path.
     */
    startServer({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH
    })
}


// funcion agnostica autocombocada
// agnostica por que no tiene nombre
// autocombocada por que la autoejecutamos con los parenteci

(async() =>{
    main();
})();
