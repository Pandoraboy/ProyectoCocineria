"user strict";
import User from '../enity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createUser(request, response) {
    try {
       const userRepository = AppDataSource.getRepository(User); 
       const user = req.body;
       if(user){
        return res.status(400).json({
            message: "es necesario ingresar los datos del usuario",
            data: null
        })
       }
       const newUser = userRepository.create({
        nombreCompleto: user.nombreCompleto,
        rut: user.rut,
        email: user.email
       });
       const userSaved = await userRepository.save(newUser);

       res.status(201).json({
        message: "usuario creado con exito",
        data: userSaved
       });
    } catch (error) {
        console.error("Error al crear un usuario, el error es: ", error);
    }
}

export async function getUser() {
    
}
