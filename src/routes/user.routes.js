import { Router } from "express";
import{
    createUser,
    getUser,
    getUsers
}from '../controllers/user.controller.js';

const router = Router();

router.post('/', createUser);
router.get('/all', getUsers);
router.get('/:id', getUser);

export default router;