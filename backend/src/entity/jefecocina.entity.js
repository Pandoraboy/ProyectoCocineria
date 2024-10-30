"use strict";
import { EntitySchema } from "typeorm";

const JefeCocinaSchema = new EntitySchema({
    name: "JefeCocina",
    tableName: "JefeCocina",
    columns:{
        JefeCocinaID:{
            type:"int",
            primary: true,
            unique: true
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
            nullable:false
        }
    },
    relations: {
        inventario: { 
            type: "many-to-one",
            target: "Inventario",
            joinColumn: { name: "inventarioID" } 
        },
        administrador:{
            type: "many-to-one",
            target:"Administrador",
            joinColumn: { name: "administadorID" }
        },
        chef:{
            type: "one-to-one",
            target:"Chef",
            joinColumn: { name: "chefID" }
        }
    }
});

export default JefeCocinaSchema;