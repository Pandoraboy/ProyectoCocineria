"use strict";
import { EntitySchema } from "typeorm";

const FormadoSchema = new EntitySchema({
    name: "Formado",
    tableName: "Formado",
    relations: {
        plato: { 
            type: "many-to-one",
            target: "Plato",
            joinColumn: { name: "platoID" } 
        },
        ingrediente:{
            type: "many-to-one",
            target:"Ingrediente",
            joinColumn: { name: "ingredienteID" }
        }
    }
});

export default FormadoSchema;