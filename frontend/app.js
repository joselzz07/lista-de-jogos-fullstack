const API_URL = 'https://lista-de-jogos-backend.onrender.com';
let modoCadastro = false;

function alternarModoAuth(e) {
  e.preventDefault();
  modoCadastro = !modoCadastro;
  document.getElementById('form-titulo').innerText = modoCadastro ? 'Cadastro' : 'Login';
  document.getElementById('campo-nome').style.display = modoCadastro ? 'block' : 'none';
  document.getElementById('btn-auth').innerText = modoCadastro ? 'Cadastrar' : 'Entrar';
  document.getElementById('link-alternar').innerText = modoCadastro ? 'Já tem conta? Faça Login' : 'Não tem conta? Cadastre-se';
}

async function tratarAutenticacao(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value;
  const senha = document.getElementById('auth-senha').value;
  const nome = document.getElementById('auth-nome').value;

  const endpoint = modoCadastro ? '/auth/register' : '/auth/login';
  const body = modoCadastro ? { nome, email, senha } : { email, senha };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (res.ok) {
      if (modoCadastro) {
        alert('Cadastro realizado! Faça login.');
        alternarModoAuth(e);
      } else {
        localStorage.setItem('token', data.token);
        carregarAplicacao();
      }
    } else {
      alert(data.error || 'Erro no processo.');
    }
  } catch (err) {
    alert('Erro de conexão com o servidor.');
  }
}

function logout() {
  localStorage.removeItem('token');
  location.reload();
}

async function fetchAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  options.headers = { ...options.headers, 'Authorization': `Bearer ${token}` };

  const res = await fetch(url, options);

  if (res.status === 401 || res.status === 403) {
    alert('Sessão expirada ou não autorizada. Faça login novamente.');
    logout();
    return null;
  }
  return res;
}

async function carregarJogos() {
  const res = await fetchAuth(`${API_URL}/games`);
  if (!res) return;

  const jogos = await res.json();
  const container = document.getElementById('jogos-container');
  container.innerHTML = '';

  if (jogos.length === 0) {
    container.innerHTML = '<p class="text-center text-muted">Nenhum jogo na sua lista.</p>';
    return;
  }

  jogos.forEach(jogo => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card bg-secondary text-light h-100 shadow-sm">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title">${jogo.nome}</h5>
              <p class="card-text mb-2"><span class="badge bg-info text-dark">${jogo.plataforma}</span></p>
              <p class="card-text"><small class="text-warning">Status: ${jogo.status}</small></p>
            </div>
            <div class="mt-3">
              <button onclick="removerJogo(${jogo.id})" class="btn btn-danger btn-sm w-100">Remover Jogo</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

async function adicionarJogo(e) {
  e.preventDefault();
  const nome = document.getElementById('nome-jogo').value;
  const plataforma = document.getElementById('plataforma-jogo').value;

  const res = await fetchAuth(`${API_URL}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, plataforma })
  });

  if (res && res.ok) {
    document.getElementById('form-jogo').reset();
    carregarJogos();
  }
}

async function removerJogo(id) {
  if (!confirm('Deseja excluir este jogo?')) return;
  const res = await fetchAuth(`${API_URL}/games/${id}`, { method: 'DELETE' });
  if (res && res.ok) carregarJogos();
}

function carregarAplicacao() {
  if (localStorage.getItem('token')) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    carregarJogos();
  }
}

carregarAplicacao();