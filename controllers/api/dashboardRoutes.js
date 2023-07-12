const router = require("express").Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/withauth');

router.get("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ["id", "title", "post_content", "created_at"],
            include: [
                {
                    model: Comment,
                    attributes: ["id", "comment_body", "post_id", "user_id", "created_at",],
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

        const posts = postData.map((data) => data.get({ plain: true }));

        res.render("dashboard", {
            posts,
            username: req.session.username,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/new", withAuth, (req, res) => {
    res.render("new-post", {
        username: req.session.username,
        logged_in: req.session.logged_in,
    });
});

router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "title", "post_content", "created_at"],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_body", "post_id", "user_id", "created_at",],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
        }

        const post = postData.get({ plain: true });
        res.render("edit-post", {
            post,
            edit_id: req.params.id,
            username: req.session.username,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;