package br.com.seboonline.seboonlinebackend

import org.springframework.data.jpa.repository.JpaRepository

interface LivroRepository : JpaRepository<Livro, Long> {
}