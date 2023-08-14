import express from 'express';
import { historiCreateScheme, historiUpdateScheme } from '../schemes/histori.scheme.js';
import { handleValidate } from '../middlewares/handleValidate.js';
import {  } from '../controllers/histori.controller.js';
import { createHistori, deleteHistori, getHistori, updateHistori } from '../controllers/histori.controller.js';

const router = express.Router();

router.get('/histori', getHistori);

router.post('/histori', handleValidate(historiCreateScheme), createHistori);

router.patch('/histori/:id', handleValidate(historiUpdateScheme), updateHistori);

router.delete('/histori/:id', deleteHistori);

export default router;
