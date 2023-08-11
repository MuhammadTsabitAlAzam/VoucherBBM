import { pool } from '../db/db.js';

export const getVouchers = async (req, res) => {
 
  try {

    const [rows] = await pool.query('SELECT * FROM voucher');

    (rows.length <= 0)
      ? res.status(404).json({ message: 'Data voucher Tidak Ditemukan.' })
      : res.json({ 
          success: true,
          data: rows
        });

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const getVoucher = async (req, res) => {

  const { id } = req.params;

  try {

    const [rows] = await pool.query('SELECT * FROM voucher WHERE id=?', [id]);

    (rows.length <= 0)
      ? res.status(404).json({ message: 'Data voucher Tidak Ditemukan.' })
      : res.json({ 
          success: true,
          data: rows
        });

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const getPeminjaman = async (req, res) => {

  try {

    const [rows] = await pool.query('SELECT * FROM voucher WHERE tanggal_pengembalian IS NULL');

    (rows.length <= 0)
      ? res.status(404).json({ message: 'Data voucher Tidak Ditemukan.' })
      : res.json({ 
          success: true,
          data: rows
        });

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const createVoucher = async (req, res) => {

  const { nama, bagian, tanggal_pengambilan, tanggal_pengembalian, dualima, limapuluh, seratus } = req.body;

  try {
    
    const [rows] = await pool.query('INSERT INTO voucher (nama, bagian, tanggal_pengambilan, tanggal_pengembalian, dualima, limapuluh, seratus) VALUES (?, ?, ?, ?, ?, ?, ?)', [nama, bagian, tanggal_pengambilan, tanggal_pengembalian, dualima, limapuluh, seratus]);

    res.json({ 
      success: true,
      data: { id: rows.insertId, nama, bagian, tanggal_pengambilan, tanggal_pengembalian, dualima, limapuluh, seratus }
    });

 } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
 }
};


export const updateVoucher = async (req, res) => {

  const { id } = req.params;
  const { nama, bagian, tanggal_pengambilan, tanggal_pengembalian, dualima, limapuluh, seratus } = req.body;

  try {
    
    const [result] = await pool.query('UPDATE voucher SET nama=IFNULL(?, nama), bagian=IFNULL(?, bagian), tanggal_pengambilan=IFNULL(?, tanggal_pengambilan), tanggal_pengembalian=IFNULL(?, tanggal_pengembalian), dualima=IFNULL(?, dualima), limapuluh=IFNULL(?, limapuluh), seratus=IFNULL(?, seratus) WHERE id=?', [nama, bagian, tanggal_pengambilan, tanggal_pengembalian, dualima, limapuluh, seratus, id]);

    const [rows] = await pool.query('SELECT * FROM voucher WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'Data voucher Tidak Ditemukan.' })
      : res.json({ 
        success: true,
        data: rows[0]
      });

  } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const deleteVoucher = async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await pool.query('DELETE FROM voucher WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'Data voucher Tidak Ditemukan.' })
      : res.json({ success: true });

  } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};
