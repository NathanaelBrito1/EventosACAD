const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'nome_do_banco_de_dados'
});

// Conexão com o banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados');
});

// Middleware para tratar dados JSON
app.use(express.json());

// Rota para recuperar eventos do banco de dados
app.get('/eventos', (req, res) => {
    // Consulta ao banco de dados para recuperar eventos
    connection.query('SELECT * FROM eventos', (err, results) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            res.status(500).send('Erro ao consultar banco de dados');
            return;
        }
        res.json(results); // Enviar os eventos como resposta
    });
});

// Rota para lidar com o login do usuário
app.post('/login', (req, res) => {
    // Implemente a lógica de autenticação aqui
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
