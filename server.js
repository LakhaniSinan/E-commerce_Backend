const express = require("express")
const bodyParser = require("body-parser")
const UserApi = require("./routes/user")
const ProductApi = require("./routes/product")
const CategoryApi = require("./routes/category")
const OrderApi = require("./routes/order")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/fullstack", {

}).then(res => {
    console.log("Connected to local Db");
})
    .catch(err => {
        console.log("errr=>>>>", err);
    })

const app = express()

app.use(bodyParser.json())

let PORT = 6000

app.use('/api', UserApi)
app.use('/api', CategoryApi)
app.use('/api', ProductApi)
app.use('/api', OrderApi)

app.listen(PORT, (req, res) => {
    console.log(`Listening to ${PORT}`)
})


