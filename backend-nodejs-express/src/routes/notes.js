const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Note = require("../schema/note")
const User = require("../schema/user")
const Token = require("../schema/token")


router.get("/", (req, res, next) => {
    const username = req.query.username.trim();
    const token = req.query.token.trim();
    Token.tokenIsValid(token, username, () => {
        Note.find({ owner_name: username }).then(notes => {
            res.status(200).json(notes)
        })
    }, (error) => {
        console.log(error)
        res.status(401).json(error)
    })
})

router.post("/create", (req, res, next) => {
    const note = req.body;
    const username = req.query.username
    const token = req.query.token
    Token.tokenIsValid(token, username, () => {

        new Note({
            _id: new mongoose.Types.ObjectId(),
            id: note.id,
            owner_name: note.owner_name,
            text: note.text,
            creation_date: note.creation_date,
            edition_date: note.edition_date,
            relevance: note.relevance,
            title: note.title,

        }).save().then(_ => {
            res.status(200).json({
                "message": "La nota se a guardado correctamente"
            })
        }).catch(_ => {
            res.status(500).json({
                "error": "Ocurrio un error"
            })
        })
    }, (error) => {
        res.status(401).json(error)
    })



})
router.patch("/update", (req, res, next) => {
      
})

module.exports = router
