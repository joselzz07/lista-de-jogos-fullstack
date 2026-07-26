const Game = require('../models/gameModel');

exports.getGames = async (req, res) => {
  try {
    const games = await Game.getAllByUser(req.user.id);
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar lista de jogos.' });
  }
};

exports.createGame = async (req, res) => {
  const { nome, plataforma, status } = req.body;
  if (!nome || !plataforma) {
    return res.status(400).json({ error: 'Nome e plataforma são obrigatórios.' });
  }

  try {
    const newGame = await Game.create(nome, plataforma, status, req.user.id);
    res.status(201).json(newGame);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar jogo.' });
  }
};

exports.updateGame = async (req, res) => {
  const { id } = req.params;
  const { nome, plataforma, status } = req.body;

  try {
    const updated = await Game.update(id, nome, plataforma, status, req.user.id);
    if (!updated) return res.status(404).json({ error: 'Jogo não encontrado.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar jogo.' });
  }
};

exports.deleteGame = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Game.delete(id, req.user.id);
    if (!deleted) return res.status(404).json({ error: 'Jogo não encontrado.' });
    res.json({ message: 'Jogo removido da lista.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar jogo.' });
  }
};