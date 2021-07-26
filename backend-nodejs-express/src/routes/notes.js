const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Note = require("../schema/note")
const User = require("../schema/user")



router.get("/", (req, res, next) => {
    const username = req.query.username.trim();

    Note.find({ owner_name: username }).then(notes => {
        res.status(200).json(notes)
    })
})


router.post("/create", (req, res, next) => {
    const username = req.query.username;
    const note = req.body;
   
    new Note({
        _id: new mongoose.Types.ObjectId(),
        id: note.id,
        owner_name: username,
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

})


router.patch("/update", (req, res, next) => {
    const username = req.query.username;
    const noteId = req.query.note_id;
    const noteChanges = req.body;

    Note.findOneAndUpdate({
        id: noteId
    }, noteChanges, { upsert: false }).then(() => {
        res.status(200).json({
            "message": "Tu nota fue editada correctamente"
        })
    })
})


router.get("/remove", (req, res, next) => {
    const username = req.query.username;
    const noteId = req.query.note_id;
    Note.findOneAndRemove({
        id: noteId,
        owner_name: username
    }).then((doc) => {
        if (doc == null) {
            res.status(404).json({
                "error": "Esta nota no existe"
            })
            return 
        }
        res.status(200).json({
            "message": "Nota Eliminada correctamente"
        })
    })
})

module.exports = router
