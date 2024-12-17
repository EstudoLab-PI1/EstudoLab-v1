// src/js/login/signup.js
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário para validação

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const repetirSenha = document.getElementById('repetirSenha').value;
    const tipoUsuario = document.querySelector('input[name="tipo_usuario"]:checked');

    // Validações simples
    if (senha !== repetirSenha) {
        alert('As senhas não coincidem! Por favor, tente novamente.');
        return;
    }

    if (!tipoUsuario) {
        alert('Por favor, selecione o tipo de usuário (Professor ou Aluno).');
        return;
    }

    // Redirecionar para a página de login
    window.location.href = 'login.html';
});
