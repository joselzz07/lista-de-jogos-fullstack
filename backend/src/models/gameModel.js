const pool = require('../config/db');

const Game = {
  getAllByUser: async (userId) => {
    const res = await pool.query('SELECT * FROM jogos WHERE user_id = $1 ORDER BY id DESC', [userId]);
    return res.rows;
  },
  create: async (nome, plataforma, status, userId) => {
    const res = await pool.query(
      'INSERT INTO jogos (nome, plataforma, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, plataforma, status || 'Na Fila', userId]
    );
    return res.rows[0];
  },
  update: async (id, nome, plataforma, status, userId) => {
    const res = await pool.query(
      'UPDATE jogos SET nome = $1, plataforma = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [nome, plataforma, status, id, userId]
    );
    return res.rows[0];
  },
  delete: async (id, userId) => {
    const res = await pool.query('DELETE FROM jogos WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return res.rows[0];
  }
};

module.exports = Game;