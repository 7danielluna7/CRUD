require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// READ
const getLinks = (req, res) => {
  pool.query('SELECT * FROM links ORDER BY id ASC', (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// CREATE
const createLink = (req, res) => {
  const { name, url } = req.body;
  pool.query('INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *', [name, url], (error, results) => {
    if (error) throw error;
    res.status(201).json(results.rows[0]);
  });
};

// DELETE
const deleteLink = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM links WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    res.status(200).send(`Link deleted with ID: ${id}`);
  });
};

module.exports = { getLinks, createLink, deleteLink };
