import administrador from "../entity/administrador.entity.js";
import JefeDeCocina from "../entity/jefedecocina.entity.js";
import { AppDataSource } from "../config/configDb.js";
import {
handleErrorClient,
handleErrorServer,
} from "../handlers/responseHandlers.js";

export async function isAdmin(req, res, next) {
try {
    const administradorRepository = AppDataSource.getRepository(administrador);

    const administradorFound = await administradorRepository.findOneBy({ id: req.user.id  });

    if (!administradorFound) {
    return handleErrorClient(
        res,
        404,
        "Usuario no encontrado en la base de datos",
    );
    }

    const rolAdministrador = administradorFound.rol;

    if (rolAdministrador !== "administrador") {
        return handleErrorClient(
            res,
            403,
            "Error al acceder al recurso",
            "Se requiere un rol de administrador para realizar esta acción."
        );
    }
    next();
} catch (error) {
    handleErrorServer(
    res,
    500,
    error.message,
    );
}
}

export async function isJefeDeCocina(req, res, next) {
    try {
        const jefeDeCocinaRepository = AppDataSource.getRepository(JefeDeCocina);

        // Busca si existe un Jefe de cocina con el id del usuario autenticado
        const jefeDeCocinaFound = await jefeDeCocinaRepository.findOneBy({ id: req.user.id });

        if (!jefeDeCocinaFound) {
            return handleErrorClient(
                res,
                403,
                "Error al acceder al recurso",
                "Se requiere un rol de Jefe de cocina para realizar esta acción."
            );
        }

        // Si el usuario es Jefe de cocina, continúa con la solicitud
        next();
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}



