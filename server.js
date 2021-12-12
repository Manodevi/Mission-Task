const express = require('express');

const app = express();
app.get('/', (req, res) => res.json({msg: "Mission task"}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER started on PORT ${PORT}`));