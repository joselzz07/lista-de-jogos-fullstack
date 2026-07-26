const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const userExists = await User.findByEmail(email);
    if (userExists) return res.status(400).json({ error: 'E-mail já cadastrado.' });

    const hash = await bcrypt.hash(senha, 10);
    const newUser = await User.create(nome, email, hash);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(">>> ERRO NO REGISTER:", err); // Exibe o erro real no terminal do VS Code
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas.' });

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ error: 'Credenciais inválidas.' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
  } catch (err) {
    console.error(">>> ERRO NO LOGIN:", err);
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
};