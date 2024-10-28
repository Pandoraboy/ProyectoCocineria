"user strict";
import { DataSource } from "typeorm";
import {DATABASE, DB_USERNAME, HOST, PASSWORD} from './configEnv.js';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: '${HOST}',
    port: 5432,
    username: '${DB_USERNAME}',
    password: '${PASSWORD}',
    database: '${DATABASE}',
    entities: ["src/entity/**/*.js"],
    synchronize: true,
    logging: false,
});

export async function connectDB(){
    try{
        await AppDataSource.initialize();
        console.log("=> conexion a la basa de datos exitosa!");
    }catch (error){
        console.error("error al conectarse: ", error);
    }
}