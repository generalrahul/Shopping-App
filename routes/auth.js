const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const { registerValidation } = require("../validation");

//REGISTER
router.post("/register", async (req, res) => {
    //Validating the Data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        isSeller: req.body.isSeller,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
        console.log(savedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json("Wrong Credentials")
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const Originalpassword = hashedPassword.toString(cryptoJs.enc.Utf8);
        Originalpassword !== req.body.password &&
            res.status(401).json("Wrong Credentials");

        const { password, ...others } = user._doc;

        //Create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send(token);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;