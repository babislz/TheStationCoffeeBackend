const User = require('../model/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
    static async create(req, res) {
        const { username, password, role } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword, role });
            await user.save();
            res.status(201).json({ message: 'Usuário registrado com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = UserController;