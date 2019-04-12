const express = require('express');
const CM = require('./CategoryMiddleware');
const AUTH = require('../../AuthMidlleware');
const router = express.Router();

router.param('categoryId', CM.loadCategoryFromParams);

router.route('/') // ALL /api/category
    .get(CM.displayAllCategories)
    .post(AUTH.hasValidAthorization, CM.createCategory);

router.route('/:categoryId') // ALL /api/category/XXXXXXXXXXXXX
    .get(CM.displayCategory)
    .put(AUTH.hasValidAthorization, CM.updateCategory)
    .delete(AUTH.hasValidAthorization, CM.deleteCategory);

module.exports = router;

