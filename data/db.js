const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  insert,
  insertComment,
  update,
  remove,
  find,
  findById,
  findPostComments,
  findCommentById
};

function insert(post) {
  return db("posts")
    .insert(post, "id")
    .then(ids => ({ id: ids[0] }));
}

function insertComment(comment) {
  return db("comments")
    .insert(comment)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db("posts")
    .where("id", Number(id))
    .update(post);
}

function remove(id) {
  return db("posts")
    .where("id", Number(id))
    .del();
}

function find() {
  return db("posts");
}

function findById(id) {
  return db("posts").where({ id: Number(id) });
}

function findPostComments(postId) {
  return db("comments")
    .join("posts", "posts.id", "post_id")
    .select("comments.*", "title as post")
    .where("post_id", postId);
}

function findCommentById(id) {
  return db("comments")
    .join("posts", "posts.id", "post_id")
    .select("comments.*", "title as post")
    .where("comments.id", id);
}
