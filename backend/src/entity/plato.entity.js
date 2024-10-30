"use strict";
import { EntitySchema } from "typeorm";

const PlatoSchema = new EntitySchema({
    name: "Plato",
    tableName: "plato",
    columns: {
        platoID: {
            type: "int",
            primary: true,
            generated: true,
        },
        inventarioID: {
            type: "int",
            nullable: false,
        },
        menuID: {
            type: "int",
            nullable: false,
        },
        nombre: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        descripcion: {
            type: "text",
            nullable: true,
        },
        precio: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false,
        },
        disponibilidad: {
            type: "boolean",
            nullable: false,
        },
    },
    relations: {
        inventario: {
            target: "Inventario",
            type: "many-to-one",
            joinColumn: { name: "inventarioID" },
            onDelete: "CASCADE",
        },
        menu: {
            target: "Menu",
            type: "many-to-one",
            joinColumn: { name: "menuID" },
            onDelete: "CASCADE",
        },
    },
});

export default PlatoSchema;
