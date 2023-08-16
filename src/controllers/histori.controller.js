import { pool } from '../db/db.js';
import PDFDocument from 'pdfkit';

export const getHistori = async (req, res) => {
  const { jenis, tahun, bulan } = req.query;

  let query = 'SELECT * FROM histori';

  const queryParams = [];
  if (jenis) {
    query += ' WHERE jenis = ?';
    queryParams.push(jenis);
  }

  if (tahun) {
    if (queryParams.length > 0) {
      query += ' AND';
    } else {
      query += ' WHERE';
    }
    query += ' YEAR(tanggal) = ?';
    queryParams.push(tahun);
  }

  if (bulan) {
    if (queryParams.length > 0) {
      query += ' AND';
    } else {
      query += ' WHERE';
    }
    query += ' MONTH(tanggal) = ?';
    queryParams.push(bulan);
  }

  try {
    const [rows] = await pool.query(query, queryParams);

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

export const downloadPDF = async (req, res) => {
  const { jenis, tahun, bulan } = req.query;

  let query = 'SELECT * FROM histori';

  const queryParams = [];
  if (jenis) {
    query += ' WHERE jenis = ?';
    queryParams.push(jenis);
  }

  if (tahun) {
    if (queryParams.length > 0) {
      query += ' AND';
    } else {
      query += ' WHERE';
    }
    query += ' YEAR(tanggal) = ?';
    queryParams.push(tahun);
  }

  if (bulan) {
    if (queryParams.length > 0) {
      query += ' AND';
    } else {
      query += ' WHERE';
    }
    query += ' MONTH(tanggal) = ?';
    queryParams.push(bulan);
  }

  try {
    const [rows] = await pool.query(query, queryParams);

    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Data histori Tidak Ditemukan.' });
    }

    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename="laporan.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(res);

    // Create a table for the data
    const table = {
      headers: ['No', 'Nama', 'Bagian', 'Tanggal', 'Jenis', 'Jumlah'],
      rows: [],
    };

    let totalJumlah = 0;

    rows.forEach((histori, index) => {
      const rowData = [
        index + 1,
        histori.nama,
        histori.bagian,
        histori.tanggal,
        histori.jenis,
        histori.jumlah,
      ];

      table.rows.push(rowData);
      totalJumlah += histori.jumlah;
    });

    // Create the table layout
    pdfDoc.table(table, {
      prepareHeader: () => pdfDoc.fontSize(12),
      prepareRow: (row, i) => pdfDoc.fontSize(10),
      // Add more styling options here if needed
    });

    pdfDoc.moveDown(1);
    pdfDoc.fontSize(12).text('Total Jumlah:', { underline: true });
    pdfDoc.fontSize(10).text(`Total: ${totalJumlah}`);

    pdfDoc.end();

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

