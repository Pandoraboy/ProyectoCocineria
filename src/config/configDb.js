"use strict";
import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD } from './configEnv.js';

export const AppDataSource = new DataSource({
    type: "postgres", // Tipo de base de datos
    host: `${HOST}`, // Dirección que utiliza la base de datos
    port: 3000,
    username: `${DB_USERNAME}`, // Nombre de usuario para autenticar la conexión a la base de datos
    password: `${PASSWORD}`, // Contrasñe del usuario a autenticar
    database: `${DATABASE}`,
    entities: ["src/enity/**/*.js"], // Define la ruta de archivos que contiene a las entidades
    synchronize: true, // Opción para que TypeORM se encargue de gestionar nuestra base de datos
    logging: false, // Muestra las consultas que se realizan por debajo de la aplicación
});

export async function connectDB() {
    try {
        await AppDataSource.initialize();
        console.log("=> Conexión a la base de datos exitosa!");
    } catch (error) {
        console.error("Error al conectase a la base de datos: ", error);
    }
}