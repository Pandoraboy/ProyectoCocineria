"use strict";
//import nodemon from "nodemon";
import { EntitySchema, Generated, Unique } from "typeorm";

const ChefSchema = new EntitySchema({
    name: "Chef",
    tableName: "Chef",
    columns:{
        ChefID:{
            type:"int",
            primary: "true",
        },
        especialidad:{
            type:"varchar",
            length:100,
            nullable:false
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

export default ChefSchema;