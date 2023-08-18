import express from 'express';
import { handleValidate } from '../middlewares/handleValidate.js';
import { createUser, deleteUser, getUser } from '../controllers/user.controller.js';
import { userCreateScheme } from '../schemes/user.scheme.js';

const router = express.Router();

router.get('/user', getUser);

router.post('/user',handleValidate(userCreateScheme), createUser);

router.delete('/user/:id', deleteUser);

export default router;
