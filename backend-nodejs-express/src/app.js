const express = require('express');
const app = express();
const port = 3000 | process.env.PORT;
const mongoose = require('mongoose');
const morgan = require("morgan");
const admin = require("firebase-admin");
const key = require("./mynotes-key.json");

admin.initializeApp({
    credential: admin.credential.cert(key)
})

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

app.use("/", (req, res, next) => {
    admin.auth().verifyIdToken(req.query.token).then(result => {
        req.query['uid'] = result.uid
        next()
    }).catch(error => {
        res.status(401)
    })
})

app.use("/auth", authRoute)

app.use("/notes", noteRoute)

app.get('/', (req, res, next) => {
    res.send('Hello from MyNotes Backend!!')
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

