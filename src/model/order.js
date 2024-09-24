const { default: mongoose } = require("mongoose");
const { tableSchema } = require("./table");
const { productSchema } = require("./product");

const orderSchema = new mongoose.Schema({
    table: tableSchema,
    products:  Array(productSchema),
    active: Boolean
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;