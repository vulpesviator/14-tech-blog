const router = require("express").Router();
/* imports the Comment model */
const { Comment } = require("../../models");
/* local middleware to confirm authorize user is logged in */
const withAuth = require('../../utils/withauth');

/* If user is logged in, this will post a comment with their id and date */
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentData =  await Comment.create({
                comment_body: req.body.comment_body,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            });
            res.json(commentData);
        };
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
        };
});

module.exports = router;