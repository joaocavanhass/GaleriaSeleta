// Seleciona o formulário pelo ID que adicionamos
const formulario = document.getElementById('formCadastro');

// Adiciona um "ouvinte" para quando o usuário clicar em "Criar conta"
formulario.addEventListener('submit', async function(event) {
    
    // 1. Previne que a página recarregue (comportamento padrão do HTML)
    event.preventDefault();

    // 2. Captura os valores dos inputs
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // 3. Monta o objeto JSON que a API espera
    // ATENÇÃO: Os nomes das chaves (ex: 'nome', 'email') devem ser iguais aos que sua API/Banco de Dados pede.
    const dadosUsuario = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        telefone: telefone,
        email: email,
        senha: senha
    };

    try {
        // 4. Envia a requisição para a API
        // Substitua a URL abaixo pelo endereço real da sua API (ex: localhost:8080/usuarios)
        const resposta = await fetch('http://localhost:3000/usuarios', {
            method: 'POST', // Método HTTP para criar novos registros
            headers: {
                'Content-Type': 'application/json' // Avisa a API que estamos mandando JSON
            },
            body: JSON.stringify(dadosUsuario) // Transforma o objeto JS em texto JSON
        });

        // 5. Verifica se deu certo
        if (resposta.ok) {
            alert('Cadastro realizado com sucesso!');
            // Redireciona para o login após o sucesso
            window.location.href = '/src/app/app.login.html';
        } else {
            // Se a API retornar erro (ex: email já existe)
            alert('Erro ao cadastrar. Tente novamente.');
            console.error('Erro na API:', await resposta.text());
        }

    } catch (erro) {
        // Erro de conexão (ex: servidor desligado)
        console.error('Erro de conexão:', erro);
        alert('Não foi possível conectar ao servidor.');
    }
});