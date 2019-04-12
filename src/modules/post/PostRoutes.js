const express = require('express');
const PM = require('./PostMiddleware');
const AUTH = require('../../AuthMidlleware');
const router = express.Router();

router.param('postId', PM.loadPostFromParams);

router.route('/') // ALL /api/post
    .get(PM.displayAllPosts)
    .post(AUTH.hasValidAthorization, PM.createPost);

router.route('/:postId') // ALL /api/post/XXXXXXXXXXXXX
    .get(PM.displayPost)
    .put(AUTH.hasValidAthorization, PM.updatePost)
    .delete(AUTH.hasValidAthorization, PM.deletePost);

router.route('category/:categoryId')
    .get(PM.displayPostByCategory, PM.displayPost);

module.exports = router;