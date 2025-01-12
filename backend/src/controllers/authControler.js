import bcrypt from "bcryptjs"
import User from "../models/userModel.js"
import { generateToken } from "../utils/utils.js";
import cloudinary from "../libs/cloudinary.js"


export const handleSignUp = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        if (!fullname || !password || !email) {
            res.status(400).json({ "message": "All fields are required." })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 charectors" })
        }
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({ message: "You have Already an Account. Please Login" })
        }
        else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    const newUser = await User.create({
                        fullname,
                        email,
                        password: hash
                    })
                    if (!newUser) {
                        return res.status(400).json({ "message": "Invalid User data." })
                    }
                    // genrate jwt token 
                    generateToken(newUser, res)
                    await newUser.save()
                    res.status(201).json(newUser)
                })
            })
        }

    }
    catch (err) {
        console.log("Error in Singup controller", err.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ "message": "Invalid credentials" })
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                return res.status(400).json({ "message": "Invalid credentials" })
            }
            generateToken(user,res)
            res.status(200).json(user)
        })
    }
    catch (err) { 
        console.log("Error in Login controller", err.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const handleLogout = (req, res) => {
    try{
        res.cookie("token", "",{maxAge:0})
        res.status(200).json({'message':"Logged out Successfully."})
    }
    catch(err){
        console.log("Error in logout controller", err.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const handleUpdateUser = async(req, res) => {
    try{
       const {profilePic} = req.body;
       const usreId = req.user._id;

       if(!profilePic){
        return res.status(400).json({"message": "Profile picture is required."})
       }
     const uploadResponse =  await cloudinary.uploader.upload(profilePic)
       const updatedUser = await User.findByIdAndUpdate(usreId,{profilePic:uploadResponse.secure_url},{new:true})

       res.status(200).json(updatedUser)
    }
    catch(err){
        console.log("Error in Update controller", err.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const handleCheckAuth = async(req, res) => {
    try{
        res.status(200).json(req.user)
    }
    catch(err){
        console.log("Error in Check controller", err.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
