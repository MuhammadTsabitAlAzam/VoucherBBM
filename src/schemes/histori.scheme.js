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

const tanggal = Joi.date().required();

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

const jenis = Joi.string().min(5).max(50).messages({
  'string.base': 'The jenis must be a string',
  'string.min': 'The jenis must be larger than or equal to 5',
  'string.max': 'The jenis must be less than or equal to 50'
});

export const historiCreateScheme = Joi.object({
  nama: nama.required(),
  bagian: bagian.required(),
  tanggal : tanggal.required(),
  dualima : dualima.optional(),
  limapuluh : limapuluh.optional(),
  seratus : seratus.optional(),
  jenis: jenis.required(),
});

export const historiUpdateScheme = Joi.object({
  nama: nama,
  bagian: bagian,
  tanggal : tanggal,
  dualima : dualima,
  limapuluh : limapuluh,
  seratus : seratus,
  jenis : jenis
});
