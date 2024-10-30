"use strict";
import Turno from '../entity/turno.entity.js';
import AdministradorID from '../entity/administrador.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createTurno(req, res) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);
        const { TurnoID, AdministradorID, Fecha, HoraInicio, HoraFin } = req.body;

        if (!TurnoID || !AdministradorID || !Fecha || !HoraInicio || !HoraFin) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newTurno = turnoRepository.create({ TurnoID, AdministradorID, Fecha, HoraInicio, HoraFin });
        const turnoSaved = await turnoRepository.save(newTurno);

        res.status(201).json({
            message: "Turno creado exitosamente",
            data: turnoSaved
        });
    } catch (error) {
        console.error("Error al crear turno: ", error);
        return res.status(500).json({
            message: "Error al crear turno.",
            error: error.message
        });
    }
}
export async function getTurno(req, res) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);
        const turno = await turnoRepository.find();
        res.status(200).json({
            message: "Turnos obtenidos exitosamente",
            data: turno
        });
    } catch (error) {
        console.error("Error al obtener turnos: ", error);
        return res.status(500).json({
            message: "Error al obtener turnos.",
            error: error.message
        });
    }
}
export async function getTurno(req, res) {
    const { id } = req.params;
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);
        const turno = await turnoRepository.findOneBy({ id });
        if (!turno) {
            return res.status(404).json({
                message: "turno no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "turno obtenido exitosamente",
            data: turno
        });
    } catch (error) {
        console.error("Error al obtener turno: ", error);
        return res.status(500).json({
            message: "Error al obtener turno.",
            error: error.message
        });
    }
}
export async function deleteTurno(req, res) {
    const { id } = req.params;
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);
        const turno = await turnoRepository.findOneBy({ id });
        if (!turno) {
            return res.status(404).json({
                message: "Turno no encontrado",
                data: null
            });
        }
        await turnoRepository.delete(turno);
        res.status(200).json({
            message: "turno eliminado exitosamente",
            data: turno
        });
    } catch (error) {
        console.error("Error al eliminar turno: ", error);
        return res.status(500).json({
            message: "Error al eliminar turno.",
            error: error.message
        });
    }
}
export async function updateTurno(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);
        let turno = await turnoRepository.findOneBy({ id });
        if (!turno) {
            return res.status(404).json({
                message: "Turno no encontrado",
                data: null
            });
        }
        turno = {...turno, ...updateData};
        const updateTurno = await turnoRepository.save(turno);
        res.status(200).json({
            message: "Turno actualizado exitosamente",
            data: updateTurno
        });
    } catch (error) {
        console.error("Error al actualizar Turno: ", error);
        return res.status(500).json({
            message: "Error al actualizar Turno.",
            error: error.message
        });
    }
}