const Order = require("../model/order");
const { Table } = require("../model/table");

class OrderController {
  static async createOrder(req, res) {
    const { products, tableId } = req.body;
    if (products.lenght <= 0) {
      return res
        .status(400)
        .json({ message: "Lista de pedidos não pode ser vazia!" });
    }

    try {
        
        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ mesasge: "Mesa não encontrada" });
        }
        
        const order = new Order({
            table: table,
            products: products,
            active: true
        })

        await order.save();
        return res.status(201).json({ order });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

  }
}

module.exports = OrderController;
