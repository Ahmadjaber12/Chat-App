import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.js";
import * as messagesController from "../conrollers/messages.controller.js"
const router=Router()

router.get("/messages/users",protectedRoute,messagesController.getUsersForSidebar);
router.get("/messages/:id",protectedRoute,messagesController.getMessages);
router.post("/messages/:id",protectedRoute,messagesController.sendMessages);


export default router;