const Product = require("../models/Product");
const router = require("express").Router();



//ADD PRODUCT
router.post("/add", async(req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        isSeller : req.body.isSeller,
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct)
        console.log(savedProduct);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;