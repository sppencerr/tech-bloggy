const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const bcrypt = require("bcryptjs");

// Route to handle user login
router.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ where: { email: req.body.email } });

    // Check if user exists
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Compare provided password with hashed password in db
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Save user id to session and set loggedIn flag to true
    req.session.user_id = user.id;
    req.session.logged_in = true;

    res.json({ user, message: "You are now logged in!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to handle creating new posts
router.post("/post", withAuth, async (req, res) => {
  try {
    // Create new post with user id from session
    const newPost = await Post.create({
      post_title: req.body.postTitle,
      post_text: req.body.postText,
      user_id: req.session.user_id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
    });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res
        .status(201)
        .json({ user: newUser, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ message: "Error creating user" });
  }
});

router.post("/comment", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      post_id: req.body.postId,
      comment_text: req.body.commentText,
      user_id: req.session.user_id,
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: "Error creating comment" });
  }
});

router.put("/post/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        post_title: req.body.editTitle,
        post_text: req.body.editText,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    if (updatedPost[0] === 1) {
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err });
  }
});

router.delete("/post/:id", withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post" });
  }
});
module.exports = router;
