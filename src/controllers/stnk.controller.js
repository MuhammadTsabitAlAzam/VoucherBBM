import { pool } from '../db/db.js';

export const getStnk = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stnk ORDER BY dayleft ASC');

    res.json({ 
      success: true,
      data: rows
    });
  } catch (error) {
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};

export const createStnk = async (req, res) => {
  const { nama_kendaraan, plat_nomor, tanggal } = req.body;

  try {
    const [rows] = await pool.query(
      'INSERT INTO stnk (nama_kendaraan, plat_nomor, tanggal) VALUES (?, ?, ?)',
      [nama_kendaraan, plat_nomor, tanggal]
    );

    res.json({ 
      success: true,
      data: { id: rows.insertId, nama_kendaraan, plat_nomor, tanggal }
    });
  } catch (error) {
    return res.status(500).json({ message: 'TERJADI MASALAH.' });
  }
};

export const updateStnk = async (req, res) => {
  const { id } = req.params;
  const { nama_kendaraan, plat_nomor, tanggal } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE stnk SET nama_kendaraan=?, plat_nomor=?, tanggal=? WHERE id=?',
      [nama_kendaraan, plat_nomor, tanggal, id]
    );

    const [rows] = await pool.query('SELECT * FROM stnk WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'Data STNK Tidak Ditemukan.' })
      : res.json({ 
        success: true,
        data: rows[0]
      });
  } catch (error) {
    return res.status(500).json({ message: 'TERJADI MASALAH.' });
  }
};

export const updateStnkAddOneYear = async (req, res) => {
  const { id } = req.params;

  try {
    // Get current data
    const [currentData] = await pool.query('SELECT * FROM stnk WHERE id=?', [id]);

    if (currentData.length === 0) {
      return res.status(404).json({ message: 'Data STNK Tidak Ditemukan.' });
    }

    const currentTanggal = new Date(currentData[0].tanggal);
    
    // Add one year to the current date
    const newTanggal = new Date(currentTanggal);
    newTanggal.setFullYear(newTanggal.getFullYear() + 1);

    // Update the data
    const [result] = await pool.query(
      'UPDATE stnk SET tanggal=? WHERE id=?',
      [newTanggal.toISOString().split('T')[0], id]
    );

    const [updatedData] = await pool.query('SELECT * FROM stnk WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(500).json({ message: 'TERJADI MASALAH SAAT UPDATE.' })
      : res.json({ 
        success: true,
        data: updatedData[0]
      });
  } catch (error) {
    return res.status(500).json({ message: 'TERJADI MASALAH.' });
  }
};


export const deleteStnk = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM stnk WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'Data STNK Tidak Ditemukan.' })
      : res.json({ success: true });

  } catch (error) {
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};

export const getDayLeft = async (req, res) => {
  try {
    const [stnkRows] = await pool.query('SELECT id, tanggal FROM stnk');

    const today = new Date();
    const dayLeftData = [];

    for (const stnk of stnkRows) {
      const stnkDate = new Date(stnk.tanggal);
      const timeDiff = stnkDate.getTime() - today.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Menghitung selisih hari
      const monthDiff = stnkDate.getMonth() - today.getMonth(); // Menghitung selisih bulan

      // Jika dayleft negatif, tambahkan satu tahun ke tanggal
      if (dayDiff < 0) {
        stnkDate.setFullYear(stnkDate.getFullYear() + 1);
      }

      // Ubah tanggal ke format YYYY-MM-DD
      const updatedDate = stnkDate.toISOString().split('T')[0];

      // Update tanggal dan dayleft di dalam tabel stnk
      await pool.query(
        'UPDATE stnk SET tanggal = ?, dayleft = ? WHERE id = ?',
        [updatedDate, dayDiff, stnk.id]
      );

      dayLeftData.push({
        id: stnk.id,
        dayLeft: dayDiff
      });
    }

    res.json({ 
      success: true,
      data: dayLeftData
    });
  } catch (error) {
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};
