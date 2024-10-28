import express, { json } from 'express'; 
import indexRoutes from './routes/index.routes.js';
import {PORT, HOST} from './config/configEnv.js';
import { connectDB} from './config/configDb.js';

async function setupServer() {
    try{
        const app = express();

        app.use(json());
        app.use('/api', idexRoutes);
        app.listen(PORT, () =>{
            console.log `servidor corriendo en: http://${HOST}:${PORT}/api`;
        } )
    }catch (error){
        console.error("error eb index.js -> setupServer(), el error es: ", error);
    }
}

async function setupAPI() {
    try{
        await connectDB();
        await setupServer();
    }catch(error){
        console.log("Error en index.js -> setupApi(), el error es: ", error);
    }
}

setupAPI()
    .then(() => console.log("APi iniciada exitosamente"))
    .catch((error) =>{
        console.log("Error en index.js -> setupAPI(), el error es:", error);
    });