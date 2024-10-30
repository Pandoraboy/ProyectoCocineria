"use strict";
import { EntitySchema } from "typeorm";

const TurnoSchema = new EntitySchema({
    name: "Turno",
    tableName: "Turno",
    columns:{
        TurnoID:{
            type:"int",
            primary: true,
        },
        fecha:{
            type: "date",
            length: 100,
            nullable: false,
        },
        horaInicio:{
            type: "timestamp wit time zone",
            default: ()=> "CURRENT_TIMESTAMP",
            nullable: false
        },
        horaFin:{
            type: "timestamp wit time zone",
            default: ()=> "CURRENT_TIMESTAMP",
            nullable: false
        }
    },
    relations: {
        administrador: { 
            type: "many-to-one",
            target: "Administrador",
            joinColumn: { name: "AdministradorID" } 
        }
    }
});

export default TurnoSchema;