import { Router } from "express";
import {getEmpresa, getEmpresas,getAllEmpresas,postverificarempresa,postregistrarempresa} from '../controllers/empresa.controllers.js'
const router = Router();
//selecionamos todas las empresas
router.get('/empresas',getEmpresas);
router.get('/empresas/all', getAllEmpresas);
//seleccionamos una sola empresa
router.get('/empresas/:id',getEmpresa);

router.post('/empresas',(req,res)=>{// creando una empresa nueva
    res.send('crea empresas');
});
router.put('/empresas/:id', (req,res)=>{//modificando empresa
    res.send('modifica empresa');
});
router.delete('/empresas/:id', ()=>{//eliminar o dar de baja empresa
    res.send('elimina empresas');
});
//verificar si la empresa ya existe en la bd
router.post('/verificarempresa',postverificarempresa);
//verificar la empresa luego de verificar en la bd
router.post('/registrarempresa', postregistrarempresa);
export default router;