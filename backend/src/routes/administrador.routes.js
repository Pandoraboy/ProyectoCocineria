import { Router } from "express";
import { createAdministrador, getAdministrador, getAdministradores, deleteAdministrador, updateAdministrador } from '../controllers/administrador.controller.js';

const router = Router();

router.post('/', createAdministrador);
router.get('/all', getAdministradores);
router.get('/:id', getAdministrador);
router.delete('/:id', deleteAdministrador);
router.put('/:id', updateAdministrador);

export default router;