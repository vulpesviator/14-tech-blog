const router = require('express').Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/withauth");


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["comment_body"]
        },
      ],
    });

    const blogPosts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get("/post/:id", withAuth, async (req, res) => {
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
        }
      ],
    });

    const blogPost = postData.get({ plain: true });
    console.log(blogPost);

    res.render("blogPost", {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    res.redirect("/login");
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },

      include: [
        {
          model: Post,
          include: [User],
        },
        {
          model: Comment,
        }
      ],

    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/create", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render("create", {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
      });
      return;
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/create/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"]
        },
        {
          model: Comment,
          include: [User],
        }
      ],
    });

    const blogPost = postData.get({ plain: true });
    console.log(blogPost);

    if (req.session.logged_in) {
      res.render("edit", {
        ...blogPost,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;