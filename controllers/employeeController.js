const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.174.62',
  database: 'taxonomy',
  password: 'postgres',
  port: 5432,
});

// GET all employees
const getAllEmployees = (req, res) => {
  pool.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
    } else {
      res.json(result.rows);
    }
  });
};

// GET a specific employee by ID
const getEmployeeById = (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM employees WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
    } else {
      if (result.rows.length === 0) {
        res.status(404).send('Employee not found');
      } else {
        res.json(result.rows[0]);
      }
    }
  });
};

// POST a new employee
const createEmployee = (req, res) => {
  const { name, position } = req.body;

  pool.query(
    'INSERT INTO employees (name, position) VALUES ($1, $2) RETURNING *',
    [name, position],
    (err, result) => {
      if (err) {
        console.error('Error inserting data', err);
        res.status(500).send('Error inserting data');
      } else {
        res.json(result.rows[0]);
      }
    }
  );
};

// PUT (update) an existing employee
const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, position } = req.body;

  pool.query(
    'UPDATE employees SET name = $1, position = $2 WHERE id = $3 RETURNING *',
    [name, position, id],
    (err, result) => {
      if (err) {
        console.error('Error updating data', err);
        res.status(500).send('Error updating data');
    } else {
        if (result.rows.length === 0) {
          res.status(404).send('Employee not found');
        } else {
          res.json(result.rows[0]);
        }
      }
    }
  );
};

// DELETE an employee
const deleteEmployee = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id], (err, result) => {
    if (err) {
      console.error('Error deleting data', err);
      res.status(500).send('Error deleting data');
    } else {
      if (result.rows.length === 0) {
        res.status(404).send('Employee not found');
      } else {
        res.json(result.rows[0]);
      }
    }
  });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
