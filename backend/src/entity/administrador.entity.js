"use strict";
import { EntitySchema } from "typeorm";

const AdministradorSchema = new EntitySchema({
    name: "Administrador",
    tableName: "Administrador",
    columns:{
        AdministradorID:{
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

export default AdministradorSchema;