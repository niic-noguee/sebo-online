document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:8080/api/livros'; 
    const livrosContainer = document.getElementById('livros-container');

    // Buscar livros
    async function fetchLivros() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ao buscar livros.');
            }
            const data = await response.json(); 
            displayLivros(data); 
        } catch (error) {
            livrosContainer.innerHTML = `<p>Não foi possível carregar os livros. Verifique se o back-end está rodando.</p>`;
            console.error('Falha na requisição:', error);
        }
    }

    // Criar e mostrar os cards dos livros no HTML
    function displayLivros(livros) {
        if (!Array.isArray(livros)) {
            console.error("Erro: A resposta da API não é um array.", livros);
            livrosContainer.innerHTML = '<p>Erro ao processar os dados dos livros.</p>';
            return;
        }

        if (livros.length === 0) {
            livrosContainer.innerHTML = '<p>Nenhum livro encontrado.</p>';
            return;
        }

        livrosContainer.innerHTML = '';

        livros.forEach(livro => {
            const livroCard = document.createElement('div');
            livroCard.className = 'livro-card';
            
            livroCard.innerHTML = `
                <img src="${livro.urlCapa}" alt="Capa do livro ${livro.titulo}">
                <h3>${livro.titulo}</h3>
                <p class="autor">${livro.autor.nome}</p> 
                <p class="preco">R$ ${Number(livro.preco).toFixed(2)}</p>
            `;
            livrosContainer.appendChild(livroCard);
        });
    }

    fetchLivros();
});