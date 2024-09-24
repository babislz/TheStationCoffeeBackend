const { Table } = require('../model/table');

class TableController {
    static async create(req, res) {
        const { tableNumber, capacity, status } = req.body;

        try {
            const newTable = new Table({ tableNumber, capacity, status });
            await newTable.save();
            res.status(201).json({ message: 'Table created successfully', table: newTable });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async getAll(req, res) {
        try {
            const tables = await Table.find();
            res.json(tables);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = TableController;
