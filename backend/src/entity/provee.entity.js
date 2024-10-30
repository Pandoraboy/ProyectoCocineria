"use strict";
import { EntitySchema } from "typeorm";

const ProveeSchema = new EntitySchema({
    name: "Provee", 
    tableName: "Provee", 
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true, 
        }
    },
    relations: {
        ingrediente: {
            target: "Ingrediente",
            type: "many-to-many",
            joinTable: {
                name: "ingredienteID" 
            }
        },
        proveedor: {
            target: "Proveedor",
            type: "many-to-many",
            joinTable: {
                name: "proveedorID" 
            }
        }
    }
});

export default ProveeSchema;
