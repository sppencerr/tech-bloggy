const router = require("express").Router();
const { Post, User } = require("../models/");
const withAuth = require("../utils/auth");

// Get all posts on dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    // Get all posts where userId matches session userId
    const postData = await Post.findAll({
      where: { userId: req.session.userId },
      include: [User],
    });
    // Map post data to individual posts
    const posts = postData.map((post) => post.get({ plain: true }));
    // Render dashboard layout with posts
    res.render("all-posts", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    // Redirect to login if there's an error
    res.redirect("login");
  }
});

// Route for clicking on new post button
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

// Route for when a post is clicked on
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // Get post data by primary key
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      // Render edit-post view with post data
      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    } else {
      // Set status to 404 if no post found
      res.status(404).end();
    }
  } catch (err) {
    // Redirect to login if there's an error
    res.redirect("login");
  }
});

module.exports = router;
