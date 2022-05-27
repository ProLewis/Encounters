const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const DB = 'encounters_db';

// Middleware
app.use(cors(), express.json(), express.urlencoded({extended: true}));

// Database Connection
require('./config/mongoose.config')(DB);

// Route Connection
require('./routes/encounters.route')(app);

//Server Start
app.listen(port, () => console.log(`Server up and listening on port: ${port}`) );