const router = require('express').Router();
const postRoutes = require('./post/PostRoutes');
const categoryRoutes = require('./category/CategoryRoutes');

router.use('/post', postRoutes);
router.use('/category', categoryRoutes);

module.exports = router;