const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    prod_name: String,
    prod_desc: String,
    prod_price: Number,
    updated_at: Date
});

module.exports = mongoose.model('Product', ProductSchema);
