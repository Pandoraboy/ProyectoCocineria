import { Router } from "express";
import { createTurno, getTurno, getTurnos, deleteTurno, updateTurno } from '../controllers/turno.controller.js';

const router = Router();

router.post('/', createTurno);
router.get('/all', getTurnos);
router.get('/:id', getTurno);
router.delete('/:id', deleteTurno);
router.put('/:id', updateTurno);

export default router;