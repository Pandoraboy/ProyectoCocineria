"use strict";
//import nodemon from "nodemon";
import { EntitySchema, Generated, Unique } from "typeorm";

const AdministradorSchema = new EntitySchema({
    name: "Administrador",
    tableName: "Administrador",
    columns:{
        AdministradorID:{
            type:"int",
            primary: "true",
        }
    },
    relations: {
        empleado: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Empleado",
            joinColumn: { name: "EmpleadoID" } // Clave foránea en la tabla Pedido
        }
    }
});

export default AdministradorSchema;