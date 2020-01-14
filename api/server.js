const express = require("express");
const router = require("../blogs/blog-router");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
  <h2>Node API 2 Project</h2>
  `);
});

server.use("/api/blogs", router);

module.exports = server;
