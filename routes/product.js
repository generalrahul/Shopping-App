const Product = require("../models/Product");
const router = require("express").Router();
const ObjectId = require('mongodb').ObjectId;
const verify = require("./verifytoken");
const User = require("../models/User");


//GET PRODUCT
router.get("/", verify, async (req, res) => {
    Product.find({}).then((productList) => {
        res.status(201).json(productList)
    }).catch((err) => {
        console.log(err);
    });
});



//ADD PRODUCT
router.post("/add", verify, async (req, res) => {
    var user = await User.findOne({ _id: ObjectId(req.user._id) })
    if (!user.isSeller) return res.status(401).send("User is not a seller")
    const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        quantity: req.body.quantity,
        seller: req.user._id
    });
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct)
        console.log(savedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// UPDATE PRODUCT
router.patch("/update/:id", verify, async (req, res) => {
    var id = req.params.id
    var user = await Product.findOne({ _id: ObjectId(id) })
    if (user.seller != id) return res.status(401).send("This is not your Product!")
    var updateObject = req.body;
    Product.findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateObject }, { new: true }).then((updateProduct) => {
        res.status(201).json(updateProduct)
    }).catch((err) => {
        console.log(err);
    });
});
module.exports = router;