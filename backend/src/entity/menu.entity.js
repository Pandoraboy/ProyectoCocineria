"use strict";
//import nodemon from "nodemon";
import { EntitySchema, Generated, Unique } from "typeorm";

const MenuSchema = new EntitySchema({
    name: "Menu",
    tableName: "Menu",
    columns:{
        MenuID:{
            type:"int",
            primary: "true",
        },
        nombrePlato:{
            type: "varchar",
            length: 100,
            nullable: false,
        },
        ingredientes:{
            type: "varchar",
            length: 100,
            nullable: false
        },
        valores:{
            type:"varchar",
            length:100,
            nullable:false
        }
    },
    relations: {
        Cliente: { // Definimos la relación con la entidad Cliente
            type: "one-to-one",
            target: "Cliente",
            joinColumn: { name: "ClienteID" } // Clave foránea en la tabla Pedido
        }
    }
});

export default MenuSchema;