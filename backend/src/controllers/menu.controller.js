"use strict";
import Menu from '../entity/menu.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createMenu(req, res) {
    try{
        const menuRepository = AppDataSource.getRepository(Menu);
        const { MenuId, ClienteID, NombrePlato, Ingredientes, Vaolores } = req.body;

        if (!MenuId || !ClienteID || !NombrePlato || !Ingredientes || !Valores) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios.",
                data: null
            });
        }

        const newMenu = menuRepository.create({ MenuId, ClienteID, NombrePlato, Ingredientes, Valores });
        const menuSaved = await menuRepository.save(newMenu);

        res.status(201).json({
            message: "Menu creado exitosamente",
            data: menuSaved
        });
    } catch (error) {
        console.error("Error al crear menu: ", error);
        return res.status(500).json({
            message: "Error al crear menu.",
            error: error.message
        });
    }
}

export async function getMenus(req, res) {
    try {
        const menuRepository = AppDataSource.getRepository(Menu);
        const menus = await menuRepository.find();
        res.status(200).json({
            message: "Menus obtenidos exitosamente",
            data: menus
        });
    } catch (error) {
        console.error("Error al obtener menus: ", error);
        return res.status(500).json({
            message: "Error al obtener menus.",
            error: error.message
        });
    }
}

export async function getMenu(req, res) {
    const { id } = req.params;
    try {
        const menuRepository = AppDataSource.getRepository(Menu);
        const menu = await menuRepository.findOneBy({ id });
        if (!menu) {
            return res.status(404).json({
                message: "Menu no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "Menu obtenido exitosamente",
            data: menu
        });
    } catch (error) {
        console.error("Error al obtener menu: ", error);
        return res.status(500).json({
            message: "Error al obtener menu.",
            error: error.message
        });
    }
}

export async function deleteMenu(req, res) {
    const { id } = req.params;
    try {
        const menuRepository = AppDataSource.getRepository(Menu);
        const menu = await menuRepository.findOneBy({ id });
        if (!menu) {
            return res.status(404).json({
                message: "Menu no encontrado",
                data: null
            });
        }
        await menuRepository.remove(menu);
        res.status(200).json({
            message: "Menu eliminado exitosamente",
            data: menu
        });
    } catch (error) {
        console.error("Error al eliminar menu: ", error);
        return res.status(500).json({
            message: "Error al eliminar menu.",
            error: error.message
        });
    }
}

export async function updateMenu(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const menuRepository = AppDataSource.getRepository(Menu);
        let menu = await menuRepository.findOneBy({ id });
        if (!menu) {
            return res.status(404).json({
                message: "Menu no encontrado",
                data: null
            });
        }
        menu = { ...menu, ...updateData };
        const updatedMenu = await menuRepository.save(menu);
        res.status(200).json({
            message: "Menu actualizado exitosamente",
            data: updatedMenu
        });
    } catch (error) {
        console.error("Error al actualizar menu: ", error);
        return res.status(500).json({
            message: "Error al actualizar menu.",
            error: error.message
        });
    }
}

