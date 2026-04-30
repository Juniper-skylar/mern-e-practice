const express = require("express");
require('dotenv').config();
const connectDB = require('./config/dbConnection');
const port = process.env.PORT || 4444;
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const carRouter = require('./routes/carRoute'); 
const serviceRouter = require('./routes/serviceRoute');
const servicerecordRouter = require('./routes/serviceRecordRoute');
const paymentRouter = require('./routes/paymentRoute');

const app = express();

app.get('/', (req, res) => {
    res.send("server is running");
})

app.use(express.json());

connectDB();

app.use(cors());


app.use('/api/auth', authRouter);
app.use('/api/car', carRouter);
app.use('/api/service',serviceRouter);
app.use('/api/servicerecord', servicerecordRouter);
app.use('/api/payment', paymentRouter);

app.listen(port, () => {
    console.log(`our app is running on port: ${port}`);
})

