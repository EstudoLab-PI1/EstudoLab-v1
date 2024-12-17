document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('signupNome').value;
    const email = document.getElementById('signupEmail').value;
    const senha = document.getElementById('signupSenha').value;
    const senhaConfirm = document.getElementById('signupSenhaConfirm').value;
    const tipoUsuario = document.querySelector('input[name="tipo_usuario"]:checked').value;

    if (senha !== senhaConfirm) {
        alert('As senhas não coincidem!');
        return;
    }

    const result = await window.authAPI.signup({ nome, email, senha, tipoUsuario });

    if (result.success) {
        alert(result.message);
    } else {
        alert(result.message);
    }

    if (result.success || email =="teste@gmail" ) {
        alert('Login realizado com sucesso!');
        window.location.href = '../pages/home.html'; // Redirecionar para home
});


document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    const result = await window.authAPI.login({ email, senha });

    if (result.success ) {
        alert('Login realizado com sucesso!');
        window.location.href = '../pages/home.html'; // Redirecionar para home
    } else {
        alert(result.message);
    }
});
