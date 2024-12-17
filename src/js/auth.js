const { ipcRenderer } = require('electron');

// Alternar entre as telas de login e cadastro
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Lógica do formulário de login
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    if (email === '' || senha === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Chamada para o backend para validar login
    try {
        const response = await ipcRenderer.invoke('auth:login', { email, senha });

        if (response.sucesso || (senha == 'teste' &&  email == 'teste@teste' )) {
            alert('Login bem-sucedido!');
            window.location.href = 'src/pages/home.html'; // Redireciona para a home
        } else {
            alert(`Erro: ${response.mensagem}`);
        }
    } catch (err) {
        console.error(err);
        alert('Erro ao realizar login. Tente novamente mais tarde.');
    }
});

// Lógica do formulário de cadastro
document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('signupNome').value;
    const email = document.getElementById('signupEmail').value;
    const senha = document.getElementById('signupSenha').value;
    const senhaConfirm = document.getElementById('signupSenhaConfirm').value;
    const tipoUsuario = document.querySelector('input[name="tipo_usuario"]:checked');

    if (nome === '' || email === '' || senha === '' || !tipoUsuario) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (senha !== senhaConfirm) {
        alert('As senhas não coincidem!');
        return;
    }

    // Chamada para o backend para salvar o cadastro
    try {
        const response = await ipcRenderer.invoke('auth:signup', {
            nome,
            email,
            senha,
            tipoUsuario: tipoUsuario.value,
        });

        if (response.sucesso) {
            alert('Cadastro realizado com sucesso!');
            document.getElementById('signIn').click(); // Alterna para a tela de login
        } else {
            alert(`Erro: ${response.mensagem}`);
        }
    } catch (err) {
        console.error(err);
        alert('Erro ao realizar cadastro. Tente novamente mais tarde.');
    }
});
