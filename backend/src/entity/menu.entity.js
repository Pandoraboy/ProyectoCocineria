"use strict";
import { EntitySchema } from "typeorm";

const MenuSchema = new EntitySchema({
    name: "Menu",
    tableName: "Menu",
    columns:{
        MenuID:{
            type:"int",
            primary: true,
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
        Cliente: { 
            type: "one-to-one",
            target: "Cliente",
            joinColumn: { name: "ClienteID" } 
        }
    }
});

export default MenuSchema;