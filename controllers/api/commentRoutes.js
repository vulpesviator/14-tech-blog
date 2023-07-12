const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require('../../utils/withauth');

router.post("/", withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentBody = await Comment.create({
                comment_body: req.body.comment_body,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            });
            
            res.json(commentBody);
        };
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;