"use strict";
import Inventario from '../entity/inventario.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createInventario(req, res) {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);
        const { ProveedorID, Fecha, CantidadTotal, Estado } = req.body;

        if (!ProveedorID || !Fecha || !CantidadTotal || !Estado) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newInventario = inventarioRepository.create({ ProveedorID, Fecha, CantidadTotal, Estado });
        const inventarioSaved = await inventarioRepository.save(newInventario);

        res.status(201).json({
            message: "Inventario creado exitosamente",
            data: inventarioSaved
        });
    } catch (error) {
        console.error("Error al crear inventario: ", error);
        return res.status(500).json({
            message: "Error al crear inventario.",
            error: error.message
        });
    }
}

export async function getInventarios(req, res) {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);
        const inventarios = await inventarioRepository.find();
        res.status(200).json({
            message: "Inventarios obtenidos exitosamente",
            data: inventarios
        });
    } catch (error) {
        console.error("Error al obtener inventarios: ", error);
        return res.status(500).json({
            message: "Error al obtener inventarios.",
            error: error.message
        });
    }
}

export async function getInventario(req, res) {
    const { id } = req.params;
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);
        const inventario = await inventarioRepository.findOneBy({ id });
        if (!inventario) {
            return res.status(404).json({
                message: "Inventario no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "Inventario obtenido exitosamente",
            data: inventario
        });
    } catch (error) {
        console.error("Error al obtener inventario: ", error);
        return res.status(500).json({
            message: "Error al obtener inventario.",
            error: error.message
        });
    }
}

export async function deleteInventario(req, res) {
    const { id } = req.params;
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);
        const inventario = await inventarioRepository.findOneBy({ id });
        if (!inventario) {
            return res.status(404).json({
                message: "Inventario no encontrado",
                data: null
            });
        }
        await inventarioRepository.remove(inventario);
        res.status(200).json({
            message: "Inventario eliminado exitosamente",
            data: inventario
        });
    } catch (error) {
        console.error("Error al eliminar inventario: ", error);
        return res.status(500).json({
            message: "Error al eliminar inventario.",
            error: error.message
        });
    }
}

export async function updateInventario(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);
        let inventario = await inventarioRepository.findOneBy({ id });
        if (!inventario) {
            return res.status(404).json({
                message: "Inventario no encontrado",
                data: null
            });
        }
        inventario = { ...inventario, ...updateData };
        const updatedInventario = await inventarioRepository.save(inventario);
        res.status(200).json({
            message: "Inventario actualizado exitosamente",
            data: updatedInventario
        });
    } catch (error) {
        console.error("Error al actualizar inventario: ", error);
        return res.status(500).json({
            message: "Error al actualizar inventario.",
            error: error.message
        });
    }
}
