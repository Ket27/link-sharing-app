const express = require("express");
const app  = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectdB = require('./config/db');
const userRouter = require('./routers/userRouter');
const linkRouter = require("./routers/linkRouter");

app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
connectdB();
const Port = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type');
    next();
});

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', userRouter);
app.use('/api/links', linkRouter);

app.listen(8080, () => {
    console.log(`Server is running on port ${Port}`);
});