const mongoose = require('mongoose');

const TasksSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('tasks', TasksSchema);