const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model

const MissionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tasks: {
    type: Array
  }
});

module.exports = mongoose.model('missions', MissionSchema);
