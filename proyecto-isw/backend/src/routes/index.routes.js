import { Router } from "express";
import userRoutes from './user.routes.js';
import inventarioRoutes from './inventario.routes.js';
import ingredienteRoutes from './ingrediente.routes.js';
import platoRoutes from './plato.routes.js';
import proveedorRoutes from './proveedor.routes.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/inventario', inventarioRoutes);
router.use('/ingrediente', ingredienteRoutes);
router.use('/platos', platoRoutes);
router.use('/proveedore', proveedorRoutes);

export default router;