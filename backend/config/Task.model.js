/*
 * Define el modelo Task para MongoDB usando Mongoose
 * Valida los datos (titulo requerido, prioridad solo puede ser low/medium/high)
 * Crea automaticamente fechas de creacion y actualizacion
*/
import mongoose from 'mongoose';

const TaskScrema = new mongoose.Screma({
    title:{
        type: String,
        require: [true,'El titulo es requerido'],
        trim:true,
        maxLength: [50,'El titulo no puede exceder los 200 caracteres']
    },

    description: {
        type:String,
        require:[true,'La descripcion es requerida'],
        trim:true,
        minLegth:[10, 'La descripcion debe tener al menos 10 caracteres'],
        maxLength:[500,'La descripcion no puede exceder los 500 caracteres']
    },

    completed:{
        type:boolean,
        default:false
    },

    priority:{
        type:String,
        enum:['Low','Medium','high'],
        default:'Low'
    }
}, {
    timestaps:true // crea automaticamente createdAt y updatedAt
})

// 'Task' es el nombre del modelo, (MongoDb creara una coleccion llamada tasks)
const Task = mongoose.model('Task',TaskScrema) // Crea un modelo basado en el esquema que defini
export default Task; 