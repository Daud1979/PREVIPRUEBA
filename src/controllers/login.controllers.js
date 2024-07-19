import {getConnection} from '../database/connection.js';
export const getLogin = (req,res)=>{
    res.render('login');
}
export const postLogin = (req, res)=>{
//aqui verificar al usuario
    res.render('seguimiento');
    //aqui hay que colocar elo seguimientocomp primer pagina
}