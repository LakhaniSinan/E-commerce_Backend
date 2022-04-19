const User = require("../model/user")
const Otp = require("../model/otp")
const express = require("express")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const router = express.Router()

let JWTSECRET = "MYNAMEISKHANANDIAMNOTATERRIOST"

router.post("/register", async (req, res) => {
    const { username, password, email, image, code } = req.body
    if (!image || !username || !password || !email) {
        res.status(400).send({
            status: "error",
            message: "Please enter complete information"
        })
    }
    let pass = await bcrypt.hash(password, 5)
    console.log(email, code, "VALUESS");
    let otp = await Otp.findOne({ email, otp: code })
    if (otp) {
        let currentTime = new Date().getTime()
        let remainingTime = otp.expiresIn - currentTime
        if (remainingTime < 0) {
            res.status(400).send({
                status: "error",
                message: "Otp has expired"
            })
        }
        else {
            try {
                let result = await User.create({
                    username,
                    password: pass,
                    email,
                    image
                })
                res.send({
                    status: "success",
                    message: "User Created Successfully"
                })
            } catch (error) {
                if (error.code == 11000) {
                    res.status(400).send({
                        status: "error",
                        message: "Email Already Exists"
                    })
                }
                else {
                    res.status(400).send({
                        status: "error",
                        message: "Something went wrong"
                    })
                }
            }
        }
    }
    else {
        res.status(400).send({
            status: "error",
            message: "Otp is invalid"
        })
    }
})

router.get("/allUsers", async (req, res) => {
    console.log("call");
    try {
        const users = await User.find().select("username email")
        res.send({
            status: "ok",
            data: users
        })
    } catch (error) {

    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    let result = await User.findOne({ email })
    if (result == null) {
        res.status(400).send({
            status: "error",
            message: "User does not exists"
        })
    }
    else {
        console.log(result.password, password, "PASSW");
        if (await bcrypt.compare(password, result.password)) {
            let token = jwt.sign({ id: result._id, name: result.username }, JWTSECRET)
            if (result.status != "Active") {
                res.status(400).send({
                    status: "error",
                    message: "Your Account is Temperory suspended please contact Support"
                })
            }
            else {
                result.password = null
                let params = {
                    result,
                    token
                }
                res.send({
                    status: "ok",
                    data: params
                })
            }
        }
        else {
            res.status(400).send({
                status: "ok",
                message: "Email Or Password is Incorrect"
            })
        }
    }
})


router.post("/sendCode", async (req, res) => {
    const { email } = req.body
    console.log("EMAIL");
    try {
        let otp = Math.floor(1000 + Math.random() * 9000)
        var mail = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "mobibancfirebase@gmail.com",
                pass: "Qwerty123**##"
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        let mailOptions = {
            from: "noreply@gmail.com",
            to: email,
            subject: "User Verification",
            text: `Your Verification code is ${otp}`
        }
        console.log(mailOptions, "mailOptions");

        let result = await Otp.create({
            email,
            otp,
            expiresIn: new Date().getTime() + 300 * 1000
        })

        mail.sendMail(mailOptions, (err, result) => {
            if (err) {
                console.log(err, "errr");
                res.send({
                    status: "error",
                    message: "Something went Wrong"
                })
            }
            else {
                console.log("calledddd");
                res.send({
                    status: "success",
                    message: "Verification Code has been sent to your email"
                })
            }
        })
    } catch (error) {
        console.log(error, "ERRRR");
    }

})

router.post("/forgotPassword", async (req, res) => {
    const { email, password } = req.body
    // User.findOne({email},async(err,res=>{

    // }))
    let result = await User.findOne({ email })
    if (result) {
        let hashedPassword = await bcrypt.hash(password, 10)
        let updateUser = await User.updateOne({ _id: result._id }, { $set: { password: hashedPassword } })
        res.status(200).send({ status: "ok", message: "Updated Successfully" })
    }
    else {
        res.status(400).send({ status: "error", message: "Email not found" })
    }
})

router.post('/updateProfile', async (req, res) => {
    const { email } = req.body
    let result = await User.findOne({ email })
    if (result) {
        let updatedUser = await User.findOneAndUpdate({ _id: result._id }, req.body, { new: true })
        res.send({
            status: "ok",
            data: updatedUser
        })
    }
    else {
        res.status(400).send({ status: "error", message: "Something went wrong" })
    }
})

router.post("/changePassword", async (req, res) => {
    const { password, email,newPassword } = req.body
    let result = await User.findOne({ email })
    if (result) {
        if (await bcrypt.compare(password, result.password)) {
            // console.log("password matched");
            let hashedPassword = await bcrypt.hash(newPassword, 10)
            let updateUser = await User.updateOne({ _id: result._id }, { $set: { password: hashedPassword } })
            res.status(200).send({ status: "ok", message: "Updated Successfully" })
            // result.password = null
            // let params = {
            //     result,
            //     token
            // }
            // res.send({
            //     status: "ok",
            //     data: params
            // })
        }
        else {
            res.status(400).send({
                status: "ok",
                message: "Current Password is Invalid"
            })
        }
    }
    else {

    }

})


module.exports = router