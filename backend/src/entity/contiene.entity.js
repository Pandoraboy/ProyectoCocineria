"use strict";
//import nodemon from "nodemon";
import { EntitySchema, Generated, Unique } from "typeorm";

const ContieneSchema = new EntitySchema({
    name: "Contiene",
    tableName: "Contiene",
    relations: {
        pedido: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Pedido",
            joinColumn: { name: "PedidoID" } // Clave foránea en la tabla Pedido
        },
        plato:{
            type: "many-to-one",
            target:"Plato",
            joinColumn: {name: "PlatoID"}
        }
    }
});

export default ContieneSchema;