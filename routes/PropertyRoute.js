import express from "express";
import { 
   getPropertis,
   getPropertisById,
   savePropertis,
  //  updatePropertis,
   deletePropertis
 } from "../controllers/PropertyController.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/api/v1/property', verifyUser, getPropertis);
router.get('/api/v1/property/:id', verifyUser, getPropertisById);
router.post('/api/v1/property/create', verifyUser, savePropertis);
// router.patch('/api/v1/property/update/:id', verifyUser, updatePropertis);
router.delete('/api/v1/property/delete/:id', verifyUser, deletePropertis);

export default router;