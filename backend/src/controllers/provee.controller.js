"use strict";
import Provee from '../entity/provee.entity.js';
import ProveedorID from '../entity/proveedor.entity.js';
import IngredienteID from '../entity/ingrediente.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createProvee(req, res) {
    try {
        const proveeRepository = AppDataSource.getRepository(Provee);
        const { ProveedorID, IngredienteID} = req.body;

        if (!proveedorID || !IngredienteID) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newProvee = proveeRepository.create({ ProveedorID, IngredienteID });
        const proveeSaved = await proveeRepository.save(newProvee);

        res.status(201).json({
            message: "Proveedor creado exitosamente",
            data: proveeSaved
        });
    } catch (error) {
        console.error("Error al crear proveedor: ", error);
        return res.status(500).json({
            message: "Error al crear proveedor.",
            error: error.message
        });
    }
}

export async function getProveen(req, res) {
    try {
        const proveeRepository = AppDataSource.getRepository(Provee);
        const provee = await proveeRepository.find();
        res.status(200).json({
            message: "Proveedores obtenidos exitosamente",
            data: provee
        });
    } catch (error) {
        console.error("Error al obtener proveedores: ", error);
        return res.status(500).json({
            message: "Error al obtener proveedores.",
            error: error.message
        });
    }
}

export async function getProvee(req, res) {
    const { id } = req.params;
    try {
        const proveeRepository = AppDataSource.getRepository(Provee);
        const provee = await proveeRepository.findOneBy({ id });
        if (!provee) {
            return res.status(404).json({
                message: "Proveedor no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "Proveedor obtenido exitosamente",
            data: provee
        });
    } catch (error) {
        console.error("Error al obtener proveedor: ", error);
        return res.status(500).json({
            message: "Error al obtener proveedor.",
            error: error.message
        });
    }
}

export async function deleteProvee(req, res) {
    const { id } = req.params;
    try {
        const proveeRepository = AppDataSource.getRepository(Provee);
        const provee = await proveeRepository.findOneBy({ id });
        if (!provee) {
            return res.status(404).json({
                message: "Proveedor no encontrado",
                data: null
            });
        }
        await proveeRepository.remove(provee);
        res.status(200).json({
            message: "Proveedor eliminado exitosamente",
            data: provee
        });
    } catch (error) {
        console.error("Error al eliminar proveedor: ", error);
        return res.status(500).json({
            message: "Error al eliminar proveedor.",
            error: error.message
        });
    }
}

export async function updateProvee(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const proveeRepository = AppDataSource.getRepository(Provee);
        let provee = await proveeRepository.findOneBy({ id });
        if (!provee) {
            return res.status(404).json({
                message: "Proveedor no encontrado",
                data: null
            });
        }
        provee = { ...provee, ...updateData };
        const updatedProvee = await proveeRepository.save(provee);
        res.status(200).json({
            message: "Proveedor actualizado exitosamente",
            data: updatedProvee
        });
    } catch (error) {
        console.error("Error al actualizar proveedor: ", error);
        return res.status(500).json({
            message: "Error al actualizar proveedor.",
            error: error.message
        });
    }
}
