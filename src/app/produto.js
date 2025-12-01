const formProduto = document.getElementById('formProduto');
const listaProdutos = document.getElementById('lista-produtos');

// FUNÇÃO 1: Carregar produtos da API
async function carregarProdutos() {
    try {
        const resposta = await fetch('http://localhost:3000/produtos');
        const produtos = await resposta.json();

        // Limpa a lista antes de adicionar (para não duplicar)
        listaProdutos.innerHTML = '';

        // Para cada produto vindo da API, cria o HTML
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'card-produto'; // Usando sua classe CSS corrigida

            card.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h2>${produto.nome}</h2>
                <p style="color: white; font-weight: bold;">R$ ${produto.preco.toFixed(2)}</p>
                <button style="margin-top: 10px; padding: 8px; background: #fff; border: none; border-radius: 5px; cursor: pointer;">Comprar</button>
            `;

            listaProdutos.appendChild(card);
        });

    } catch (erro) {
        console.error('Erro ao buscar produtos:', erro);
        listaProdutos.innerHTML = '<p style="color: white">Erro ao carregar produtos.</p>';
    }
}

// FUNÇÃO 2: Cadastrar novo produto
formProduto.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('prodNome').value;
    const imagem = document.getElementById('prodImg').value;
    const preco = document.getElementById('prodPreco').value;

    const novoProduto = {
        nome: nome,
        imagem: imagem,
        preco: preco
    };

    try {
        const resposta = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoProduto)
        });

        if (resposta.ok) {
            alert('Produto cadastrado!');
            formProduto.reset(); // Limpa o formulário
            carregarProdutos(); // Recarrega a lista para mostrar o novo item
        } else {
            alert('Erro ao cadastrar.');
        }

    } catch (erro) {
        console.error('Erro:', erro);
    }
});

// Executa o carregamento assim que a página abre
carregarProdutos();