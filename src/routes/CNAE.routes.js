import { Router } from "express";
const router = Router();
import {postregistrarCNAE,postsearchCNAE,posteliminarCNAE} from '../controllers/CNAE.controllers.js'
router.get('/CNAE',(req,res)=>{
    res.render('CNAE');
})
router.post('/registrarCNAE',postregistrarCNAE);
router.post('/searchCNAE',postsearchCNAE);
router.post('/eliminarCNAE',posteliminarCNAE);

export default router;