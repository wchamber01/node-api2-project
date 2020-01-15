const router = require("express").Router();
const Comments = require("../data/db");

router.get("/", (req, res) => {
  Comments.find(req.query)
    .then(items => {
      res.status(200).json(items);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the comments"
      });
    });
});

router.get("/:id", (req, res) => {
  Comments.findById(req.params.id)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the comment"
      });
    });
});

router.post("/", (req, res) => {
  Comments.add(req.body)
    .then(item => {
      res.status(201).json(item);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the comment"
      });
    });
});

router.delete("/:id", (req, res) => {
  Comments.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The comment has been nuked" });
      } else {
        res.status(404).json({ message: "The comment could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the comment"
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Comments.update(req.params.id, changes)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: "The comment could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the comment"
      });
    });
});

module.exports = router;
