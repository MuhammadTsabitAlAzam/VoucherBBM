import express from 'express';
import { voucherCreateScheme, voucherUpdateScheme } from '../schemes/voucher.scheme.js';
import { handleValidate } from '../middlewares/handleValidate.js';
import { createVoucher, deleteVoucher, getPeminjaman, getVoucher, getVouchers, updateVoucher } from '../controllers/voucher.controller.js';

const router = express.Router();

router.get('/voucher', getVouchers);

router.get('/voucher/:id', getVoucher);

router.get('/peminjaman', getPeminjaman);

router.post('/voucher', handleValidate(voucherCreateScheme), createVoucher);

router.patch('/voucher/:id', handleValidate(voucherUpdateScheme), updateVoucher);

router.delete('/voucher/:id', deleteVoucher);

export default router;