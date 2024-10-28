"use stict";
import nodemon from "nodemon";
import { EntitySchema, Generated, Unique } from "typeorm";

const ClienteSchema = new EntitySchema({
    name: "Cliente",
    tableName: "Cliente",
    columns:{
        ClienteID:{
            type:"int",
            primary: "true",
        },
        nombre:{
            type: "varchar",
            length: 100,
            nullable: false,
        },
        contacto:{
            type: "varchar",
            length: 100,
            nullable: false
        }
    }
});

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
const ProveedorSchema = new EntitySchema({
    name: "Proveedor",
    tableName: "Proveedor",
    columns:{
        ProveedorID:{
            type:"int",
            primary: "true",
        },
        nombre:{
            type: "varchar",
            length: 100,
            nullable: false,
        },
        contacto:{
            type: "varchar",
            length: 100,
            nullable: false
        },
        direccion:{
            type:"varchar",
            length:100,
            nullable:false
        }
    },
    relations: {
        administrador: { // Definimos la relación con la entidad Cliente
            type: "one-to-one",
            target: "Administrador",
            joinColumn: { name: "AdministradorID" } // Clave foránea en la tabla Pedido
        }
    }
});

const TurnoSchema = new EntitySchema({
    name: "Turno",
    tableName: "Turno",
    columns:{
        TurnoID:{
            type:"int",
            primary: "true",
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
        administrador: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Administrador",
            joinColumn: { name: "AdministradorID" } // Clave foránea en la tabla Pedido
        }
    }
});

const InventarioSchema = new EntitySchema({
    name: "Inventario",
    tableName: "Inventario",
    columns:{
        InventarioID:{
            type:"int",
            primary: "true",
        },
        fecha:{
            type: "date",
            length: 100,
            nullable: false,
        },
        cantidadTotal:{
            type: "int",
            length: 100,
            nullable: false
        },
        estado:{
            type: "varchar",
            length:100,
            nullable:false
        }
    },
    relations: {
        proveedor: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Proveedor",
            joinColumn: { name: "ProveedorID" } // Clave foránea en la tabla Pedido
        }
    }
});
const EmpleadoSchema = new EntitySchema({
    name: "Empleado",
    tableName: "Empleado",
    columns:{
        EmpleadoID:{
            type:"int",
            primary: "true",
        },
        nombre:{
            type: "varchar",
            length: 100,
            nullable: false,
        },
        contacto:{
            type: "varchar",
            length: 100,
            nullable: false
        }
    },
    relations: {
        turno: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Turno",
            joinColumn: { name: "TurnoID" } // Clave foránea en la tabla Pedido
        }
    }
});
const MeseroSchema = new EntitySchema({
    name: "Mesero",
    tableName: "Mesero",
    columns:{
        MeseroID:{
            type:"int",
            primary: "true",
        }
    },
    relations: {
        empleado: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Empleado",
            joinColumn: { name: "EmpleadoID" } // Clave foránea en la tabla Pedido
        }
    }
});
const ChefSchema = new EntitySchema({
    name: "Chef",
    tableName: "Chef",
    columns:{
        ChefID:{
            type:"int",
            primary: "true",
        },
        especialidad:{
            type:"varchar",
            length:100,
            nullable:false
        }
    },
    relations: {
        empleado: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Empleado",
            joinColumn: { name: "EmpleadoID" } // Clave foránea en la tabla Pedido
        }
    }
});
const AdministradorSchema = new EntitySchema({
    name: "Administrador",
    tableName: "Administrador",
    columns:{
        AdministradorID:{
            type:"int",
            primary: "true",
        }
    },
    relations: {
        empleado: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Empleado",
            joinColumn: { name: "EmpleadoID" } // Clave foránea en la tabla Pedido
        }
    }
});
const PedidoSchema = new EntitySchema({
    name: "Pedido",
    tableName: "Pedido",
    columns:{
        PedidoID:{
            type:"int",
            primary: "true",
            generated: true,
            Unique: true
        },
        fecha:{
            type: "date",
            length: 100,
            nullable: false,
        },
        estado:{
            type:"varchar",
            length:100,
            nullable:false
        },
        total:{
            type:"int",
            length:100,
            nullable:false
        }
    },
    relations: {
        cliente: { // Definimos la relación con la entidad Cliente
            type: "one-to-one",
            target: "Cliente",
            joinColumn: { name: "ClienteID" } // Clave foránea en la tabla Pedido
        },
        mesero:{
            type: "many-to-one",
            target:"Mesero",
            joinColumn: {name: "MeseroID"}
        }
    }
});
const PlatoSchema = new EntitySchema({
    name: "Plato",
    tableName: "Plato",
    columns:{
        PlatoID:{
            type:"int",
            primary: "true",
            Unique: true,
            length: 100
        },
        nombre:{
            type: "varchar",
            length:100,
            nullable:false
        },
        descripcion:{
            type:"text",
            nullable:false
        },
        precio:{
            type:"int",
            length:100,
            nullable:false
        },
        disponibilidad:{
            type:"boolean",
            nullable:false
        }
    },
    relations: {
        inventario: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Inventario",
            joinColumn: { name: "InventarioID" } // Clave foránea en la tabla Pedido
        },
        mesero:{
            type: "many-to-one",
            target:"Menu",
            joinColumn: {name: "MenuID"}
        }
    }
});
const IngredienteSchema = new EntitySchema({
    name: "Ingrediente",
    tableName: "Ingrediente",
    columns:{
        IngredienteID:{
            type:"int",
            primary: "true",
            Unique: true,
            length: 100
        },
        nombre:{
            type: "varchar",
            length:100,
            nullable:false
        },
        cantidadInventario:{
            type:"int",
            nullable:false,
            length:100
        },
        unidadDeMedida:{
            type:"varchar",
            length:100,
            nullable:false
        }
    },
    relations: {
        proveedor: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Proveedor",
            joinColumn: { name: "ProveedorID" } // Clave foránea en la tabla Pedido
        },
        inventario:{
            type: "many-to-one",
            target:"Inventario",
            joinColumn: {name: "InventarioID"}
        }
    }
});
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
const ContieneSchema = new EntitySchema({
    name: "Contiene",
    tableName: "Contiene",
    relations: {
        pedido: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Pedido",
            joinColumn: { name: "PedidoID" } // Clave foránea en la tabla Pedido
        },
        plato:{
            type: "many-to-one",
            target:"Plato",
            joinColumn: {name: "PlatoID"}
        }
    }
});
const FormadoSchema = new EntitySchema({
    name: "Formado",
    tableName: "Formado",
    relations: {
        plato: { // Definimos la relación con la entidad Cliente
            type: "many-to-one",
            target: "Plato",
            joinColumn: { name: "PlatoID" } // Clave foránea en la tabla Pedido
        },
        ingrediente:{
            type: "many-to-one",
            target:"Ingrediente",
            joinColumn: {name: "IngredienteID"}
        }
    }
});
export {
    ClienteSchema,
    MenuSchema,
    ProveedorSchema,
    TurnoSchema,
    InventarioSchema,
    EmpleadoSchema,
    MeseroSchema,
    ChefSchema,
    AdministradorSchema,
    PedidoSchema,
    PlatoSchema,
    IngredienteSchema,
    JefeCocinaSchema,
    ContieneSchema,
    FormadoSchema
};
