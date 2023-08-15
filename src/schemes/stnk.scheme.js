import Joi from 'joi';

const nama_kendaraan = Joi.string().min(2).max(50).messages({
  'string.base': 'The nama_kendaraan must be a string',
  'string.min': 'The nama_kendaraan must be larger than or equal to 3',
  'string.max': 'The nama_kendaraan must be less than or equal to 50'
});

const plat_nomor = Joi.string().min(2).max(50).messages({
  'string.base': 'The plat_nomor must be a string',
  'string.min': 'The plat_nomor must be larger than or equal to 5',
  'string.max': 'The plat_nomor must be less than or equal to 50'
});

// Validasi kustom untuk tanggal
const customDateValidation = (value, helpers) => {
    // Lakukan validasi tanggal dan bulan sesuai kebutuhan
    // Misalnya, pastikan tanggal antara 1 hingga 31, dan bulan antara 1 hingga 12
  
    const dateObject = new Date(value); // Konversi value menjadi objek Date
  
    const tanggal = dateObject.getDate();
    const bulan = dateObject.getMonth() + 1; // Ingat, bulan dimulai dari 0 (Januari) hingga 11 (Desember)
  
    if (isNaN(tanggal) || isNaN(bulan)) {
      return helpers.error('any.invalid');
    }
  
    // Di sini Anda dapat menyesuaikan validasi tanggal dan bulan sesuai kebutuhan
  
    return value;
  };
  
  const tanggal = Joi.custom(customDateValidation, 'custom validation').required();
  
  


export const stnkCreateScheme = Joi.object({
  nama_kendaraan_kendaraan: nama_kendaraan.required(),
  plat_nomor: plat_nomor.required(),
  tanggal : tanggal.required(),
});

export const stnkUpdateScheme = Joi.object({
  nama_kendaraan: nama_kendaraan,
  plat_nomor: plat_nomor,
  tanggal : tanggal,
});
