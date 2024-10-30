"use strict";
import { EntitySchema } from "typeorm";

const ChefSchema = new EntitySchema({
    name: "Chef",
    tableName: "Chef",
    columns:{
        ChefID:{
            type:"int",
            primary: true,
        },
        especialidad:{
            type:"varchar",
            length:100,
            nullable:false
        }
    },
    relations: {
        empleado: { 
            type: "many-to-one",
            target: "Empleado",
            joinColumn: { name: "empleadoID" } 
        }
    }
});

export default ChefSchema;