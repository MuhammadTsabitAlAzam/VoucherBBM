import express from 'express';
import { historiCreateScheme, historiUpdateScheme } from '../schemes/histori.scheme.js';
import { handleValidate } from '../middlewares/handleValidate.js';
import {  } from '../controllers/histori.controller.js';
import { createHistori, deleteHistori, getHistori, getHistoris, updateHistori, getHistoriAmbil, getHistoriKembali } from '../controllers/histori.controller.js';

const router = express.Router();

router.get('/histori', getHistori);

router.get('/histori/:id', getHistoris);

router.get('/historiambil', getHistoriAmbil);

router.get('/historikembali', getHistoriKembali);

router.post('/histori', handleValidate(historiCreateScheme), createHistori);

router.patch('/histori/:id', handleValidate(historiUpdateScheme), updateHistori);

router.delete('/histori/:id', deleteHistori);

export default router;
