"use strict";
//import nodemon from "nodemon";
import { EntitySchema, Generated, Unique } from "typeorm";

const JefeCocinaSchema = new EntitySchema({
    name: "JefeCocina",
    tableName: "JefeCocina",
    columns:{
        JefeCocinaID:{
            type:"int",
            primary: "true",
            Unique: true,
            length: 100
        },
        permisoInventario:{
            type: "boolean",
            nullable:false
        },
        fechaAsignacionRol:{
            type:"date",
            nullable:false
        },
        estado:{
            type:"int",
            length:100,
            nullable:false
        }
    },
    relations: {
        inventario: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Inventario",
            joinColumn: { name: "InventarioID" } // Clave foránea en la tabla Pedido
        },
        administrador:{
            type: "many-to-one",
            target:"Administrador",
            joinColumn: {name: "AdministadorID"}
        },
        chef:{
            type: "one-to-one",
            target:"Chef",
            joinColumn: {name: "ChefID"}
        }
    }
});

export default JefeCocinaSchema;