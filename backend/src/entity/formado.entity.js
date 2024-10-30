"use strict";
//import nodemon from "nodemon";
import { EntitySchema, Generated, Unique } from "typeorm";

const FormadoSchema = new EntitySchema({
    name: "Formado",
    tableName: "Formado",
    relations: {
        plato: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Plato",
            joinColumn: { name: "PlatoID" } // Clave foránea en la tabla Pedido
        },
        ingrediente:{
            type: "many-to-one",
            target:"Ingrediente",
            joinColumn: {name: "IngredienteID"}
        }
    }
});

export default FormadoSchema;