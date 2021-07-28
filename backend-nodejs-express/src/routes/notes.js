const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Note = require("../schema/note")




router.get("/", (req, res, next) => {
    const uid = req.query.uid;

    Note.find({ uid: uid }).then(notes => {
        res.status(200).json(notes)
    }).catch(next)
})


router.post("/create", (req, res, next) => {
    const uid = req.query.uid;
    const note = req.body;

    console.log(note)

    new Note({
        _id: new mongoose.Types.ObjectId(),
        id: note.id,
        uid: uid,
        text: note.text,
        creation_date: note.creation_date,
        edition_date: note.edition_date,
        relevance: note.relevance,
        title: note.title,

    }).save().then(_ => {
        res.status(200).json({
            "message": "La nota se a guardado correctamente"
        })
    }).catch(next)

})


router.patch("/update", (req, res, next) => {
    const uid = req.query.username;
    const noteId = req.query.note_id;
    const noteChanges = req.body;

    Note.findOneAndUpdate({
        id: noteId,
        uid: uid,
    }, noteChanges, { upsert: false }).then(() => {
        res.status(200).json({
            "message": "Tu nota fue editada correctamente"
        })
    }).catch(next)
})


router.get("/remove", (req, res, next) => {
    const uid = req.query.username;
    const noteId = req.query.note_id;
    Note.findOneAndRemove({
        id: noteId,
        owner_name: uid
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
    }).catch(next)
})

module.exports = router
