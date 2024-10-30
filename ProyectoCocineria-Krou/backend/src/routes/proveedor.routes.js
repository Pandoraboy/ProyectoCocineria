import { Router } from "express";
import { createProveedor, getProveedor, getProveedores, deleteProveedor, updateProveedor } from '../controllers/proveedor.controller.js';

const router = Router();

router.post('/', createProveedor);          
router.get('/all', getProveedores);         
router.get('/:id', getProveedor);           
router.delete('/:id', deleteProveedor);     
router.put('/:id', updateProveedor);        

export default router;
