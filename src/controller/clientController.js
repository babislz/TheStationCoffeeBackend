const User = require('../model/user');
const jwt = require('jsonwebtoken');

class ClientController {
    static async getTable(req, res) {
        const tableId = req.query.id; // Table ID from the QR code
        const userId = req.query.user; // User ID from the QR code

        if (!tableId || !userId) {
            return res.status(400).json({ message: 'Table ID and User ID are required' });
        }

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({
                message: `Welcome to Table ${tableId}`,
                token,
                user: { id: user._id, username: user.username, role: user.role }
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = ClientController;
