const express = require('express');
const app = express();
const port = 3000 | process.env.PORT;
const mongoose = require('mongoose')
const morgan = require("morgan")

mongoose.connect('mongodb://192.168.0.9:1/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(morgan("dev"))

const authRoute = require("./routes/auth")
const noteRoute = require("./routes/notes")

app.use(express.json())

app.use("/auth", authRoute)

app.use("/notes", noteRoute)

app.get('/', (req, res, next) => {
    res.send('Hello from MyNotes Backend!!')
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});