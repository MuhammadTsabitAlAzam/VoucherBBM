import { pool } from '../db/db.js';

export const getHistori = async (req, res) => {
 
  try {

    const [rows] = await pool.query('SELECT * FROM histori');

    (rows.length <= 0)
      ? res.status(404).json({ message: 'Data histori Tidak Ditemukan.' })
      : res.json({ 
          success: true,
          data: rows
        });

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const getHistoris= async (req, res) => {

  const { id } = req.params;

  try {

    const [rows] = await pool.query('SELECT * FROM histori WHERE id=?', [id]);

    (rows.length <= 0)
      ? res.status(404).json({ message: 'Data histori Tidak Ditemukan.' })
      : res.json({ 
          success: true,
          data: rows
        });

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const createHistori = async (req, res) => {

  const { nama, bagian, tanggal, dualima, limapuluh, seratus, jenis } = req.body;

  try {
    
    const [rows] = await pool.query('INSERT INTO histori (nama, bagian, tanggal, dualima, limapuluh, seratus, jenis) VALUES (?, ?, ?, ?, ?, ?, ?)', [nama, bagian, tanggal, dualima, limapuluh, seratus, jenis]);

    res.json({ 
      success: true,
      data: { id: rows.insertId, nama, bagian, tanggal, dualima, limapuluh, seratus, jenis }
    });

 } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
 }
};


export const updateHistori = async (req, res) => {

  const { id } = req.params;
  const { nama, bagian, tanggal, dualima, limapuluh, seratus, jenis } = req.body;

  try {
    
    const [result] = await pool.query('UPDATE histori SET nama=IFNULL(?, nama), bagian=IFNULL(?, bagian), tanggal=IFNULL(?, tanggal), dualima=IFNULL(?, dualima), limapuluh=IFNULL(?, limapuluh), seratus=IFNULL(?, seratus), jenis=IFNULL(?, jenis) WHERE id=?', [nama, bagian, tanggal, dualima, limapuluh, seratus, jenis, id]);

    const [rows] = await pool.query('SELECT * FROM histori WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'Data histori Tidak Ditemukan.' })
      : res.json({ 
        success: true,
        data: rows[0]
      });

  } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const deleteHistori = async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await pool.query('DELETE FROM histori WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'Data histori Tidak Ditemukan.' })
      : res.json({ success: true });

  } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};
