/*
 * Se conecta a MongoDB
 * Usa la URL de `.env` o una por defecto
 * Si hay error, muestra el error y cierra el
*/
import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect(
            process.env.MONGODB_URI || 'mongodb://localhost:27017/task-db'
        )
        console.log(`MongoDb connected: ${mongoose.connection.host}`);
    }
    catch(error){
       console.error(`Error connecting to MongoDB: ${error.message}`);
       process.exit(1); // Detiene la aplicacion si hay un error en la conexion
    }
}
