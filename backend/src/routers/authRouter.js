import express from "express"
import { handleCheckAuth, handleLogin, handleLogout, handleSignUp, handleUpdateUser } from "../controllers/authControler.js"
import { protectRoute } from "../middlewares/protectRoute.js"

const router = express.Router()


router.post('/signup', handleSignUp)
router.post('/login', handleLogin)
router.post('/logout', handleLogout)

router.put("/update-profile",protectRoute , handleUpdateUser)
router.get("/check",protectRoute, handleCheckAuth)



export default router