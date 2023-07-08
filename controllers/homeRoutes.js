const router = require('express').Router();
const { User } = require("../models");
const withAuth = require("../utils/withauth");


router.get('/', async (req, res) => {
  res.render('homepage');
});

router.get('/dashboard', withAuth, async (req, res) => {
  res.render('homepage');
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;