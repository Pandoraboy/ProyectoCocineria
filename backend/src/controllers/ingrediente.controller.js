"use strict";
import Ingrediente from '../entity/ingrediente.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createIngrediente(req, res) {
    try {
        const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
        const { ProveedorID, InventarioID, Nombre, CantidadInventario, UnidadMedida } = req.body;

        if (!ProveedorID || !InventarioID || !Nombre || !CantidadInventario || !UnidadMedida) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newIngrediente = ingredienteRepository.create({ ProveedorID, InventarioID, Nombre, CantidadInventario, UnidadMedida });
        const ingredienteSaved = await ingredienteRepository.save(newIngrediente);

        res.status(201).json({
            message: "Ingrediente creado exitosamente",
            data: ingredienteSaved
        });
    } catch (error) {
        console.error("Error al crear ingrediente: ", error);
        return res.status(500).json({
            message: "Error al crear ingrediente.",
            error: error.message
        });
    }
}

export async function getIngredientes(req, res) {
    try {
        const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
        const ingredientes = await ingredienteRepository.find();
        res.status(200).json({
            message: "Ingredientes obtenidos exitosamente",
            data: ingredientes
        });
    } catch (error) {
        console.error("Error al obtener ingredientes: ", error);
        return res.status(500).json({
            message: "Error al obtener ingredientes.",
            error: error.message
        });
    }
}

export async function getIngrediente(req, res) {
    const { id } = req.params;
    try {
        const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
        const ingrediente = await ingredienteRepository.findOneBy({ id });
        if (!ingrediente) {
            return res.status(404).json({
                message: "Ingrediente no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "Ingrediente obtenido exitosamente",
            data: ingrediente
        });
    } catch (error) {
        console.error("Error al obtener ingrediente: ", error);
        return res.status(500).json({
            message: "Error al obtener ingrediente.",
            error: error.message
        });
    }
}

export async function deleteIngrediente(req, res) {
    const { id } = req.params;
    try {
        const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
        const ingrediente = await ingredienteRepository.findOneBy({ id });
        if (!ingrediente) {
            return res.status(404).json({
                message: "Ingrediente no encontrado",
                data: null
            });
        }
        await ingredienteRepository.remove(ingrediente);
        res.status(200).json({
            message: "Ingrediente eliminado exitosamente",
            data: ingrediente
        });
    } catch (error) {
        console.error("Error al eliminar ingrediente: ", error);
        return res.status(500).json({
            message: "Error al eliminar ingrediente.",
            error: error.message
        });
    }
}

export async function updateIngrediente(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
        let ingrediente = await ingredienteRepository.findOneBy({ id });
        if (!ingrediente) {
            return res.status(404).json({
                message: "Ingrediente no encontrado",
                data: null
            });
        }
        ingrediente = { ...ingrediente, ...updateData };
        const updatedIngrediente = await ingredienteRepository.save(ingrediente);
        res.status(200).json({
            message: "Ingrediente actualizado exitosamente",
            data: updatedIngrediente
        });
    } catch (error) {
        console.error("Error al actualizar ingrediente: ", error);
        return res.status(500).json({
            message: "Error al actualizar ingrediente.",
            error: error.message
        });
    }
}

