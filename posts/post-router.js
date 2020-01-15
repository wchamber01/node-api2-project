const router = require("express").Router();
const Posts = require("../data/db");

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(items => {
      res.status(200).json(items);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

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
