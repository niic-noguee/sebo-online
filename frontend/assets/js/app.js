document.addEventListener('DOMContentLoaded', function() {
    const livrosContainer = document.getElementById('livros-container');
    const apiUrl = 'http://localhost:3000/api/livros'; 

    // Buscar livros 
    async function fetchLivros() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados da API.');
            }
            const data = await response.json();
            displayLivros(data.data);
        } catch (error) {
            livrosContainer.innerHTML = `<p>${error.message}</p>`;
            console.error('Falha na requisição:', error);
        }
    }

    // Exibir livros 
    function displayLivros(livros) {
        if (livros.length === 0) {
            livrosContainer.innerHTML = '<p>Nenhum livro encontrado.</p>';
            return;
        }

        livrosContainer.innerHTML = ''; 

        livros.forEach(livro => {
            const livroCard = document.createElement('div');
            livroCard.className = 'livro-card';
            // Lembrar de fazer página para quando clicar no card redirecionar para uma página de detalhes
            livroCard.innerHTML = `
                <img src="${livro.url_capa}" alt="Capa do livro ${livro.titulo}">
                <h3>${livro.titulo}</h3>
                <p class="autor">${livro.autor_nome}</p>
                <p class="preco">R$ ${Number(livro.preco).toFixed(2)}</p>
            `;
            livrosContainer.appendChild(livroCard);
        });
    }

    fetchLivros();
});