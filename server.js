const express = require('express');
const connectDB = require('./config/db');
const missions = require('./routes/missions');

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.json({msg: "Mission task"}));

// Define Routes
app.use('/api/missions', missions);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER started on PORT ${PORT}`));