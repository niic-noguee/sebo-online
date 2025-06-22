require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTablesQuery = `
  DROP TABLE IF EXISTS Livros;
  DROP TABLE IF EXISTS Autores;

  CREATE TABLE Autores (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      biografia TEXT
  );

  CREATE TABLE Livros (
      id SERIAL PRIMARY KEY,
      titulo TEXT NOT NULL,
      isbn TEXT,
      preco NUMERIC(10, 2) NOT NULL,
      estado_conservacao TEXT,
      url_capa TEXT,
      autor_id INTEGER REFERENCES Autores(id)
  );
`;

async function populateDB() {
  let client;
  try {
    client = await pool.connect();
    console.log("Conectado para popular o banco!");
    await client.query(createTablesQuery);
    console.log("Tabelas 'Autores' e 'Livros' criadas com sucesso.");

    const insertAutores = `
      INSERT INTO Autores (nome, biografia) VALUES
      ('Machado de Assis', 'Um dos maiores escritores da literatura brasileira.'),
      ('Clarice Lispector', 'Escritora e jornalista, uma das figuras mais importantes do modernismo.')
      RETURNING id;
    `;
    const autoresResult = await client.query(insertAutores);
    const machadoId = autoresResult.rows[0].id;
    const clariceId = autoresResult.rows[1].id;
    console.log("Autores inseridos.");

    const insertLivros = `
      INSERT INTO Livros (titulo, preco, url_capa, autor_id) VALUES
      ('Dom Casmurro', 25.50, 'https://m.media-amazon.com/images/I/81eVA5oF48L._AC_UF1000,1000_QL80_.jpg', $1),
      ('Memórias Póstumas de Brás Cubas', 22.00, 'https://m.media-amazon.com/images/I/41z2Zk21H3L.jpg', $1),
      ('A Hora da Estrela', 35.00, 'https://m.media-amazon.com/images/I/81M20v34Y9L._AC_UF1000,1000_QL80_.jpg', $2)
    `;
    await client.query(insertLivros, [machadoId, clariceId]);
    console.log("Livros inseridos.");

  } catch (err) {
    console.error('Erro ao popular o banco de dados:', err.stack);
  } finally {
    if (client) {
      client.release();
      console.log("Conexão liberada.");
    }
    await pool.end();
  }
}

populateDB();