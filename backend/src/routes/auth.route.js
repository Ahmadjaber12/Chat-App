import express from 'express'
import * as authController from '../conrollers/auth.controller.js'
import { protectedRoute } from '../middlewares/auth.js'
const router=express.Router()

router.post('/signup',authController.signup)

router.post('/login',authController.login)

router.post('/logout',authController.logout)

router.put("/profiles",protectedRoute,authController.updateProfile);

router.get("/check",protectedRoute,authController.checkAuth);
export default router;