import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import {connectDB} from "./libs/db.js"
import cors from "cors"
import path from 'path'

import { app, server } from './libs/socket.js'

import authRouter from "./routers/authRouter.js"
import messageRoute from './routers/messageRoute.js'


dotenv.config()
const port = process.env.PORT
const __dirname = path.resolve()

// middleWare 
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(
    {
    origin:"http://localhost:5173",
    credentials: true,
    methods: 'GET,POST'
})
)

app.use('/api/auth',authRouter)
app.use('/api/messages',messageRoute)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist", "dist","index.html"))
    })
}


server.listen(port,()=>{
    console.log("Server is running at port :",`http://localhost:${port}`)
    connectDB()
        })
    