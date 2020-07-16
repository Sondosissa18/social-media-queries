const { Client } = require("pg");
const express = require("express");

const app = express();
app.use(express.json());
// creates postgresql client
const client = new Client({
  database: "social-media",
});

// put route handlers here

// GET /users
app.get("/users", (req, res) => {
  client.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.send(result.rows);
  });
});
// POST /users
app.post("/users", (req, res) => {
  const text = "INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *";
  client.query(text, [req.body.username, req.body.bio], (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.send(result.rows[0]);
  });
});

// GET /users/:id with posts
app.get("/users/:id", async (req, res) => {
  try {
    const user = await client.query("select * from users WHERE id = $1;", [req.params.id]);
    const posts = await client.query("select * from posts WHERE user_id = $1;", [req.params.id]);
    res.json({
      ...user.rows[0],
      posts: [...posts.rows],
    });
  } catch (err) {
    res.json(err);
  }
});

app.listen(3000, () => {
  client.connect();
});
