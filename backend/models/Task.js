const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  dueDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema); //  Must export model directly
