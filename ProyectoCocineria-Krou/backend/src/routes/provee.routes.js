import { Router } from "express";
import { createProvee, getProvee, getProvees, deleteProvee, updateProvee } from '../controllers/provee.controller.js';

const router = Router();

router.post('/', createProvee);
router.get('/all', getProvees);
router.get('/:id', getProvee);
router.delete('/:id', deleteProvee);
router.put('/:id', updateProvee);

export default router;