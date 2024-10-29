import { Router } from "express";
import { createPedido, getPedido, getPedidos, deletePedido, updatePedido } from '../controllers/pedido.controller.js';

const router = Router();

router.post('/', createPedido);
router.get('/all', getPedidos);
router.get('/:id', getPedido);
router.delete('/:id', deletePedido);
router.put('/:id', updatePedido);

export default router;