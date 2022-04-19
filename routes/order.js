const express = require("express");
const router = express.Router();
const Order = require("../model/order");
const Product = require("../model/product");

router.post("/createOrder", async (req, res) => {
  const {
    userEmail,
    order,
    userId,
    orderId,
    totalBill,
    address,
    discount,
    status,
    city,
    Date,
  } = req.body;
  try {
    await Promise.all(
      order.map(async (singleOrder) => {
        let productData = await Product.findOne({ _id: singleOrder.productId });
        if (productData) {
          let newQuantity =
            parseInt(productData.quantity) - parseInt(singleOrder.quantity);
          let updateQuantity = await Product.findByIdAndUpdate(
            productData._id,
            { quantity: newQuantity }
          );
          console.log(req.body, "BODYYY");
        } else {
          //   res.status(400).send({
          //     status: "error",
          //     message: "Product Not available",
          //   });
        }
      })
    );
    const orderData = await Order.create({
      userEmail,
      order,
      userId,
      orderId,
      totalBill,
      address,
      discount,
      status,
      city,
      Date,
    });
    res.send({
      status: "ok",
      message: "Order Place Successfully",
    });
    console.log("i am done");
  } catch (error) {
    console.log(error, "ERRRRRRRRR");
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});

router.post("/cancelOrder", async (req, res) => {
  const { order } = req.body;
  try {
    await Promise.all(
      order.map(async (singleOrder) => {
        let productData = await Product.findOne({ _id: singleOrder.productId });
        if (productData) {
          let newQuantity =
            parseInt(productData.quantity) + parseInt(singleOrder.quantity);
          let updateQuantity = await Product.findByIdAndUpdate(
            productData._id,
            { quantity: newQuantity }
          );
          console.log(req.body, "BODYYY");
        } else {
          //   res.status(400).send({
          //     status: "error",
          //     message: "Product Not available",
          //   });
        }
      })
    );
    res.send({
      status: "ok",
      message: "Order Cancelled Successfully",
    });
    console.log("i am done");
  } catch (error) {
    console.log(error, "ERRRRRRRRR");
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});

router.post("/updateOrderStatus/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(req.params, req.body, "THINGSS");
  try {
    let updatedStatus = await Order.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    res.send({
      status: "ok",
      message: "Status Updated Successfully",
    });
  } catch (error) {}
});

router.get("/getOrder/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params, req.body, "THINGSS");
  try {
    let allOrders = await Order.find({ userId: id });
    res.send({
      status: "ok",
      data:allOrders,
    });
  } catch (error) {

  }
});

// router.get("/getCategory", async (req, res) => {
//     try {
//         const users = await Category.find()
//         res.send({
//             status: "ok",
//             data: users
//         })
//     } catch (error) {
//         res.status(400).send({
//             status: "error",
//             message: "Something went wrong"
//         })
//     }
// })

// router.put("/updateCategory/:id", async (req, res) => {
//     console.log(req.params, "PARMSSSSSS");
//     const { id } = req.params
//     try {
//         const updateCategory = await Category.findOneAndUpdate(id, req.body, { new: true })
//         res.send({ status: "ok", data: updateCategory })
//     } catch (error) {
//         res.status(400).send({
//             status: "error",
//             message: "Something went wrong"
//         })
//     }
// })

// router.delete("/deleteCategory/:id", async (req, res) => {
//     console.log(req.params, "PARMSSSSSS");
//     const { id } = req.params
//     try {
//         const deletedCategory = await Category.findOneAndDelete(id)
//         res.send({ status: "ok", data: "Deleted Successfully" })
//     } catch (error) {
//         res.status(400).send({
//             status: "error",
//             message: "Something went wrong"
//         })
//     }
// })

module.exports = router;
