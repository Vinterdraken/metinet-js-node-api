const mongoose = require('mongoose');
const Post = mongoose.model('Post');


class PostFunction{

    static getPostByID(postId){
        return new Promise(function(resolve, reject){
            Post.find({"_id": postId}).populate("associe").exec(function (err, post){
                if(err)
                    return reject(err);

                resolve(post[0]);
            });
        })
    }

    static getPostByCategory(categoryId){
        return new Promise( function(resolve, reject){
           Post.find({"associe._id": categoryId}).populate("associe").exec(function (err, posts) {
               if(err)
                   return reject(err);

               resolve(posts[0]);
           })
        });
    }
}

module.exports = PostFunction;