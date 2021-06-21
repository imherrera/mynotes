const express = require('express');
const app = express();
const port = 3000 | process.env.PORT;

app.get('/', (req, res, next) => {
    res.send('Hello from MyNotes Backend!!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});