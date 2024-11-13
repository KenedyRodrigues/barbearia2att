const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Importando o CORS
const bcrypt = require('bcrypt'); // Importando bcrypt para criptografar as senhas
const app = express();
const PORT = 5000;

// Configurando o CORS para permitir requisições de qualquer origem
app.use(cors()); // Permite todas as origens
app.use(bodyParser.json());

// Configurando a conexão com o MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Substitua pelo seu usuário MySQL
  password: '12345678', // Substitua pela sua senha MySQL
  database: 'usuariosdb', // Banco de dados que criamos
  port: 3306
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota POST para registrar um usuário
app.post('/api/usuarios', async (req, res) => {
  const { nome, telefone, senha } = req.body;

  // Verificar se os campos estão preenchidos
  if (!nome || !telefone || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Criptografar a senha antes de salvar
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserir dados na tabela de usuarios
    const query = 'INSERT INTO usuarios (nome, telefone, senha) VALUES (?, ?, ?)';
    
    db.execute(query, [nome, telefone, hashedPassword], (err, results) => {
      if (err) {
        console.error('Erro ao salvar o usuário:', err);
        return res.status(500).json({ message: 'Erro ao salvar o usuário' });
      }

      // Retorna a resposta após salvar o usuário com sucesso
      res.status(201).json({ message: 'Usuário registrado com sucesso!', id: results.insertId });
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota POST para fazer login
app.post('/api/login', async (req, res) => {
  const { telefone, senha } = req.body;

  if (!telefone || !senha) {
    return res.status(400).json({ message: 'Telefone e senha são obrigatórios' });
  }

  const query = 'SELECT * FROM usuarios WHERE telefone = ?';
  
  db.query(query, [telefone], async (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const user = results[0];
    
    const match = await bcrypt.compare(senha, user.senha);
    
    if (!match) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    return res.status(200).json({ message: 'Login bem-sucedido', nome: user.nome });
  });
});

app.post('/api/agendar', (req, res) => {
  const { nomeCer, telefoneCer, barbeiroSelecionado, servicosSelecionados, selectedDate, selectedTime } = req.body;

  // Verificação dos dados recebidos
  if (!nomeCer || !telefoneCer || !barbeiroSelecionado || !servicosSelecionados || !selectedDate || !selectedTime) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
  }

  // Simulação de agendamento com sucesso
  res.status(200).json({ message: 'Agendamento realizado com sucesso!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
