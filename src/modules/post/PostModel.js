const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema= new Schema({

    title: {
        type: String,
        required: true,
        empty: false,
        trim: true
    },
    content: {
        type: String,
        required: true,
        empty: false,
    },
    associe:{
        type: Schema.Types.ObjectId,
        required: true,
        empty: false,
        ref: 'Category'
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Post', ProductSchema);