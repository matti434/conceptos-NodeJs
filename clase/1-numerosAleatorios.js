
const argumentos= process.argv;
const args= argumentos.slice(2);

console.log(args);

let min = 1;
let max= 100;

if(args.length === 2){
    const minParse = parseInt(args[0]);
    const maxParse = parseInt(args[1]);

    if(!isNaN(minParse) && !isNaN(maxParse) && minParse<maxParse){
        min= minParse;
        max= maxParse;
    }else{
        console.log("Rango invisible");
    }
}
    
const aleatorio= Math.floor(Math.random() * (max-min*1)) + min;
console.log(`El numero aleatorio entre ${min} y ${max} es ${aleatorio}`);
