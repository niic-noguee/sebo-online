package br.com.seboonline.seboonlinebackend

import jakarta.persistence.*

@Entity
@Table(name = "autores")
class Autor(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val nome: String,
    val biografia: String
)