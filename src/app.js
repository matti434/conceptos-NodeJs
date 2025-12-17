const {envs} = require("./config/env")

const main = () => {
    console.log("Aqui comenzaremos nuestro servidor");
    console.log(envs);
}

// funcion agnostica autocombocada
// agnostica por que no tiene nombre
// autocombocada por que la autoejecutamos con los parenteci

(async() =>{
    main();
})