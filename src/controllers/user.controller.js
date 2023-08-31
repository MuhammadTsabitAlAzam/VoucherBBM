import { pool } from '../db/db.js';

export const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user');

    (rows.length <= 0)
      ? res.status(404).json({ message: 'Data User Tidak Ditemukan.' })
      : res.json({ 
          success: true,
          data: rows
        });
  } catch (error) {
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      'INSERT INTO user (username, password) VALUES (?, ?)',
      [ username, password]
    );

    res.json({ 
      success: true,
      data: { id: rows.insertId,  username, password }
    });
  } catch (error) {
    return res.status(500).json({ message: 'TERJADI MASALAH.' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM user WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'Data user Tidak Ditemukan.' })
      : res.json({ success: true });

  } catch (error) {
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};
