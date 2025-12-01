const express = require('express');
const cors = require('cors');
const app = express();

// Configuração
app.use(cors()); // Permite que seu HTML acesse esse servidor
app.use(express.json()); // Permite ler dados em JSON

// BANCO DE DADOS TEMPORÁRIO (Em memória)
// No futuro, você substituirá isso por conexões SQL (MySQL ou PostgreSQL)
const usuarios = [];

// ROTA 1: CADASTRAR USUÁRIO
// Método POST para receber dados do formulário
app.post('/usuarios', (req, res) => {
    const { nome, sobrenome, cpf, telefone, email, senha } = req.body;

    // Validação simples
    if (!email || !senha || !nome) {
        return res.status(400).json({ mensagem: 'Preencha os campos obrigatórios.' });
    }

    // Verifica se o email já existe
    const usuarioExiste = usuarios.find(user => user.email === email);
    if (usuarioExiste) {
        return res.status(409).json({ mensagem: 'E-mail já cadastrado.' });
    }

    // Cria o novo usuário
    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        sobrenome,
        cpf,
        telefone,
        email,
        senha // OBS: Em produção, nunca salve senhas em texto puro! Pesquise sobre 'bcrypt'.
    };

    usuarios.push(novoUsuario);
    console.log('Usuário cadastrado:', novoUsuario);

    res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
});

// ROTA 2: LOGIN
// Método POST para verificar credenciais
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuario) {
        res.status(200).json({ mensagem: 'Login realizado com sucesso!', nome: usuario.nome });
    } else {
        res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
    }
});

// --- BANCO DE DADOS DE PRODUTOS (Em memória) ---
const produtos = [
    // Vamos deixar alguns pré-cadastrados para não ficar vazio
    {
        id: 1,
        nome: "Camiseta Fiorentina Retrô (1997-1998)",
        imagem: "/src/app/img/fiorentina.png", // Caminho da imagem ou URL da internet
        preco: 199.90
    },
    {
        id: 2,
        nome: "Calça de veludo cotelê Timberland",
        imagem: "/src/app/img/cotele.png",
        preco: 250.00
    }
];

// ROTA 3: LISTAR PRODUTOS (GET)
// O front-end vai chamar essa rota para saber o que exibir na tela
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// ROTA 4: CADASTRAR PRODUTO (POST)
app.post('/produtos', (req, res) => {
    const { nome, imagem, preco } = req.body;

    if (!nome || !imagem || !preco) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const novoProduto = {
        id: produtos.length + 1,
        nome,
        imagem, // Aqui salvaremos a URL da imagem
        preco: parseFloat(preco) // Garante que o preço seja número
    };

    produtos.push(novoProduto);
    console.log('Produto cadastrado:', novoProduto);
    res.status(201).json({ mensagem: "Produto cadastrado com sucesso!" });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

