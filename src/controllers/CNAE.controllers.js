
import {getConnection} from '../database/connection.js';
import sql from 'mssql';
let result;
export const postregistrarCNAE = async(req,res)=>{
    const {
        CNAE,
        descripcionCNAE,
        tarifa,
        complejidadPreventiva,
        codigoComplejidad,
        grupo
        } = req.body;      
    const pool = await getConnection();    
    result = await pool.request()
    .input('CNAE', sql.VarChar, CNAE)
    .input('descripcionCNAE', sql.VarChar, descripcionCNAE)
    .input('tarifa', sql.Decimal(12, 2), tarifa)
    .input('complejidadPreventiva', sql.VarChar, complejidadPreventiva)
    .input('codigoComplejidad', sql.VarChar, codigoComplejidad)
    .input('grupo', sql.VarChar, grupo)
    .query(`INSERT INTO CNAE (CNAE,descripcionCNAE,tarifa,complejidadPreventiva,codigoComplejidad,grupo) VALUES(ltrim(rtrim(@CNAE)),ltrim(rtrim(@descripcionCNAE)),ltrim(rtrim(@tarifa)),ltrim(rtrim(@complejidadPreventiva)),ltrim(rtrim(@codigoComplejidad)),ltrim(rtrim(@grupo)))`);
    res.json(req.body);  
}
export const postsearchCNAE =async (req,res)=>{
    const {
        search 
        } = req.body;            
    const pool = await getConnection();    
    result = await pool.request()
    .input('search', sql.VarChar, search)   
    .query(`select CNAE,descripcionCNAE,tarifa,complejidadPreventiva,codigoComplejidad,grupo,idCNAE from CNAE where CNAE LIKE '%' + @search + '%' OR descripcionCNAE LIKE '%' + @search + '%'`);   
    res.json(result.recordset);
}

export const posteliminarCNAE = async (req,res)=>{
    const {idCNAE} = req.body;
    const pool = await getConnection();    
    result = await pool.request()
    .input('idCNAE', sql.Int, idCNAE) 
    .query(`DELETE FROM CNAE WHERE idCNAE=@idCNAE`);
    res.json(req.body);
}