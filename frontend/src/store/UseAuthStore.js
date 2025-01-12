import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import {io} from "socket.io-client"

const BASE_URL =import.meta.env.MODE == "development" ? "http://localhost:8080" : "/"

export const UseAuthStore = create((set,get) => ({
    authUser: null,
    isSigninUp: false,
    isLoginIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    socket:null,
    
    signUp: async (data) => {
        set({ isSigninUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success("Account Create Successfully")

            get().connectSocket()

        }
        catch (err) {
            toast.error(err.response.data.message)
        }
        finally {
            set({ isSigninUp: false })
        }
          
        
    },
    login: async (data) => {
        set({ isLoginIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success("Logged in Successfully")

            get().connectSocket()
        }
        catch (err) {
            toast.error(err.response.data.message)
        }
        finally {
            set({ isLoginIn: false })
        }
          
        
    },

    logout:async()=>{
        try{
            axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logged out Successfully.")
            get().disconnectSocket()
        }
        catch(err){
            toast.error(err.response.data.message)
        }
    },
    

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data })
            get().connectSocket()
        }
        catch (error) {
            console.log("Error in CheckAuth: ", error.message)
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    updateProfile : async(data)=>{
        set({isUpdatingProfile:true})
        try{
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile update Successfully")
        }
        catch(err){
            console.log("Error in Update Profile",err)
            toast.error(err.response.data.message)
        }
        finally{
            set({ isUpdatingProfile:false})
        }
    },
    
    connectSocket:()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{
            query:{
                userId: authUser._id
            }
        })
        socket.connect()

        set({ socket:socket});

        socket.on("getOnlineUsers", (userIds)=>{
            set({ onlineUsers: userIds})
        })
    },

    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect()
    },
  
}))
