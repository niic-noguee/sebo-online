package br.com.seboonline.seboonlinebackend

import jakarta.persistence.*

@Entity
@Table(name = "livros")
class Livro(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val titulo: String,
    val preco: java.math.BigDecimal,

    @Column(name = "url_capa")
    val urlCapa: String,

    @ManyToOne
    @JoinColumn(name = "autor_id")
    val autor: Autor
)