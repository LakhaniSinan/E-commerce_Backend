const express = require("express")
const router = express.Router()
const Category = require("../model/category")

router.post("/createCategory", async (req, res) => {
    const { name, image } = req.body
    try {
        const category = await Category.create({
            name, image
        })
        let result = await category.save()
        res.send({ status: "ok", data: result })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: "Something went wrong"
        })
    }
})

router.get("/getCategory", async (req, res) => {
    try {
        const users = await Category.find()
        res.send({
            status: "ok",
            data: users
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: "Something went wrong"
        })
    }
})

router.put("/updateCategory/:id", async (req, res) => {
    console.log(req.params, "PARMSSSSSS");
    const { id } = req.params
    try {
        const updateCategory = await Category.findOneAndUpdate(id, req.body, { new: true })
        res.send({ status: "ok", data: updateCategory })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: "Something went wrong"
        })
    }
})

router.delete("/deleteCategory/:id", async (req, res) => {
    console.log(req.params, "PARMSSSSSS");
    const { id } = req.params
    try {
        const deletedCategory = await Category.findOneAndDelete(id)
        res.send({ status: "ok", data: "Deleted Successfully" })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: "Something went wrong"
        })
    }
})

module.exports = router
