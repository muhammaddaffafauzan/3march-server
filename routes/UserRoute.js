import express from "express";
import { 
  getUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers
 } from "../controllers/UsersController.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/api/v1/users', adminOnly, verifyUser, getUsers);
router.get('/api/v1/users/:id', adminOnly, verifyUser, getUsersById);
router.post('/api/v1/users/add', adminOnly, verifyUser, createUsers);
router.patch('/api/v1/users/update/:id', adminOnly, verifyUser, updateUsers);
router.delete('/api/v1/users/destroy/:id', adminOnly, verifyUser, deleteUsers);

export default router;