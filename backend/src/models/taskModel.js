const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: {type: String},
  description: {type: String},
 
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
