const express = require("express");
const router = require("../posts/post-router");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
  <h2>Node API 2 Project</h2>
  `);
});

server.use("/api/posts", router);

module.exports = server;
