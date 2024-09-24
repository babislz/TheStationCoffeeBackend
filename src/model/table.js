const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true, unique: true },
    capacity: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'preparing', 'done'], default: 'done' },
    assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Table =  mongoose.model('Table', tableSchema);
exports.Table = Table;
exports.tableSchema = tableSchema;
