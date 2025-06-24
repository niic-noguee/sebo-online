document.addEventListener('DOMContentLoaded', function() {
    const apiUrlBase = 'http://localhost:8080/api/livros';
    const livrosContainer = document.getElementById('livros-container');
    
    // --- ELEMENTOS DO FORMULÁRIO DE BUSCA ---
    const searchForm = document.querySelector('.search-bar');
    const searchInput = searchForm.querySelector('input[type="search"]');

    // --- ELEMENTOS E LÓGICA DO CARROSSEL ---
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    // A variável 'livrosContainer' também serve como a "pista" (track) do carrossel.

    prevButton.addEventListener('click', () => {
        // Rola a pista para a esquerda
        livrosContainer.scrollBy({ left: -350, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        // Rola a pista para a direita
        livrosContainer.scrollBy({ left: 350, behavior: 'smooth' });
    });


    // --- FUNÇÕES PRINCIPAIS ---

    // Função para buscar livros da API (com ou sem termo de busca)
    async function fetchLivros(searchTerm = "") {
        let url = apiUrlBase;
        if (searchTerm) {
            url = `${apiUrlBase}/buscar?termo=${encodeURIComponent(searchTerm)}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar Livros.');
            }
            const data = await response.json();
            displayLivros(data);
        } catch (error) {
            livrosContainer.innerHTML = `<p>Não foi possível carregar os livros.</p>`;
            console.error('Falha na requisição:', error);
        }
    }

    // Função para exibir os livros no container
    function displayLivros(livros) {
        if (!Array.isArray(livros)) {
            console.error("Erro: A resposta da API não é um array.", livros);
            livrosContainer.innerHTML = '<p>Erro ao processar os dados dos livros.</p>';
            return;
        }

        if (livros.length === 0) {
            livrosContainer.innerHTML = '<p>Nenhum livro encontrado para esta busca.</p>';
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

    // --- EVENTOS INICIAIS ---

    // Evento de submit do formulário de busca
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const searchTerm = searchInput.value.trim(); 
        fetchLivros(searchTerm);
    });

    fetchLivros(); 
});