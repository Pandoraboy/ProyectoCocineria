import { Router } from "express";
import { createMenu, getMenu, getMenus, deleteMenu, updateMenu } from '../controllers/menu.controller.js';

const router = Router();

router.post('/', createMenu);
router.get('/all', getMenus);
router.get('/:id', getMenu);
router.delete('/:id', deleteMenu);
router.put('/:id', updateMenu);

export default router;
