const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

// Middleware para lidar com JSON no corpo da requisição
app.use(express.json());

// Configuração da conexão com o banco de dados
const client = new Client({
  host: 'localhost',    // O host do seu banco de dados
  port: 5432,           // A porta padrão do PostgreSQL
  user: 'postgres',  // O nome do usuário do banco de dados
  password: 'postgres',// A senha do seu usuário do banco de dados
  database: 'meu_app' // O nome do banco de dados
});

// Conectar ao PostgreSQL
client.connect();

client.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.log('Erro na consulta:', err.stack);
    } else {
      console.log('Conexão bem-sucedida:', res.rows);
    }
  });
  

// Rota POST para cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: 'Todos os campos são obrigatórios' });
  }

  // Inserir o usuário no banco de dados
  try {
    const result = await client.query(
      'INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3) RETURNING id',
      [nome, email, senha]
    );
    
    const idUsuario = result.rows[0].id;
    res.status(200).json({ sucesso: true, mensagem: `Usuário cadastrado com sucesso! ID: ${idUsuario}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar usuário. Tente novamente mais tarde.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
