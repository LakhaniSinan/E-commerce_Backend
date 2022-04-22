const express = require("express");
const router = express.Router();
const Product = require("../model/product");

router.post("/createProduct", async (req, res) => {
  const { name, image, description, price, discount, category, quantity } =
    req.body;
  if (name == "") {
    res.status(400).send({
      status: "error",
      message: "name is missing",
    });
  }
  try {
    const product = await Product.create({
      name,
      image,
      description,
      price,
      discount,
      category,
      quantity,
    });
    let result = await product.save();
    res.send({ status: "ok", data: result });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});

router.get("/getProduct", async (req, res) => {
  // const { page } = req.query;
  console.log(req.query, "P");
  // console.log(page,"PAGEEE");
  let size = 5;
  let toSkip = req.query.page * size;
  try {
    const users = await Product.find().limit(req.query.limit).skip(toSkip)
    res.send({
      status: "ok",
      data: users,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});

router.put("/updateProduct/:id", async (req, res) => {
  console.log(req.params, "PARMSSSSSS");
  const { id } = req.params;
  try {
    const updateCategory = await Product.findOneAndUpdate(id, req.body, {
      new: true,
    });
    res.send({ status: "ok", data: updateCategory });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});

router.delete("/deleteProduct/:id", async (req, res) => {
  console.log(req.params, "PARMSSSSSS");
  const { id } = req.params;
  try {
    const deletedCategory = await Product.findOneAndDelete(id);
    res.send({ status: "ok", data: "Product Deleted Successfully" });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});

module.exports = router;
