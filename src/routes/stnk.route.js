import express from 'express';
import { handleValidate } from '../middlewares/handleValidate.js';
import { createStnk, deleteStnk, getDayLeft, getStnk, updateStnk, updateStnkAddOneYear } from '../controllers/stnk.controller.js';
import { stnkCreateScheme, stnkUpdateScheme } from '../schemes/stnk.scheme.js';

const router = express.Router();

router.get('/stnk', getStnk);

router.get('/dayleft', getDayLeft);

router.post('/stnk', handleValidate(stnkCreateScheme), createStnk);

router.patch('/stnk/:id', handleValidate(stnkUpdateScheme), updateStnk);

router.patch('/addyear/:id', updateStnkAddOneYear);

router.delete('/stnk/:id', deleteStnk);

export default router;
