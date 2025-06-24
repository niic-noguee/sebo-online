package br.com.seboonline.seboonlinebackend

import org.springframework.data.jpa.repository.JpaRepository

interface LivroRepository : JpaRepository<Livro, Long> {
    
    // Encontra livros cujo título contém a string de busca
    fun findByTituloContainingIgnoreCase(titulo: String): List<Livro>
}