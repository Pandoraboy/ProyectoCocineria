import { Router } from "express";
import { createPlato, getPlato, getPlatos, deletePlato, updatePlato } from '../controllers/plato.controller.js';

const router = Router();

router.post('/', createPlato);          
router.get('/all', getPlatos);          
router.get('/:id', getPlato);           
router.delete('/:id', deletePlato);     
router.put('/:id', updatePlato);        

export default router;
