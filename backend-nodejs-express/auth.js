const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const User = require("./schema/user")

router.post('/login', (req, res, next) => {
    const username = req.body.username.trim()
    const password = req.body.password.trim()

    if (username == '' || password == '') {
        res.status(401).json({
            "error": "Debes rellenar todos los campos"
        })
    };
    
    User.find({
        username: username
    }).then(users => {
        if (users.length == 0) {
            res.status(401).json({
                "error": "El usuario no existe"
            })
            return
        }
        const user = users[0]
        if (user.password == password) {
            res.status(200).json({
                "message": "Iniciando sesion",
                "token": 123
            })
            return
        }
        res.status(401).json({
            "error": "la contraseña no es valida"
        })
    })




});

router.post('/sign-in', (req, res, next) => {
    const username = req.body.username.trim()
    const password = req.body.password.trim()

    if (username == '' || password == '') {
        res.status(401).json({
            "error": "debes rellenar todos los campos"
        })
        return
    }
    if (password.length < 8) {
        res.status(401).json({
            "error": "la contraseña es muy corta"
        })
        return
    }
    if (password == username) {
        res.status(401).json({
            "error": "la contraseña y el usuario no pueden ser iguales"
        })
        return
    }

    User.find({
        username: username
    }).then(user => {
        console.log(user)
        if (user.length > 0) {
            res.status(401).json({
                "error": "Este nombre ya esta en uso"
            })
            return
        }
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            password: password
        }, { collection: "users" })

        newUser.save().then(result => {
            res.status(200).json({
                "message": "el usuario se a creado correctamente"
            })
        })

    }).catch(err => {
        console.error(err)
    })

});

module.exports = router