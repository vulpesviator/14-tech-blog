const router = require('express').Router();

/* All routes for blog */
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

/* tells express router to use the routes as written */
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/posts', postRoutes)
router.use('/comments', commentRoutes);


module.exports = router;