const mongoose = require("mongoose");
const hat = require("hat");

const Token = mongoose.model(
    "Token",
    mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        username: String,
        token: String,
    })
);

async function tokenIsValid(token, username) {
    const userToken = await Token.find({
        username: username
    })
    if (userToken.length == 0) {
        return false
    }
    return userToken[0].token === token
}

async function createToken(username) {
    const newToken = hat().toString()
    const userToken = new Token({
        //_id: new mongoose.Types.ObjectId(),
        username: username,
        token: newToken,
    }, {
        collection: "token"
    })
    await Token.findOneAndUpdate({
        username: username
    }, userToken,
        { upsert: true }
    )
    return newToken
}

module.exports = {
    //mongoose.model("Token", Token),
    tokenIsValid,
    createToken
}
