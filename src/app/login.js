document.getElementById('formLogin').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Bem-vindo(a) ' + result.nome + '!');
            window.location.href = '/src/app/app.index.html'; // Redireciona para home
        } else {
            alert(result.mensagem); // Exibe "E-mail ou senha incorretos"
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro de conexão com o servidor.');
    }
});