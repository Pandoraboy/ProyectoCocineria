"use strict";
import { EntitySchema } from "typeorm";

const IngredienteSchema = new EntitySchema({
    name: "Ingrediente",
    tableName: "Ingrediente",
    columns: {
        ingredienteID: {
            type: "int",
            primary: true,
            generated: true,
        },
        proveedorID: {
            type: "int",
            nullable: false,
        },
        inventarioID: {
            type: "int",
            nullable: false,
        },
        nombre: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        cantidadInventario: {
            type: "int",
            nullable: false,
        },
        unidadMedida: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
    },
    relations: {
        proveedor: {
            target: "Proveedor",
            type: "many-to-one",
            joinColumn: { name: "proveedorID" },
            onDelete: "CASCADE",
        },
        inventario: {
            target: "Inventario",
            type: "many-to-one",
            joinColumn: { name: "inventarioID" },
            onDelete: "CASCADE",
        },
    },
});

export default IngredienteSchema;
