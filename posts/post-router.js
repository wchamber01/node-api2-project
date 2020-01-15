const router = require("express").Router();
const Posts = require("../data/db");

//GET all posts
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(items => {
      res.status(200).json(items);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

//GET single post by id
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(item => {
      if (item.length > 0) {
        res.status(200).json(item);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

//GET single comment specified by id
router.get("/comments/:id", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The comments could not be retrieved."
      });
    });
});

//GET all comments specified by post_id
router.get("/:post_id/comments", (req, res) => {
  Posts.findPostComments(req.params.post_id)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The comments could not be retrieved."
      });
    });
});

//POST creat new post using data from request body
router.post("/", (req, res) => {
  Posts.add(req.body)
    .then(item => {
      res.status(201).json(item);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the post"
      });
    });
});

//POST creat new comment for specified post using data from request body
router.post("/", (req, res) => {
  Posts.add(req.body)
    .then(item => {
      res.status(201).json(item);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the post"
      });
    });
});

//DELETE a post
router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been nuked" });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the post"
      });
    });
});

//PUT updates on existing post
router.put("/:id", (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the post"
      });
    });
});

module.exports = router;
