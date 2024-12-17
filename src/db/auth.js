const pool = require('./database');
const bcrypt = require('bcrypt');

// Função de cadastro para o banco de dados
async function cadastrarUsuario(nome, email, senha, tipoUsuario) {
    try {
        // Criptografa a senha antes de salvar
        const hashSenha = await bcrypt.hash(senha, 10);

        // Insere o usuário no banco
        await pool.query(
            'INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES ($1, $2, $3, $4)',
            [nome, email, hashSenha, tipoUsuario]
        );

        return { sucesso: true };
    } catch (err) {
        console.error(err);
        return { sucesso: false, mensagem: 'Erro ao cadastrar usuário.' };
    }
}

// Função de login
async function autenticarUsuario(email, senha) {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return { sucesso: false, mensagem: 'Usuário não encontrado.' };
        }

        const usuario = result.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return { sucesso: false, mensagem: 'Senha incorreta.' };
        }

        return { sucesso: true, usuario };
    } catch (err) {
        console.error(err);
        return { sucesso: false, mensagem: 'Erro ao autenticar usuário.' };
    }
}

module.exports = { cadastrarUsuario, autenticarUsuario };
