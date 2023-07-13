const router = require('express').Router();
/* imports the Post model */
const { Post } = require('../../models');
/* local middleware to confirm authorize user is logged in */
const withAuth = require('../../utils/withauth');

/* Route for authorized User to create a new post */
router.post('/new', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        });

        res.redirect('/api/dashboard')
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
});

/* Route for authorized User to update an existing post */
router.post('/update/', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            post_content: req.body.post_content
        },
        {
            where: {
                id: req.body.postId
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.redirect('/api/dashboard');
    } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

/* Route for authorized User to delete an existing post */
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;