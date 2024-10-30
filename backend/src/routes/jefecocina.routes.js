import { Router } from "express";
import { createJefeCocina, getJefeCocina, getJefesCocina, deleteJefeCocina, updateJefeCocina } from '../controllers/jefecocina.controller.js';

const router = Router();

router.post('/', createJefeCocina);
router.get('/all', getJefesCocina);
router.get('/:id', getJefeCocina);
router.delete('/:id', deleteJefeCocina);
router.put('/:id', updateJefeCocina);

export default router;