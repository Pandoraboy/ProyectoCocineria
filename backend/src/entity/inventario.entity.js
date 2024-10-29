"use strict";
import { EntitySchema } from "typeorm";

const InventarioSchema = new EntitySchema({
    name: "Inventario",
    tableName: "inventario",
    columns: {
        inventarioID: {
            type: "int",
            primary: true,
            generated: true,
            unique: true,
        },
        proveedorID: {
            type: "int",
            nullable: false,
        },
        fecha: {
            type: "date",
            nullable: false,
        },
        cantidadTotal: {
            type: "int",
            nullable: false,
        },
        estado: {
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
    },
});

export default InventarioSchema;
