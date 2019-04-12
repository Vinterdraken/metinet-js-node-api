const mongoose = require('mongoose');
const Category = mongoose.model('Category');

class CategoryFunction{

    static getCategoryByID(categoryId){
        return new Promise(function(resolve, reject){
            Category.find({"_id": categoryId}).exec(function (err, category){
                if(err)
                    return reject(err);
                    console.log(category);
                resolve(category[0]);
            });
        })
    }
}

module.exports = CategoryFunction;