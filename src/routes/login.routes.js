import { Router } from "express";
import {getLogin,postLogin} from '../controllers/login.controllers.js'
const router = Router();
router.get("/user/login",getLogin);
router.post("/user/access",postLogin);
export default router;