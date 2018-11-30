const axios = require("axios");
const keys = require("../_secrets/keys");
const { authenticate } = require("./middlewares");
const bcrypt = require("bcryptjs");
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const jwt = require("jsonwebtoken");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
  server.get("/", test);
};

// generate jwt token
// generate JWT token
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: ["marketing", "development"]
  };

  const secret = keys.jwtKey;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);

  creds.password = hash;

  db("users")
    .insert(creds)
    .then(ids => {
      const token = generateToken(ids);
      res.status(201).json({ id: ids[0], token });
    })
    .catch(err => res.status(500).json(err));
}
function test(req, res) {
  res.json({ message: "api up" });
}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password)) {
        const token = generateToken(user);

        res.status(200).json({ id: user.id, token });
      } else {
        res.status(401().json({ message: "you shall not pass" }));
      }
    });
}

function getJokes(req, res) {
  axios
    .get("https://safe-falls-22549.herokuapp.com/random_ten")
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
