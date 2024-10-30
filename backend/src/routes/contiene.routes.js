import { Router } from "express";
import {
    createContiene, 
    deleteContiene, 
    getContiene, 
    getContienes, 
    updateContiene 
} from "../controllers/contiene.controller.js";

const router = Router();

router.post("/", createContiene);
router.get("/all", getContienes);
router.get("/:id", getContiene);
router.delete("/:id", deleteContiene);
router.put("/:id", updateContiene);

export default router;