const Order = require("../model/order");
const { Table } = require("../model/table");

class OrderController {
  static async createOrder(req, res) {
    const { products } = req.body;
    const { tableNum } = req.params;

    if (products.lenght <= 0) {
      return res
        .status(400)
        .json({ message: "Lista de pedidos não pode ser vazia!" });
    }

    try {
        console.log(tableNum)
        const table = await Table.findOne({tableNumber: tableNum });
        console.log(table)
        if (!table) {
            return res.status(404).json({ mesasge: "Mesa não encontrada" });
        }

        let order = await Order.findOne({table: table._id})
        
        if (!order) {
            order = new Order({
                table: table,
                products: products,
                active: true
            })
        } else {
            order.products.push(...products)
        }

        await order.save();
        return res.status(201).json({ order });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    }
}

module.exports = OrderController;
