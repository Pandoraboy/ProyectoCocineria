"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = req.body;

        // Validar si se proporcionaron los datos necesarios
        if (!user || !user.nombreCompleto || !user.rut || !user.email) {
            return res.status(400).json({
                message: "Es necesario ingresar los datos del usuario.",
                data: null
            });
        }

        const newUser = userRepository.create({
            nombreCompleto: user.nombreCompleto,
            rut: user.rut,
            email: user.email
        });

        const userSaved = await userRepository.save(newUser);

        res.status(201).json({
            message: "Usuario creado exitosamente",
            data: userSaved
        });
    } catch (error) {
        console.error("Error al crear un usuario, el error es: ", error);
        return res.status(500).json({
            message: "Error al crear el usuario.",
            error: error.message // O cualquier otra información relevante
        });
    }
}

export async function getUsers(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find(); // Obtener todos los usuarios

        res.status(200).json({
            message: "Usuarios obtenidos exitosamente",
            data: users
        });
    } catch (error) {
        console.error("Error al obtener usuarios: ", error);
        return res.status(500).json({
            message: "Error al obtener los usuarios.",
            error: error.message
        });
    }
}

export async function getUser(req, res) {
    const { id } = req.params; // Obtener el ID del usuario de los parámetros

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id }); // Buscar el usuario por ID

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        res.status(200).json({
            message: "Usuario obtenido exitosamente",
            data: user
        });
    } catch (error) {
        console.error("Error al obtener el usuario: ", error);
        return res.status(500).json({
            message: "Error al obtener el usuario.",
            error: error.message
        });
    }
}

