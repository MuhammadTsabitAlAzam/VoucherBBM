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

export const getHistoriAmbil = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM histori WHERE jenis = ?', ['Ambil']);

    (rows.length <= 0)
      ? res.status(404).json({ message: 'Data histori Ambil Tidak Ditemukan.' })
      : res.json({
          success: true,
          data: rows
        });

  } catch (error) {
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};

export const getHistoriKembali = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM histori WHERE jenis = ?', ['Kembali']);

    (rows.length <= 0)
      ? res.status(404).json({ message: 'Data histori Ambil Tidak Ditemukan.' })
      : res.json({
          success: true,
          data: rows
        });

  } catch (error) {
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};

export const getHistoriByMonth = async (req, res) => {
  const { year, month } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM histori WHERE YEAR(tanggal) = ? AND MONTH(tanggal) = ?', [year, month]);

    (rows.length <= 0)
      ? res.status(404).json({ message: 'Data histori untuk bulan dan tahun ini Tidak Ditemukan.' })
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
    // Hitung nilai jumlah berdasarkan nilai yang diberikan
    const jumlah = dualima * 25000 + limapuluh * 50000 + seratus * 100000;

    const [rows] = await pool.query(
      'INSERT INTO histori (nama, bagian, tanggal, dualima, limapuluh, seratus, jenis, jumlah) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nama, bagian, tanggal, dualima, limapuluh, seratus, jenis, jumlah]
    );

    res.json({ 
      success: true,
      data: { id: rows.insertId, nama, bagian, tanggal, dualima, limapuluh, seratus, jenis, jumlah }
    });
  } catch (error) {
    return res.status(500).json({ message: 'TERJADI MASALAH.' });
  }
};



export const updateHistori = async (req, res) => {
  const { id } = req.params;
  const { nama, bagian, tanggal, dualima, limapuluh, seratus, jenis } = req.body;

  try {
    // Hitung nilai jumlah yang diperbarui berdasarkan nilai yang diberikan
    const jumlah = dualima * 25000 + limapuluh * 50000 + seratus * 100000;

    const [result] = await pool.query(
      'UPDATE histori SET nama=IFNULL(?, nama), bagian=IFNULL(?, bagian), tanggal=IFNULL(?, tanggal), dualima=IFNULL(?, dualima), limapuluh=IFNULL(?, limapuluh), seratus=IFNULL(?, seratus), jenis=IFNULL(?, jenis), jumlah=? WHERE id=?',
      [nama, bagian, tanggal, dualima, limapuluh, seratus, jenis, jumlah, id]
    );

    const [rows] = await pool.query('SELECT * FROM histori WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'Data histori Tidak Ditemukan.' })
      : res.json({ 
        success: true,
        data: rows[0]
      });
  } catch (error) {
    return res.status(500).json({ message: 'TERJADI MASALAH.' });
  }
};


export const deleteHistori = async (req, res) => {
  const { id } = req.params;

  try {
    const [historiRows] = await pool.query('SELECT * FROM histori WHERE id=?', [id]);
    if (historiRows.length <= 0) {
      return res.status(404).json({ message: 'Data histori Tidak Ditemukan.' });
    }

    const histori = historiRows[0];
    if (histori.jenis === 'Ambil') {
      // Jika jenis adalah 'Ambil', cek voucher dengan tanggal dan data yang cocok
      const [voucherRows] = await pool.query('SELECT * FROM voucher WHERE nama=? AND bagian=? AND tanggal_pengambilan=?', [histori.nama, histori.bagian, histori.tanggal]);
      if (voucherRows.length > 0) {
        const voucher = voucherRows[0];
        if (voucher.tanggal_pengembalian === null) {
          // Hapus voucher jika tanggal_pengembalian masih null
          await pool.query('DELETE FROM voucher WHERE id=?', [voucher.id]);
        }
      }
    }

    const [result] = await pool.query('DELETE FROM histori WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'Data histori Tidak Ditemukan.' })
      : res.json({ success: true });

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};

