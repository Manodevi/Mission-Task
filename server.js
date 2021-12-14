const express = require('express');
const connectDB = require('./config/db');
const missions = require('./routes/missions');
const tasks = require('./routes/tasks');

const app = express();

// Connect Database
connectDB();
app.use(express.json({ extended: false })); // now can accept body data
app.get('/', (req, res) => res.json({msg: "Mission task"}));

// Define Routes
app.use('/api/missions', missions);
app.use('/api/tasks', tasks);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER started on PORT ${PORT}`));