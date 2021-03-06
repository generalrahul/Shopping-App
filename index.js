const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const userRoute = require(__dirname + '/routes/user')
const authRoute = require(__dirname + "/routes/auth")
const productRoute = require(__dirname + "/routes/product")
// const cartRoute = require(__dirname + "/routes/cart")

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.get("/api/test", () => {
    console.log("test is successfull");
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
// app.use("/api/cart", cartRoute);


app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Backend server is running");
});