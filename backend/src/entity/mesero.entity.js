"use strict";
//import nodemon from "nodemon";
import { EntitySchema, Generated, Unique } from "typeorm";

const MeseroSchema = new EntitySchema({
    name: "Mesero",
    tableName: "Mesero",
    columns:{
        MeseroID:{
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

export default MeseroSchema;
