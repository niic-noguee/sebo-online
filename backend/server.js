require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/api/livros', async (req, res) => {
  try {
    const sql = `
      SELECT L.id, L.titulo, L.preco, L.url_capa, A.nome as autor_nome
      FROM Livros L INNER JOIN Autores A ON L.autor_id = A.id`;
    
    const result = await pool.query(sql);
    res.json({ message: "success", data: result.rows });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao buscar livros." });
  }
});

app.get('/api/livros/:id', async (req, res) => {
    try {
      const sql = `
          SELECT L.*, A.nome as autor_nome, A.biografia as autor_biografia
          FROM Livros L INNER JOIN Autores A ON L.autor_id = A.id
          WHERE L.id = $1`;
      
      const result = await pool.query(sql, [req.params.id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Livro não encontrado." });
      }
      
      res.json({ message: "success", data: result.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Erro ao buscar o livro." });
    }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});