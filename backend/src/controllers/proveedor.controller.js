"use strict";
import Proveedor from '../entity/proveedor.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createProveedor(req, res) {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const { AdministradorID, Nombre, Contacto, Direccion } = req.body;

        if (!AdministradorID || !Nombre || !Contacto || !Direccion) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newProveedor = proveedorRepository.create({ AdministradorID, Nombre, Contacto, Direccion });
        const proveedorSaved = await proveedorRepository.save(newProveedor);

        res.status(201).json({
            message: "Proveedor creado exitosamente",
            data: proveedorSaved
        });
    } catch (error) {
        console.error("Error al crear proveedor: ", error);
        return res.status(500).json({
            message: "Error al crear proveedor.",
            error: error.message
        });
    }
}

export async function getProveedores(req, res) {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const proveedores = await proveedorRepository.find();
        res.status(200).json({
            message: "Proveedores obtenidos exitosamente",
            data: proveedores
        });
    } catch (error) {
        console.error("Error al obtener proveedores: ", error);
        return res.status(500).json({
            message: "Error al obtener proveedores.",
            error: error.message
        });
    }
}

export async function getProveedor(req, res) {
    const { id } = req.params;
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const proveedor = await proveedorRepository.findOneBy({ id });
        if (!proveedor) {
            return res.status(404).json({
                message: "Proveedor no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "Proveedor obtenido exitosamente",
            data: proveedor
        });
    } catch (error) {
        console.error("Error al obtener proveedor: ", error);
        return res.status(500).json({
            message: "Error al obtener proveedor.",
            error: error.message
        });
    }
}

export async function deleteProveedor(req, res) {
    const { id } = req.params;
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const proveedor = await proveedorRepository.findOneBy({ id });
        if (!proveedor) {
            return res.status(404).json({
                message: "Proveedor no encontrado",
                data: null
            });
        }
        await proveedorRepository.remove(proveedor);
        res.status(200).json({
            message: "Proveedor eliminado exitosamente",
            data: proveedor
        });
    } catch (error) {
        console.error("Error al eliminar proveedor: ", error);
        return res.status(500).json({
            message: "Error al eliminar proveedor.",
            error: error.message
        });
    }
}

export async function updateProveedor(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        let proveedor = await proveedorRepository.findOneBy({ id });
        if (!proveedor) {
            return res.status(404).json({
                message: "Proveedor no encontrado",
                data: null
            });
        }
        proveedor = { ...proveedor, ...updateData };
        const updatedProveedor = await proveedorRepository.save(proveedor);
        res.status(200).json({
            message: "Proveedor actualizado exitosamente",
            data: updatedProveedor
        });
    } catch (error) {
        console.error("Error al actualizar proveedor: ", error);
        return res.status(500).json({
            message: "Error al actualizar proveedor.",
            error: error.message
        });
    }
}
