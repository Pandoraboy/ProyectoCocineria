"use strict";
//import nodemon from "nodemon";
import { EntitySchema, Generated, Unique } from "typeorm";

const PedidoSchema = new EntitySchema({
    name: "Pedido",
    tableName: "Pedido",
    columns:{
        PedidoID:{
            type:"int",
            primary: "true",
            generated: true,
            Unique: true
        },
        fecha:{
            type: "date",
            length: 100,
            nullable: false,
        },
        estado:{
            type:"varchar",
            length:100,
            nullable:false
        },
        total:{
            type:"int",
            length:100,
            nullable:false
        }
    },
    relations: {
        cliente: { // Definimos la relación con la entidad Cliente
            type: "one-to-one",
            target: "Cliente",
            joinColumn: { name: "ClienteID" } // Clave foránea en la tabla Pedido
        },
        mesero:{
            type: "many-to-one",
            target:"Mesero",
            joinColumn: {name: "MeseroID"}
        }
    }
});

export default PedidoSchema;