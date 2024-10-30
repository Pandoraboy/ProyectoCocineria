"use strict";
import Contiene from '../entity/contiene.entity.js';
import PedidoID from '../entity/pedido.entity.js';
import PlatoID from '../entity/plato.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createContiene(req, res) {
    try {
        const jcontieneRepository = AppDataSource.getRepository(Contiene);
        const { PedidoID, PlatoID } = req.body;

        if (!PedidoID || !PlatoID) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newContiene = ContieneRepository.create({ PedidoID, PlatoID });
        const contieneSaved = await contieneRepository.save(newContiene);

        res.status(201).json({
            message: "Pedido creado exitosamente",
            data: contieneSaved
        });
    } catch (error) {
        console.error("Error al crear PEdido: ", error);
        return res.status(500).json({
            message: "Error al crear Pedido.",
            error: error.message
        });
    }
}

export async function getContienen(req, res) {
    try {
        const contieneRepository = AppDataSource.getRepository(Contiene);
        const contiene = await contieneRepository.find();
        res.status(200).json({
            message: "Pedidos obtenidos exitosamente",
            data: contiene
        });
    } catch (error) {
        console.error("Error al obtener pedidos: ", error);
        return res.status(500).json({
            message: "Error al obtener pedidos.",
            error: error.message
        });
    }
}

export async function getContiene(req, res) {
    const { id } = req.params;
    try {
        const contieneRepository = AppDataSource.getRepository(Contiene);
        const contiene = await contieneRepository.findOneBy({ id });
        if (!contiene) {
            return res.status(404).json({
                message: "pedido no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "pedido obtenido exitosamente",
            data: contiene
        });
    } catch (error) {
        console.error("Error al obtener pedido: ", error);
        return res.status(500).json({
            message: "Error al obtener pedido.",
            error: error.message
        });
    }
}

export async function deleteContiene(req, res) {
    const { id } = req.params;
    try {
        const contieneRepository = AppDataSource.getRepository(Contiene);
        const contiene = await contieneRepository.findOneBy({ id });
        if (!contiene) {
            return res.status(404).json({
                message: "Pedido no encontrado",
                data: null
            });
        }
        await contieneRepository.delete(contiene);
        res.status(200).json({
            message: "pedido eliminado exitosamente",
            data: contiene
        });
    } catch (error) {
        console.error("Error al eliminar pedido: ", error);
        return res.status(500).json({
            message: "Error al eliminar pedido.",
            error: error.message
        });
    }
}

export async function updateContiene(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const contieneRepository = AppDataSource.getRepository(contiene);
        let contiene = await contieneRepository.findOneBy({ id });
        if (!contiene) {
            return res.status(404).json({
                message: "pedido no encontrado",
                data: null
            });
        }
        contiene = {...contiene, ...updateData};
        const updateContiene = await contieneRepository.save(contiene);
        res.status(200).json({
            message: "Pedido actualizado exitosamente",
            data: updateContiene
        });
    } catch (error) {
        console.error("Error al actualizar administrador: ", error);
        return res.status(500).json({
            message: "Error al actualizar administrador.",
            error: error.message
        });
    }
}
