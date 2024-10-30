"use strict";
import { EntitySchema } from "typeorm";

const MeseroSchema = new EntitySchema({
    name: "Mesero",
    tableName: "Mesero",
    columns:{
        MeseroID:{
            type:"int",
            primary: true,
        }
    },
    relations: {
        empleado: { 
            type: "many-to-one",
            target: "Empleado",
            joinColumn: { name: "EmpleadoID" } 
        }
    }
});

export default MeseroSchema;
