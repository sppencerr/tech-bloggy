const router = require("express").Router();
const { Post, Comment, User } = require("../models/");
const withAuth = require("../utils/auth");

// Route to get all posts
router.get("/", async (req, res) => {
  try {
    // Get all posts and include user model
    const postData = await Post.findAll({
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    // Render all posts
    res.render("all-posts-admin", { posts, isLoggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a single post
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // Find post by Id and include user and comment models
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      res.render("single-post", { post, isLoggedIn: req.session.loggedIn });
    } else {
      // If no post found, set status to 404
      res.status(404).end();
    }
    // Catch error
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for login, redirect to dashboard if logged in, else render login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Route for signup, redirect to dashboard if logged in, else render signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

module.exports = router;
