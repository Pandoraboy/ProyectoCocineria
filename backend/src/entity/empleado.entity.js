"use strict";
import { EntitySchema } from "typeorm";

const EmpleadoSchema = new EntitySchema({
    name: "Empleado",
    tableName: "Empleado",
    columns:{
        EmpleadoID:{
            type:"int",
            primary: true,
            generated: true
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
        turno: { 
            type: "many-to-one",
            target: "Turno",
            joinColumn: { name: "turnoID" } 
        }
    }
});

export default EmpleadoSchema;