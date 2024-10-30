import { EntitySchema } from "typeorm";

const ClienteSchema = new EntitySchema({
    name: "Cliente",
    tableName: "Cliente",
    columns: {
        ClienteID: {
            type: "int",
            primary: true,
            generated: true
        },
        nombre: {
            type: "varchar",
            length: 100,
            nullable: false
        },
        contacto: {
            type: "varchar",
            length: 100,
            nullable: false
        }
    }
});

export default ClienteSchema;
