import { Router } from "express";
import {postregistrarCentro,verificarCentro, getEmpresas,getAllEmpresas,postverificarempresa,postregistrarempresa,updateEmpresa,postEmpresaSearch,postempresaobtenerempresa} from '../controllers/empresa.controllers.js'
const router = Router();
//selecionamos todas las empresas
router.get('/empresas',getEmpresas);
router.get('/empresas/all', getAllEmpresas);
//seleccionamos una sola empresa
router.post('/search',postEmpresaSearch);

router.post('/empresas',(req,res)=>{// creando una empresa nueva
    res.send('crea empresas');
});
router.post('/empresas/obtener', postempresaobtenerempresa);
router.delete('/empresas/:id', ()=>{//eliminar o dar de baja empresa
    res.send('elimina empresas');
});
//verificar si la empresa ya existe en la bd
router.post('/verificarempresa',postverificarempresa);
//verificar la empresa luego de verificar en la bd
router.post('/registrarempresa', postregistrarempresa);
router.post('/updateEmpresa',updateEmpresa);
/*aqui lo de centro*/
router.post('/verificarcentro',verificarCentro);
router.post('/registrarcentro',postregistrarCentro);
export default router;