const { default: mongoose, Schema } = require("mongoose");
const { tableSchema } = require("./table");
const { productSchema } = require("./product");

const orderSchema = new mongoose.Schema({
    table: {type: Schema.Types.ObjectId, ref: "Table"},
    // table: tableSchema,
    products:  {type: [Object]},
    active: Boolean
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;