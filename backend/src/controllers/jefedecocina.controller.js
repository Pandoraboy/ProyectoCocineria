"use strict";
import JefeDeCocina from '../entity/jefedecocina.entity.js';
import InventarioID from '../entity/inventario.entity.js';
import AdministradorID from '../entity/administrador.entity.js';
import ChefID from '../entity/chef.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createJefedecocina(req, res) {
    try {
        const jefedecocinaRepository = AppDataSource.getRepository(Jefedecocina);
        const { JefeCocinaID, ChefID, InventarioID, AdministradorID, PermisoInventario, FechaAsigancionRol, Estado  } = req.body;

        if (!JefeCocinaID || !ChefID || !InventarioID || !AdministradorID || !PermisoInventario || !FechaAsigancionRol || !Estado ) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newJefedecocina = JefedecocinaRepository.create({ JefeCocinaID, ChefID, InventarioID, AdministradorID, PermisoInventario, FechaAsigancionRol, Estado });
        const jefedecocinaSaved = await jefedecocinaRepository.save(newJefedecocina);

        res.status(201).json({
            message: "Pedido creado exitosamente",
            data: jefedecocinaSaved
        });
    } catch (error) {
        console.error("Error al crear PEdido: ", error);
        return res.status(500).json({
            message: "Error al crear Pedido.",
            error: error.message
        });
    }
}

export async function getPedido(req, res) {
    try {
        const jefedecocinaRepository = AppDataSource.getRepository(Jefedecocina);
        const jefedecocina = await jefedecocinaRepository.find();
        res.status(200).json({
            message: "Pedidos obtenidos exitosamente",
            data: jefedecocina
        });
    } catch (error) {
        console.error("Error al obtener pedidos: ", error);
        return res.status(500).json({
            message: "Error al obtener pedidos.",
            error: error.message
        });
    }
}

export async function getJefedecocina(req, res) {
    const { id } = req.params;
    try {
        const jefedecocinaRepository = AppDataSource.getRepository(Jefedecocina);
        const jefedecocina = await jefedecocinaRepository.findOneBy({ id });
        if (!jefedecocina) {
            return res.status(404).json({
                message: "pedido no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "pedido obtenido exitosamente",
            data: jefedecocina
        });
    } catch (error) {
        console.error("Error al obtener pedido: ", error);
        return res.status(500).json({
            message: "Error al obtener pedido.",
            error: error.message
        });
    }
}

export async function deleteJefedecocina(req, res) {
    const { id } = req.params;
    try {
        const jefedecocinaRepository = AppDataSource.getRepository(Jefedecocina);
        const jefedecocina = await jefedecocinaRepository.findOneBy({ id });
        if (!jefedecocina) {
            return res.status(404).json({
                message: "Pedido no encontrado",
                data: null
            });
        }
        await jefedecocinaRepository.delete(jefedecocina);
        res.status(200).json({
            message: "pedido eliminado exitosamente",
            data: jefedecocina
        });
    } catch (error) {
        console.error("Error al eliminar pedido: ", error);
        return res.status(500).json({
            message: "Error al eliminar pedido.",
            error: error.message
        });
    }
}

export async function updateJefedecocina(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const jefedecocinaRepository = AppDataSource.getRepository(jefedecocina);
        let jefedecocina = await jefedecocinaRepository.findOneBy({ id });
        if (!jefedecocina) {
            return res.status(404).json({
                message: "pedido no encontrado",
                data: null
            });
        }
        jefedecocina = {...jefedecocina, ...updateData};
        const updateJefedecocina = await jefedecocinaRepository.save(jefedecocina);
        res.status(200).json({
            message: "Pedido actualizado exitosamente",
            data: updateJefedecocina
        });
    } catch (error) {
        console.error("Error al actualizar administrador: ", error);
        return res.status(500).json({
            message: "Error al actualizar administrador.",
            error: error.message
        });
    }
}
