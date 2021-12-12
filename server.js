const express = require('express');
const missions = require('./routes/missions');

const app = express();
app.get('/', (req, res) => res.json({msg: "Mission task"}));

// Define Routes
app.use('/api/missions', missions);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER started on PORT ${PORT}`));