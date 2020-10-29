const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  database: process.env.USER,
  password: process.env.PASSWORD,
  port: 5432,
});

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  var firstName = "";
  var lastName = "";
  const { email, gender, address, age } = request.body;
  if (request.body.firstName) firstName = request.body.firstName;
  if (request.body.lastName) lastName = request.body.lastName;
  const name = `${firstName} ${lastName}`;
  const intAge = parseInt(age);
  pool.query(
    "INSERT INTO users (name, email, gender, age, address) VALUES ($1, $2, $3, $4, $5)",
    [name, email, gender, intAge, address],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  var firstName = "";
  var lastName = "";
  const { email, gender, address, age } = request.body;
  if (request.body.firstName) firstName = request.body.firstName;
  if (request.body.lastName) lastName = request.body.lastName;
  const name = `${firstName} ${lastName}`;
  const intAge = parseInt(age);

  pool.query(
    "UPDATE users SET name = $1, email = $2, age=$3, address=$4, gender=$5 WHERE id = $6",
    [name, email, intAge, address, gender, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
