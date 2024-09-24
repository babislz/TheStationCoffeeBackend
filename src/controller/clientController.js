require("dotenv/config")

const User = require('../model/user');
const { Table } = require('../model/table'); // Import the Table model
const jwt = require('jsonwebtoken');

class ClientController {
    static async getTable(req, res) {
        const tableId = req.query.id; // Table ID from the QR code
        const userId = req.query.user; // User ID from the QR code

        if (!tableId || !userId) {
            return res.status(400).json({ message: 'Table ID and User ID are required' });
        }

        try {
            // Find the user by ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Find the table by ID
            const table = await Table.findOne({ tableNumber: tableId });
            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }

            // Generate a JWT for the user
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET, { expiresIn: '1h' });

            // Return the table information along with the token
            res.json({ 
                message: `Welcome to Table ${table.tableNumber}`, 
                token, 
                user: { id: user._id, username: user.username, role: user.role },
                table // Include table info in the response
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = ClientController;
