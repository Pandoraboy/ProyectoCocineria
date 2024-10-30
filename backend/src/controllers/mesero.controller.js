"use strict";
import Mesero from '../entity/mesero.entity.js';
import EmpleadoID from '../entity/empleado.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createMesero(req, res) {
    try {
        const meseroRepository = AppDataSource.getRepository(Mesero);
        const { MeseroID, EmpleadoID } = req.body;

        if (!MeseroID || !EmpleadoID ) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newMesero = meseroRepository.create({ MeseroID, EmpleadoID  });
        const meseroSaved = await meseroRepository.save(newMesero);

        res.status(201).json({
            message: "Mesero creado exitosamente",
            data: meseroSaved
        });
    } catch (error) {
        console.error("Error al crear Mesero: ", error);
        return res.status(500).json({
            message: "Error al crear Mesero.",
            error: error.message
        });
    }
}
export async function getMesero(req, res) {
    try {
        const meseroRepository = AppDataSource.getRepository(Mesero);
        const mesero = await meseroRepository.find();
        res.status(200).json({
            message: "Mesero obtenido exitosamente",
            data: mesero
        });
    } catch (error) {
        console.error("Error al obtener mesero: ", error);
        return res.status(500).json({
            message: "Error al obtener mesero.",
            error: error.message
        });
    }
}
export async function getMesero(req, res) {
    const { id } = req.params;
    try {
        const meseroRepository = AppDataSource.getRepository(Mesero);
        const mesero = await meseroRepository.findOneBy({ id });
        if (!mesero) {
            return res.status(404).json({
                message: "mesero no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "mesero obtenido exitosamente",
            data: mesero
        });
    } catch (error) {
        console.error("Error al obtener mesero: ", error);
        return res.status(500).json({
            message: "Error al obtener mesero.",
            error: error.message
        });
    }
}
export async function deleteMesero(req, res) {
    const { id } = req.params;
    try {
        const meseroRepository = AppDataSource.getRepository(Mesero);
        const mesero = await meseroRepository.findOneBy({ id });
        if (!mesero) {
            return res.status(404).json({
                message: "mesero no encontrado",
                data: null
            });
        }
        await mesero.delete(mesero);
        res.status(200).json({
            message: "mesero eliminado exitosamente",
            data: turno
        });
    } catch (error) {
        console.error("Error al eliminar mesero: ", error);
        return res.status(500).json({
            message: "Error al eliminar mesero.",
            error: error.message
        });
    }
}
export async function updateMesero(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const meseroRepository = AppDataSource.getRepository(Mesero);
        let mesero = await meseroRepository.findOneBy({ id });
        if (!mesero) {
            return res.status(404).json({
                message: "Mesero no encontrado",
                data: null
            });
        }
        mesero = {...mesero, ...updateData};
        const updateMesero = await meseroRepository.save(mesero);
        res.status(200).json({
            message: "Mesero actualizado exitosamente",
            data: updateMesero
        });
    } catch (error) {
        console.error("Error al actualizar Mesero: ", error);
        return res.status(500).json({
            message: "Error al actualizar Mesero.",
            error: error.message
        });
    }
}