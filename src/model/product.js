const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    category: {
        type: String,
        required: true,
        minLength: 3
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    removedAt: {
        type: Date,
        required: false
    }
});

const Product = mongoose.model('Product', productSchema);

exports.Product = Product;
exports.productSchema = productSchema;
