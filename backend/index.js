const express = require("express");
const app  = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectdB = require('./config/db');
const userRouter = require('./routers/userRouter');
const linkRouter = require("./routers/linkRouter");
const path = require("path");

app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
connectdB();
const Port = process.env.PORT || 8080;

const _dirname = path.resolve();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://link-sharing-app-t739.vercel.app/');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type');
    next();
});

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', userRouter);
app.use('/api/links', linkRouter);

app.use(express.static(path.join(_dirname,"/frontend/build")));
app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname,"frontend", "build", "index.html"));
})

app.listen(8080, () => {
    console.log(`Server is running on port ${Port}`);
});
