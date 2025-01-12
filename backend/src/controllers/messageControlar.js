import User from "../models/userModel.js"
import Message from "../models/messageModel.js"
import cloudinary from "../libs/cloudinary.js"
import { getReceiverSocketId, io } from "../libs/socket.js"


export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filterUsers)
    }
    catch (err) {
        console.log("Error in message controller", err.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getMessages = async (req, res) => {
    try {

        const itsMe = await User.findById(req.user._id)
        const anotherOne = await User.findById(req.params.id)

        const messages = await Message.find({
            $or:[
                {
                    senderId:itsMe._id,
                    receiveId:anotherOne._id
                },
                {
                    senderId:anotherOne._id,
                    receiveId:itsMe._id
                    
                }
            ]
        })
        res.status(200).json(messages)
    }
    catch (err) {
        console.log("Error in Messages controller", err.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const sendMessage = async(req,res)=>{
    try{
        const {text,image} = req.body;
        const {id: receiveId} = req.params;
        const senderId = req.user._id;

        let imgUrl;
        
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imgUrl = uploadResponse.secure_url;
        }
        
        
        const newMessage = new Message({
            senderId,
            receiveId,
            text,
            image:imgUrl,
        })
        await newMessage.save()

        
        //todo: realtime fungsnality goes here => soket.io
        const receiverSocketId = getReceiverSocketId(receiveId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)

    }
    catch(err){
        console.log("Error in sendMessage controller", err.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}