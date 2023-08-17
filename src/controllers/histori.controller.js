import { pool } from '../db/db.js';
import PDFDocument from "pdfkit-table";


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
    
    let subtitle = '';
    if (bulan && tahun) {
      const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      subtitle = `${monthNames[parseInt(bulan) - 1]} ${tahun}`;
    } else if (bulan) {
      const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      subtitle = `Bulan ${monthNames[parseInt(bulan) - 1]}`;
    } else if (tahun) {
      subtitle = `Tahun ${tahun}`;
    }
    
    let title = 'Laporan Voucher BPBD DIY';
    if (jenis == 'Ambil'){title = 'Laporan Pengambilan Voucher BPBD DIY'}
    else if (jenis == 'Kembali'){title = 'Laporan Pengembalian Voucher BPBD DIY'}
    
    let doc = new PDFDocument({ margin: 30, size: 'A4' });
    const table = {
      title: title,
      subtitle: subtitle,
      headers: [
        { label: "No", property: 'no', width: 60, renderer: null },
        { label: "Nama", property: 'nama', width: 100, renderer: null }, 
        { label: "Bagian", property: 'bagian', width: 150, renderer: null }, 
        { label: "Tanggal", property: 'tanggal', width: 100, renderer: null }, 
        { label: "Jumlah", property: 'jumlah', width: 80, renderer: null }, 
        { label: "Jenis", property: 'jenis', width: 43, renderer: null},
      ],
      // complex data
      datas: rows.map((histori, index) => ({
        no: index + 1,
        nama: histori.nama,
        bagian: histori.bagian,
        tanggal: histori.tanggal,
        jumlah: histori.jumlah,
        jenis: histori.jenis,
      })),
    };

    doc.table(table, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        doc.font("Helvetica").fontSize(8);
        indexColumn === 0 && doc.addBackground(rectRow, 'white', 0.15);
      },
    });

    doc.pipe(res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=test.pdf',})
      );
    // done!
    doc.end();

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

