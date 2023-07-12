const router = require('express').Router();
const { User, Post, Comment } = require("../models");


router.get('/', async (req, res) => {

  try {
      const postData = await Post.findAll({
          attributes: ["id", "title", "post_content", "created_at"],
          include: [
              {
                  model: Comment,
                  attributes: [
                      "id",
                      "comment_body",
                      "post_id",
                      "user_id",
                      "created_at",
                  ],
                  include: {
                      model: User,
                      attributes: ["username"],
                  },
              },
              {
                  model: User,
                  attributes: ["username"],
              },
          ],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('homepage', {
          posts,
          username: req.session.username,
          logged_in: req.session.loggedIn
      });
  } catch (err) {
      res.status(500).json(err);
  };
});

router.get("/post/:id", async (req, res) => {

  try {

    const postData = await Post.findOne({
          where: {
              id: req.params.id,
          },
          attributes: ["id", "post_content", "title", "created_at"],
          include: [
              {
                  model: Comment,
                  attributes: [
                      "id",
                      "comment_body",
                      "post_id",
                      "user_id",
                      "created_at",
                  ],
                  include: {
                      model: User,
                      attributes: ["username"],
                  },
              },
              {
                  model: User,
                  attributes: ["username"],
              },
          ],
      })

      if (!postData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
      }

      const post = postData.get({ plain: true });

      res.render("post-with-comments", {
          post,
          logged_in: req.session.loggedIn,
          username: req.session.username
      });
  } catch(err) {
      console.log(err);
      res.status(500).json(err);
  };
});

router.get('/login', (req, res) => {
  
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', {
      username: req.session.username,
  });
});

router.get('/signup', (req, res) => {
  
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup', {
      username: req.session.username,
  });
});

module.exports = router;