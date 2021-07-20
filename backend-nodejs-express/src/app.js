const express = require('express');
const app = express();
const port = 3000 | process.env.PORT;
const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.0.7:1/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const authRoute = require("../auth")

app.use(express.json())

app.use("/auth", authRoute)

app.get('/', (req, res, next) => {
    res.send('Hello from MyNotes Backend!!')
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});