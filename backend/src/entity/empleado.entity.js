"use strict";
//import nodemon from "nodemon";
import { EntitySchema, Generated, Unique } from "typeorm";

const EmpleadoSchema = new EntitySchema({
    name: "Empleado",
    tableName: "Empleado",
    columns:{
        EmpleadoID:{
            type:"int",
            primary: "true",
            generated: "true"
        },
        nombre:{
            type: "varchar",
            length: 100,
            nullable: false,
        },
        contacto:{
            type: "varchar",
            length: 100,
            nullable: false
        }
    },
    relations: {
        turno: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Turno",
            joinColumn: { name: "TurnoID" } // Clave foránea en la tabla Pedido
        }
    }
});

export default EmpleadoSchema;