"use strict";
import Pedido from '../entity/pedido.entity.js';
import ClienteID from '../entity/cliente.entity.js';
import MeseroID from '../entity/mesero.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createPedido(req, res) {
    try {
        const pedidoRepository = AppDataSource.getRepository(Pedido);
        const { PedidoID, ClienteID, MeseroID, Fecha, Estado, Total } = req.body;

        if (!PedidoID || !ClienteID || !MeseroID || !Fecha || !Estado || !Total) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newPedido = pedidoRepository.create({ PedidoID, ClienteID, MeseroID, Fecha, Estado, Total});
        const pedidoSaved = await pedidoRepository.save(newPedido);

        res.status(201).json({
            message: "Pedido creado exitosamente",
            data: pedidoSaved
        });
    } catch (error) {
        console.error("Error al crear PEdido: ", error);
        return res.status(500).json({
            message: "Error al crear Pedido.",
            error: error.message
        });
    }
}

export async function getPedidos(req, res) {
    try {
        const pedidoRepository = AppDataSource.getRepository(Pedido);
        const pedidos = await pedidoRepository.find();
        res.status(200).json({
            message: "Pedidos obtenidos exitosamente",
            data: pedidos
        });
    } catch (error) {
        console.error("Error al obtener pedidos: ", error);
        return res.status(500).json({
            message: "Error al obtener pedidos.",
            error: error.message
        });
    }
}

export async function getPedido(req, res) {
    const { id } = req.params;
    try {
        const pedidoRepository = AppDataSource.getRepository(Pedido);
        const pedido = await pedidoRepository.findOneBy({ id });
        if (!pedido) {
            return res.status(404).json({
                message: "pedido no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "pedido obtenido exitosamente",
            data: pedido
        });
    } catch (error) {
        console.error("Error al obtener pedido: ", error);
        return res.status(500).json({
            message: "Error al obtener pedido.",
            error: error.message
        });
    }
}

export async function deletePedido(req, res) {
    const { id } = req.params;
    try {
        const pedidoRepository = AppDataSource.getRepository(Pedido);
        const pedido = await pedidoRepository.findOneBy({ id });
        if (!pedido) {
            return res.status(404).json({
                message: "Pedido no encontrado",
                data: null
            });
        }
        await pedidoRepository.delete(pedido);
        res.status(200).json({
            message: "pedido eliminado exitosamente",
            data: pedido
        });
    } catch (error) {
        console.error("Error al eliminar pedido: ", error);
        return res.status(500).json({
            message: "Error al eliminar pedido.",
            error: error.message
        });
    }
}

export async function updatePedido(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const pedidoRepository = AppDataSource.getRepository(pedido);
        let pedido = await pedidorRepository.findOneBy({ id });
        if (!pedido) {
            return res.status(404).json({
                message: "pedido no encontrado",
                data: null
            });
        }
        pedido = {...pedido, ...updateData};
        const updatePedido = await pedidoRepository.save(pedido);
        res.status(200).json({
            message: "Pedido actualizado exitosamente",
            data: updatePedido
        });
    } catch (error) {
        console.error("Error al actualizar administrador: ", error);
        return res.status(500).json({
            message: "Error al actualizar administrador.",
            error: error.message
        });
    }
}
