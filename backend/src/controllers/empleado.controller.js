"use strict";
import Empleado from '../entity/empleado.entity.js';
import turnoID from '../entity/turno.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createEmpleado(req, res) {
    try {
        const empleadoRepository = AppDataSource.getRepository(Empleado);
        const { EmpleadoID, turnoID, Nombre, Contacto } = req.body;

        if (!EmpleadoID || !turnoID || !Nombre || !Contacto ) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newEmpleado = empleadoRepository.create({ EmpleadoID, turnoID, Nombre, Contacto  });
        const empleadoSaved = await empleadoRepository.save(newEmpleado);

        res.status(201).json({
            message: "Empleado creado exitosamente",
            data: empleadoSaved
        });
    } catch (error) {
        console.error("Error al crear empleado: ", error);
        return res.status(500).json({
            message: "Error al crear empleado",
            error: error.message
        });
    }
}
export async function getEmpleados(req, res) {
    try {
        const empleadoRepository = AppDataSource.getRepository(Empleado);
        const empleado = await empleadoRepository.find();
        res.status(200).json({
            message: "Empleados obtenidos exitosamente",
            data: empleado
        });
    } catch (error) {
        console.error("Error al obtener empleados: ", error);
        return res.status(500).json({
            message: "Error al obtener empleados.",
            error: error.message
        });
    }
}
export async function getEmpleado(req, res) {
    const { id } = req.params;
    try {
        const empleadoRepository = AppDataSource.getRepository(Empleado);
        const empleado = await empleadoRepository.findOneBy({ id });
        if (!empleado) {
            return res.status(404).json({
                message: "empleado no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "empleado obtenido exitosamente",
            data: empleado
        });
    } catch (error) {
        console.error("Error al obtener empleado: ", error);
        return res.status(500).json({
            message: "Error al obtener empleado.",
            error: error.message
        });
    }
}
export async function deleteEmpleado(req, res) {
    const { id } = req.params;
    try {
        const empleadoRepository = AppDataSource.getRepository(Empleado);
        const empleado = await empleadoRepository.findOneBy({ id });
        if (!empleado) {
            return res.status(404).json({
                message: "Empleado no encontrado",
                data: null
            });
        }
        await empleadoRepository.delete(empleado);
        res.status(200).json({
            message: "empleado eliminado exitosamente",
            data: Empleado
        });
    } catch (error) {
        console.error("Error al eliminar empleado: ", error);
        return res.status(500).json({
            message: "Error al eliminar empleado.",
            error: error.message
        });
    }
}
export async function updateEmpleado(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const empleadoRepository = AppDataSource.getRepository(Empleado);
        let empleado = await empleadoRepository.findOneBy({ id });
        if (!empleado) {
            return res.status(404).json({
                message: "Empleado no encontrado",
                data: null
            });
        }
        empleado = {...empleado, ...updateData};
        const updateEmpleado = await empleadoRepository.save(empleado);
        res.status(200).json({
            message: "empleado actualizado exitosamente",
            data: updateEmpleado
        });
    } catch (error) {
        console.error("Error al actualizar empleado: ", error);
        return res.status(500).json({
            message: "Error al actualizar Empleado.",
            error: error.message
        });
    }
}