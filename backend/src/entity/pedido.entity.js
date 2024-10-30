"use strict";
import { EntitySchema } from "typeorm";

const PedidoSchema = new EntitySchema({
    name: "Pedido",
    tableName: "Pedido",
    columns:{
        PedidoID:{
            type:"int",
            primary: true,
            generated: true
        },
        fecha:{
            type: "date",
            nullable: false
        },
        estado:{
            type:"varchar",
            nullable:false
        },
        total:{
            type:"int",
            nullable:false
        }
    },
    relations: {
        cliente: { 
            type: "one-to-one",
            target: "Cliente",
            joinColumn: { name: "ClienteID" } 
        },
        mesero:{
            type: "many-to-one",
            target:"Mesero",
            joinColumn: { name: "meseroID" }
        }
    }
});

export default PedidoSchema;