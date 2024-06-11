// auth.js

document.getElementById('show-register').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-password').value;

    // Recupera usuários cadastrados do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o usuário existe e a senha está correta
    const usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
    if (usuario) {
        window.location.href = 'tasks.html';  // Certifique-se de que tasks.html está no mesmo diretório
    } else {
        const loginError = document.getElementById('login-error');
        loginError.textContent = 'Login inválido';
        loginError.style.display = 'block';
    }
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const senha = document.getElementById('register-password').value;

    // Recupera usuários cadastrados do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o usuário já existe
    const usuarioExiste = usuarios.some(usuario => usuario.email === email);
    if (usuarioExiste) {
        const registerError = document.getElementById('register-error');
        registerError.textContent = 'Usuário já cadastrado';
        registerError.style.display = 'block';
    } else {
        // Adiciona novo usuário
        usuarios.push({ email, senha });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuário cadastrado com sucesso!');
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    }
});
