const mongoose = require('mongoose');
const _ = require("lodash");
const Category = mongoose.model('Category');
const CF = require('./CategoryFunction');

class CategoryMiddleware{

    static loadCategoryFromParams(req, res, next, categoryId) {
        CF.getCategoryByID(categoryId).then(category => {
            req.data.category = category;
            next();
        }, err => next(err) );
    }

    static displayAllCategories(req, res, next) {
        Category.find({}, function (err, allCategory) {
            if (err) {
                return next(err);
            }
            res.send(allCategory);
        });
    }

    static displayCategory(req, res, next) {
        if (!req.data.category) {
            return next({
                message: "Category inconnu."
            });
        }
        res.send(req.data.category);
    }

    static createCategory(req, res, next){
        const c = new Category({
            name: req.body.name
        });

        c.save(function (err, categorySaved){
            if (err) {
                next(err);
            }
            res.send(categorySaved);
        })
    }

    static updateCategory(req, res) {
        req.data.category = _.extend(req.data.category, req.body);
        req.data.category.save((err, categoryUpdated) => {
            if(err)
                return next(err);
            else
                res.send(categoryUpdated);
        })
    }

    static deleteCategory(req, res, next) {
        req.data.category.delete((err, infos) =>{
            if(err)
                return next(err);

            res.send({
                message: "La category a été supprimer."
            });
        });
    }

}

module.exports = CategoryMiddleware;