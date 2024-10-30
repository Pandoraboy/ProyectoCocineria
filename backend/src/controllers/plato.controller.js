"use strict";
import Plato from '../entity/plato.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createPlato(req, res) {
    try {
        const platoRepository = AppDataSource.getRepository(Plato);
        const { InventarioID, MenuID, Nombre, Descripcion, Precio, Disponibilidad } = req.body;

        if (!InventarioID || !MenuID || !Nombre || Precio === undefined || Disponibilidad === undefined) {
            return res.status(400).json({
                message: "Todos los campos obligatorios deben estar completos.",
                data: null
            });
        }

        const newPlato = platoRepository.create({ InventarioID, MenuID, Nombre, Descripcion, Precio, Disponibilidad });
        const platoSaved = await platoRepository.save(newPlato);

        res.status(201).json({
            message: "Plato creado exitosamente",
            data: platoSaved
        });
    } catch (error) {
        console.error("Error al crear plato: ", error);
        return res.status(500).json({
            message: "Error al crear plato.",
            error: error.message
        });
    }
}

export async function getPlatos(req, res) {
    try {
        const platoRepository = AppDataSource.getRepository(Plato);
        const platos = await platoRepository.find();
        res.status(200).json({
            message: "Platos obtenidos exitosamente",
            data: platos
        });
    } catch (error) {
        console.error("Error al obtener platos: ", error);
        return res.status(500).json({
            message: "Error al obtener platos.",
            error: error.message
        });
    }
}

export async function getPlato(req, res) {
    const { id } = req.params;
    try {
        const platoRepository = AppDataSource.getRepository(Plato);
        const plato = await platoRepository.findOneBy({ id });
        if (!plato) {
            return res.status(404).json({
                message: "Plato no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "Plato obtenido exitosamente",
            data: plato
        });
    } catch (error) {
        console.error("Error al obtener plato: ", error);
        return res.status(500).json({
            message: "Error al obtener plato.",
            error: error.message
        });
    }
}

export async function deletePlato(req, res) {
    const { id } = req.params;
    try {
        const platoRepository = AppDataSource.getRepository(Plato);
        const plato = await platoRepository.findOneBy({ id });
        if (!plato) {
            return res.status(404).json({
                message: "Plato no encontrado",
                data: null
            });
        }
        await platoRepository.remove(plato);
        res.status(200).json({
            message: "Plato eliminado exitosamente",
            data: plato
        });
    } catch (error) {
        console.error("Error al eliminar plato: ", error);
        return res.status(500).json({
            message: "Error al eliminar plato.",
            error: error.message
        });
    }
}

export async function updatePlato(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const platoRepository = AppDataSource.getRepository(Plato);
        let plato = await platoRepository.findOneBy({ id });
        if (!plato) {
            return res.status(404).json({
                message: "Plato no encontrado",
                data: null
            });
        }
        plato = { ...plato, ...updateData };
        const updatedPlato = await platoRepository.save(plato);
        res.status(200).json({
            message: "Plato actualizado exitosamente",
            data: updatedPlato
        });
    } catch (error) {
        console.error("Error al actualizar plato: ", error);
        return res.status(500).json({
            message: "Error al actualizar plato.",
            error: error.message
        });
    }
}

