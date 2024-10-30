import { Router } from "express";
import { createUser, getUser, getUsers, deleteUser, updateUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/', createUser);
router.get('/all', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser); 
router.put('/:id', updateUser); 

export default router;