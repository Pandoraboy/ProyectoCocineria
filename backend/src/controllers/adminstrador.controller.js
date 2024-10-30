"use strict";
import Administrador from '../entity/administrador.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createAdministrador(req, res) {
    try {
        const administradorRepository = AppDataSource.getRepository(Administrador);
        const { AdministradorID, Nombre, Contacto } = req.body;

        if (!AdministradorID || !Nombre || !Contacto) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newAdministrador = administradorRepository.create({ AdministradorID, Nombre, Contacto });
        const administradorSaved = await administradorRepository.save(newAdministrador);

        res.status(201).json({
            message: "Administrador creado exitosamente",
            data: administradorSaved
        });
    } catch (error) {
        console.error("Error al crear administrador: ", error);
        return res.status(500).json({
            message: "Error al crear administrador.",
            error: error.message
        });
    }
}

export async function getAdministradores(req, res) {
    try {
        const administradorRepository = AppDataSource.getRepository(Administrador);
        const administradores = await administradorRepository.find();
        res.status(200).json({
            message: "Administradores obtenidos exitosamente",
            data: administradores
        });
    } catch (error) {
        console.error("Error al obtener administradores: ", error);
        return res.status(500).json({
            message: "Error al obtener administradores.",
            error: error.message
        });
    }
}

export async function getAdministrador(req, res) {
    const { id } = req.params;
    try {
        const administradorRepository = AppDataSource.getRepository(Administrador);
        const administrador = await administradorRepository.findOneBy({ id });
        if (!administrador) {
            return res.status(404).json({
                message: "Administrador no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "Administrador obtenido exitosamente",
            data: administrador
        });
    } catch (error) {
        console.error("Error al obtener administrador: ", error);
        return res.status(500).json({
            message: "Error al obtener administrador.",
            error: error.message
        });
    }
}

export async function deleteAdministrador(req, res) {
    const { id } = req.params;
    try {
        const administradorRepository = AppDataSource.getRepository(Administrador);
        const administrador = await administradorRepository.findOneBy({ id });
        if (!administrador) {
            return res.status(404).json({
                message: "Administrador no encontrado",
                data: null
            });
        }
        await administradorRepository.delete(administrador);
        res.status(200).json({
            message: "Administrador eliminado exitosamente",
            data: administrador
        });
    } catch (error) {
        console.error("Error al eliminar administrador: ", error);
        return res.status(500).json({
            message: "Error al eliminar administrador.",
            error: error.message
        });
    }
}

export async function updateAdministrador(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const administradorRepository = AppDataSource.getRepository(Administrador);
        let administrador = await administradorRepository.findOneBy({ id });
        if (!administrador) {
            return res.status(404).json({
                message: "Administrador no encontrado",
                data: null
            });
        }
        adminstrador = {...administrador, ...updateData};
        const updateAdministrador = await administradorRepository.save(administrador);
        res.status(200).json({
            message: "Administrador actualizado exitosamente",
            data: updateAdministrador
        });
    } catch (error) {
        console.error("Error al actualizar administrador: ", error);
        return res.status(500).json({
            message: "Error al actualizar administrador.",
            error: error.message
        });
    }
}
