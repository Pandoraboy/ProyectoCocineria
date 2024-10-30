"use strict";
import Chef from '../entity/chef.entity.js';
import EmpleadoID from '../entity/empleado.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createChef(req, res) {
    try {
        const chefRepository = AppDataSource.getRepository(Chef);
        const { ChefID, EmpleadoID, Especialidad } = req.body;

        if (!ChefID || !EmpleadoID || !Especialidad) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newChef = chefRepository.create({ChefID, EmpleadoID, Especialidad});
        const chefSaved = await chefRepository.save(newChef);

        res.status(201).json({
            message: "Chef creado exitosamente",
            data: chefSaved
        });
    } catch (error) {
        console.error("Error al crear Chef: ", error);
        return res.status(500).json({
            message: "Error al crear Chef.",
            error: error.message
        });
    }
}
export async function getChef(req, res) {
    try {
        const chefRepository = AppDataSource.getRepository(Chef);
        const chef = await chefRepository.find();
        res.status(200).json({
            message: "Chef obtenido exitosamente",
            data: chef
        });
    } catch (error) {
        console.error("Error al obtener Chef: ", error);
        return res.status(500).json({
            message: "Error al obtener Chef.",
            error: error.message
        });
    }
}
export async function getChef(req, res) {
    const { id } = req.params;
    try {
        const chefRepository = AppDataSource.getRepository(Chef);
        const chef = await chefRepository.findOneBy({ id });
        if (!chef) {
            return res.status(404).json({
                message: "chef no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "chef obtenido exitosamente",
            data: chef
        });
    } catch (error) {
        console.error("Error al obtener chef: ", error);
        return res.status(500).json({
            message: "Error al obtener chef.",
            error: error.message
        });
    }
}
export async function deleteChef(req, res) {
    const { id } = req.params;
    try {
        const mchefRepository = AppDataSource.getRepository(Chef);
        const chef = await chefRepository.findOneBy({ id });
        if (!chef) {
            return res.status(404).json({
                message: "chef no encontrado",
                data: null
            });
        }
        await chef.delete(chef);
        res.status(200).json({
            message: "chef eliminado exitosamente",
            data: chef
        });
    } catch (error) {
        console.error("Error al eliminar chef: ", error);
        return res.status(500).json({
            message: "Error al eliminar chef.",
            error: error.message
        });
    }
}
export async function updateChef(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const chefRepository = AppDataSource.getRepository(Chef);
        let chef = await chefRepository.findOneBy({ id });
        if (!chef) {
            return res.status(404).json({
                message: "Chef no encontrado",
                data: null
            });
        }
        chef = {...chef, ...updateData};
        const updateChef = await chefRepository.save(chef);
        res.status(200).json({
            message: "Chef actualizado exitosamente",
            data: updateChef
        });
    } catch (error) {
        console.error("Error al actualizar Chef: ", error);
        return res.status(500).json({
            message: "Error al actualizar Chef.",
            error: error.message
        });
    }
}