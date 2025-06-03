import { Router } from "express";
const router = Router();
import { getUserHistory,addToHistory, login, register } from "../controllers/user.controller.js";

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/add_to_activity").post(addToHistory);
router.route("/get_all_activity").get(getUserHistory);
export default router;
