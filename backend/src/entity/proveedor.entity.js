"use strict";
import { EntitySchema } from "typeorm";

const ProveedorSchema = new EntitySchema({
    name: "Proveedor",
    tableName: "proveedor",
    columns: {
        proveedorID: {
            type: "int",
            primary: true,
            generated: true,
        },
        administradorID: {
            type: "int",
            nullable: false,
        },
        nombre: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        contacto: {
            type: "varchar",
            nullable: false
        },
        direccion: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
    },
    relations: {
        administrador: {
            target: "Administrador",
            type: "many-to-one",
            joinColumn: { name: "administradorID" },
            onDelete: "CASCADE",
        },
    },
});

export default ProveedorSchema;
