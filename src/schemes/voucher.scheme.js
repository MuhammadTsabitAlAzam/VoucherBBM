import Joi from 'joi';

const nama = Joi.string().min(2).max(50).messages({
  'string.base': 'The nama must be a string',
  'string.min': 'The nama must be larger than or equal to 3',
  'string.max': 'The nama must be less than or equal to 50'
});

const bagian = Joi.string().min(2).max(50).messages({
  'string.base': 'The bagian must be a string',
  'string.min': 'The bagian must be larger than or equal to 5',
  'string.max': 'The bagian must be less than or equal to 50'
});

const tanggal_pengambilan = Joi.date().optional();

const tanggal_pengembalian = Joi.date().optional();

const dualima = Joi.number().integer().optional().messages({
  'number.base': 'The dualima must be a number',
  'number.integer': 'The dualima must be an integer'
});

const limapuluh = Joi.number().integer().optional().messages({
  'number.base': 'The limapuluh must be a number',
  'number.integer': 'The limapuluh must be an integer'
});

const seratus = Joi.number().integer().optional().messages({
  'number.base': 'The seratus must be a number',
  'number.integer': 'The seratus must be an integer'
});

export const voucherCreateScheme = Joi.object({
  nama: nama.required(),
  bagian: bagian.required(),
  tanggal_pengambilan : tanggal_pengambilan.required(),
  // tanggal_pengembalian : tanggal_pengembalian.optional(),
  dualima : dualima.optional(),
  limapuluh : limapuluh.optional(),
  seratus : seratus.optional()
});

export const voucherUpdateScheme = Joi.object({
  nama: nama,
  bagian: bagian,
  tanggal_pengambilan : tanggal_pengambilan,
  tanggal_pengembalian : tanggal_pengembalian,
  dualima : dualima,
  limapuluh : limapuluh,
  seratus : seratus
});
