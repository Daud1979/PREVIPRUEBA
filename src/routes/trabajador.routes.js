import { Router } from "express";
const router = Router();
import {postespecialidad,postregistrarUsuario,postsearchUsuario,postupdateUsuario,postcargarEspecialidad,postupdateEstadoEspeacialidadUsuario} from '../controllers/trabajador.controllers.js'
router.get('/usuarios',(req,res)=>{
    res.render('trabajador');
})
router.post('/especialidad',postespecialidad);
router.post('/registrarUsuario',postregistrarUsuario);
router.post('/searchUsuario',postsearchUsuario);
router.post('/updateUsuario',postupdateUsuario);
router.post('/cargarEspecialidad',postcargarEspecialidad);
router.post('/updateEstadoEspeacialidadUsuario',postupdateEstadoEspeacialidadUsuario);
export default router;