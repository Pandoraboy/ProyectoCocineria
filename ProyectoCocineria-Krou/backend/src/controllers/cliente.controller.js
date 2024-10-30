"use strict";
import Cliente from '../entity/cliente.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createCliente(req, res) {
    try {
        const clienteRepository = AppDataSource.getRepository(Cliente);
        const { ClienteID, Nombre, Contacto } = req.body;

        if (!ClienteID || !Nombre || !Contacto) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newCliente = clienteRepository.create({ ClienteID, Nombre, Contacto });
        const clienteSaved = await clienteRepository.save(newCliente);

        res.status(201).json({
            message: "Cliente creado exitosamente",
            data: clienteSaved
        });
    } catch (error) {
        console.error("Error al crear cleinte: ", error);
        return res.status(500).json({
            message: "Error al crear cliente.",
            error: error.message
        });
    }
}
export async function getCliente(req, res) {
    try {
        const clienteRepository = AppDataSource.getRepository(Cliente);
        const cliente = await clienteRepository.find();
        res.status(200).json({
            message: "Cliente obtenidos exitosamente",
            data: cliente
        });
    } catch (error) {
        console.error("Error al obtener cliente: ", error);
        return res.status(500).json({
            message: "Error al obtener cliente.",
            error: error.message
        });
    }
}
export async function getCliente(req, res) {
    const { id } = req.params;
    try {
        const clienteRepository = AppDataSource.getRepository(Cliente);
        const cliente = await clienteRepository.findOneBy({ id });
        if (!cliente) {
            return res.status(404).json({
                message: "cliente no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "cliente obtenido exitosamente",
            data: cliente
        });
    } catch (error) {
        console.error("Error al obtener cliente: ", error);
        return res.status(500).json({
            message: "Error al obtener cliente.",
            error: error.message
        });
    }
}
export async function deleteCliente(req, res) {
    const { id } = req.params;
    try {
        const clienteRepository = AppDataSource.getRepository(Cliente);
        const cliente = await clienteRepository.findOneBy({ id });
        if (!cliente) {
            return res.status(404).json({
                message: "Cliente no encontrado",
                data: null
            });
        }
        await clienteRepository.delete(cliente);
        res.status(200).json({
            message: "cliente eliminado exitosamente",
            data: cliente
        });
    } catch (error) {
        console.error("Error al eliminar cliente: ", error);
        return res.status(500).json({
            message: "Error al eliminar cliente.",
            error: error.message
        });
    }
}
export async function updateCliente(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const clienteRepository = AppDataSource.getRepository(Cliente);
        let cliente = await clienteRepository.findOneBy({ id });
        if (!cliente) {
            return res.status(404).json({
                message: "Cliente no encontrado",
                data: null
            });
        }
        cliente = {...cliente, ...updateData};
        const updateCliente = await clienteRepository.save(cliente);
        res.status(200).json({
            message: "Cliente actualizado exitosamente",
            data: updateCliente
        });
    } catch (error) {
        console.error("Error al actualizar Cliente: ", error);
        return res.status(500).json({
            message: "Error al actualizar Cleinte.",
            error: error.message
        });
    }
}