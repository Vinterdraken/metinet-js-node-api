const mongoose = require('mongoose');
const _ = require("lodash");
const Post = mongoose.model('Post');
const PF = require('./PostFunction');

class PostMiddlewares {

    static loadPostFromParams(req, res, next, postId) {
        PF.getPostByID(postId).then(product => {
            req.data.post = product;
            next();
        }, err => next(err) );
    }

    static displayPostByCategory(req, res, next, categoryId){
        PF.getPostByCategory(categoryId).then(post => {
            req.data.post = post;
            next();
        }, err => next(err) );
    }

    static displayAllPosts(req, res, next) {
        Post.find({}, function (err, allPosts) {
            if (err) {
                return next(err);
            }
            res.send(allPosts);
        }).populate("associe");
    }

    static displayPost(req, res, next) {
        if (!req.data.post) {
            return next({
                message: "Unknow post."
            });
        }
        res.send(req.data.post);
    }

    static createPost(req, res, next) {
        const p = new Post({
            title: req.body.title,
            content: req.body.content,
            associe: req.body.associe
        });

        p.save(function (err, productSaved) {
            if (err) {
                next(err);
            }
            res.send(productSaved);
        });
    }


    static updatePost(req, res) {
        req.data.post = _.extend(req.data.post, req.body);
        req.data.post.save((err, postUpdated) => {
            if(err)
                return next(err);
            else
                res.send(postUpdated);
        })
    }

    static deletePost(req, res, next) {
        req.data.post.delete((err, infos) =>{
            if(err)
                return next(err);

            res.send({
                message: "The post has been slain !"
            });
        });
    }



}

module.exports = PostMiddlewares;