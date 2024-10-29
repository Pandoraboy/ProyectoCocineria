"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = req.body;

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
            error: error.message 
        });
    }
}

export async function getUsers(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find(); 

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
    const { id } = req.params; 

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id }); 

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

export async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        await userRepository.remove(user);

        res.status(200).json({
            message: "Usuario eliminado exitosamente",
            data: user
        });
    } catch (error) {
        console.error("Error al eliminar el usuario: ", error);
        return res.status(500).json({
            message: "Error al eliminar el usuario.",
            error: error.message
        });
    }
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOneBy({ id });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        user = { ...user, ...userData };

        const updatedUser = await userRepository.save(user);

        res.status(200).json({
            message: "Usuario actualizado exitosamente",
            data: updatedUser
        });
    } catch (error) {
        console.error("Error al actualizar el usuario: ", error);
        return res.status(500).json({
            message: "Error al actualizar el usuario.",
            error: error.message
        });
    }
}


