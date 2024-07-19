import { Router } from "express";
import {getUser} from '../controllers/login.controllers.js'
const router = Router();
router.get('/user',getUser);
export default router;