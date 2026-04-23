const express = require("express");
require('dotenv').config();
const connectDB = require('./config/dbConnection');
const port = process.env.PORT || 4444;
const router = require('./routes/authRoute');
const cors = require('cors');

const app = express();

app.get('/', (req, res) => {
    res.send("server is running");
})

app.use(express.json());

connectDB();

app.use(cors());

app.use('/api/auth', router);

app.listen(port, () => {
    console.log(`our app is running on port: ${port}`);
})

