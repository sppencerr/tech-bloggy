const router = require("express").Router();
const { Post, Comment, User } = require("../models/");
const withAuth = require("../utils/auth");

// Route to get all posts
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [["id", "DESC"]],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get a single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
          attributes: ["comment_text", "user_id"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching post" });
  }
});
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const commentData = await Comment.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const user = userData.get({ plain: true });
    const posts = postData.map((post) => post.get({ plain: true }));
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("profile", {
      user,
      posts,
      comments,
      logged_in: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for signup, redirect to dashboard if logged in, else render signup page

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.redirect("/");
  }
});

module.exports = router;
