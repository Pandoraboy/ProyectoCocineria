"use strict";
import { EntitySchema } from "typeorm";

const ContieneSchema = new EntitySchema({
    name: "Contiene",
    tableName: "Contiene",
    columns: {
        PedidoID: {
            type: "int",
            primary: true,
            nullable: false
        },
        PlatoID: {
            type: "int",
            primary: true,
            nullable: false
        },
        cantidad: {
            type: "int",
            nullable: false 
        }
    },
    relations: {
        pedido: { 
            type: "many-to-one",
            target: "Pedido",
            joinColumn: { name: "pedidoID" } 
        },
        plato: {
            type: "many-to-one",
            target: "Plato",
            joinColumn: { name: "platoID" }
        }
    }
});

export default ContieneSchema;
