const express = require('express');
const router = express.Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

router
  .route('/')
  .post(withAuth, async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
      const newPost = await Post.create({ ...body, userId: req.session.userId });
      console.log('Success');
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .put(withAuth, '/:id', async (req, res) => {
    try {
      const [affectedRows] = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(withAuth, '/:id', async (req, res) => {
    try {
      const [affectedRows] = Post.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports