const pool = require('../config/db');

const User = {
  findByEmail: async (email) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return res.rows[0];
  },
  create: async (nome, email, senhaHash) => {
    const res = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senhaHash]
    );
    return res.rows[0];
  }
};

module.exports = User;