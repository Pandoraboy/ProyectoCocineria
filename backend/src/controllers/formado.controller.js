"use strict";
import Formado from '../entity/formado.entity.js';
import { AppDataSource } from '../config/configDb.js';
import PlatoID from '../entity/plato.entity.js';
import IngredienteID from '../entity/ingrediente.entity.js';

export async function createFormado(req, res) {
    try {
        const formadoRepository = AppDataSource.getRepository(Formado);
        const { PlatoID, IngredienteID } = req.body;

        if ( !PlatoID || !IngredienteID ) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newFormado = formadoRepository.create({ PlatoID, IngredienteID });
        const formadoSaved = await formadoRepository.save(newFormado);

        res.status(201).json({
            message: "Formado creado exitosamente",
            data: formadoSaved
        });
    } catch (error) {
        console.error("Error al crear formado: ", error);
        return res.status(500).json({
            message: "Error al crear formado.",
            error: error.message
        });
    }
}

export async function getFormados(req, res) {
    try {
        const formadoRepository = AppDataSource.getRepository(Formado);
        const formados = await formadoRepository.find();
        res.status(200).json({
            message: "Formados obtenidos exitosamente",
            data: formados
        });
    } catch (error) {
        console.error("Error al obtener formados: ", error);
        return res.status(500).json({
            message: "Error al obtener formados.",
            error: error.message
        });
    }
}

export async function getFormado(req, res) {
    const { id } = req.params;
    try {
        const formadoRepository = AppDataSource.getRepository(Formado);
        const formado = await formadoRepository.findOneBy({ id });
        if (!formado) {
            return res.status(404).json({
                message: "Formado no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "Formado obtenido exitosamente",
            data: formado
        });
    } catch (error) {
        console.error("Error al obtener formado: ", error);
        return res.status(500).json({
            message: "Error al obtener formado.",
            error: error.message
        });
    }
}

export async function deleteFormado(req, res) {
    const { id } = req.params;
    try {
        const formadoRepository = AppDataSource.getRepository(Formado);
        const formado = await formadoRepository.findOneBy({ id });
        if (!formado) {
            return res.status(404).json({
                message: "Formado no encontrado",
                data: null
            });
        }
        await formadoRepository.remove(formado);
        res.status(200).json({
            message: "Formado eliminado exitosamente",
            data: formado
        });
    } catch (error) {
        console.error("Error al eliminar formado: ", error);
        return res.status(500).json({
            message: "Error al eliminar formado.",
            error: error.message
        });
    }
}

export async function updateFormado(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const formadoRepository = AppDataSource.getRepository(Formado);        
        const formado = await formadoRepository.findOneBy({ id });
        if (!formado) {
            return res.status(404).json({
                message: "Formado no encontrado",
                data: null
            });
        }
        formado = { ...formado, ...updateData };
        const formadoUpdated = await formadoRepository.save(formado);
        res.status(200).json({
            message: "Formado actualizado exitosamente",
            data: formadoUpdated
        });
    } catch (error) {
        console.error("Error al actualizar formado: ", error);
        return res.status(500).json({
            message: "Error al actualizar formado.",
            error: error.message
        });
    }
}