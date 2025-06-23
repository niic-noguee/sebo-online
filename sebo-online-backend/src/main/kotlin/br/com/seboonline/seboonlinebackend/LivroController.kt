package br.com.seboonline.seboonlinebackend

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = ["*"]) 
class LivroController(private val livroRepository: LivroRepository) {

    // Listar todos os livros
    @GetMapping
    fun listarLivros(): List<Livro> {
        return livroRepository.findAll()
    }

    // Buscar um livro por ID
    @GetMapping("/{id}")
    fun buscarLivroPorId(@PathVariable id: Long): ResponseEntity<Livro> {
        return livroRepository.findById(id)
            .map { livro -> ResponseEntity.ok(livro) }
            .orElse(ResponseEntity.notFound().build())
    }
}