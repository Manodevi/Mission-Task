const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// Create Schema and Model

const MissionSchema = new Schema({  
  tasks: {
    type: Array
  },
  mission: {
    type: Number
  }
});

MissionSchema.plugin(AutoIncrement, {id:'mission_seq',inc_field: 'mission'});
module.exports = mongoose.model('missions', MissionSchema);
