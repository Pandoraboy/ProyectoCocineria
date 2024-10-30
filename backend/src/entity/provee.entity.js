"use strict";
import { EntitySchema } from "typeorm";

const ProveeSchema = new EntitySchema({
    name: "Provee", // Define el nombre de la entidad
    tableName: "Provee", // Define el nombre de la tabla si es necesario
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true, // Generación automática de la clave primaria
        }
    },
    relations: {
        ingrediente: {
            target: "Ingrediente",
            type: "many-to-many",
            joinTable: {
                name: "IngredienteID" // Cambié `JoinColumn` por `joinTable` para una relación `many-to-many`
            }
        },
        proveedor: {
            target: "Proveedor",
            type: "many-to-many",
            joinTable: {
                name: "ProveedorID" // Cambié `JoinColumn` por `joinTable` para `many-to-many`
            }
        }
    }
});

export default ProveeSchema;
