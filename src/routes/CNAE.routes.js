import { Router } from "express";
const router = Router();
router.get('/CNAE',(req,res)=>{
    res.render('CNAE');
})
export default router;