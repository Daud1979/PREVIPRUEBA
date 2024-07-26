
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

export const updateEmpresa = async (req,res)=>{
    const {atributo,id,valor} = req.body;    
    const pool = await getConnection();
    
    switch(atributo) {
        case 'tdCIF':
            console.log(id);   
            result = await pool.request()
            .input('CIF', sql.VarChar, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET CIF = @CIF WHERE idEmpresa = @idEmpresa`);
            break;        
        case 'tdrazonSocial':
            result = await pool.request()
            .input('razonSocial', sql.VarChar, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET razonSocial = @razonSocial WHERE idEmpresa = @idEmpresa`);
            break;     
        case 'tdgrupoEmpresarial':
            result = await pool.request()
            .input('grupoEmpresarial', sql.VarChar, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET grupoEmpresarial = @grupoEmpresarial WHERE idEmpresa = @idEmpresa`);
            break;
        case 'tdntrabajadorEmpresa':
            
            result = await pool.request()
            .input('ntrabajadorEmpresa', sql.Int, valor)
            .input('idEmpresa', sql.Int, id)
            .query(`UPDATE EMPRESA SET ntrabajadorEmpresa = @ntrabajadorEmpresa WHERE idEmpresa = @idEmpresa`);
            break;
        case 'tdCNAE':
            result = await pool.request()
            .input('CNAE', sql.VarChar, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET CNAE = @CNAE WHERE idEmpresa = @idEmpresa`);
            break;
        case 'tddescripcionCNAE':
            result = await pool.request()
            .input('descripcionCNAE', sql.VarChar, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET descripcionCNAE = @descripcionCNAE WHERE idEmpresa = @idEmpresa`);
            break;
        case 'tddireccionEmpresa':
            result = await pool.request()
            .input('direccionEmpresa', sql.VarChar, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET direccionEmpresa = @direccionEmpresa WHERE idEmpresa = @idEmpresa`);
            break;
        case 'tdencargadoEmpresa':
            result = await pool.request()
            .input('encargadoEmpresa', sql.VarChar, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET encargadoEmpresa = @encargadoEmpresa WHERE idEmpresa = @idEmpresa`);
            break;
        case 'tdemail':
            result = await pool.request()
            .input('email', sql.VarChar, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET email = @email WHERE idEmpresa = @idEmpresa`);
            break;
        case 'tdtelefono':
            result = await pool.request()
            .input('telefono', sql.Int, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET telefono = @telefono WHERE idEmpresa = @idEmpresa`);
            break;
        case 'tdciudad':
            result = await pool.request()
            .input('ciudad', sql.VarChar, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET ciudad = @ciudad WHERE idEmpresa = @idEmpresa`);
            break;
        case 'tdcodigopostal':
            result = await pool.request()
            .input('codigopostal', sql.Int, valor)
            .input('idEmpresa', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET codigopostal = @codigopostal WHERE idEmpresa = @idEmpresa`);
            break;       
        default:
            result ='Error';
    }
    res.json(result);           
    
    
}

export const postupdateCNAE = async (req,res)=>{
    const {atributo,id,valor} = req.body;    
    const pool = await getConnection();
    
    switch(atributo) {
        case 'tdCNAE_':          
            result = await pool.request()
            .input('CNAE', sql.VarChar, valor)
            .input('idCNAE', sql.VarChar, id)
            .query(`UPDATE CNAE SET CNAE=@CNAE  WHERE idCNAE=@idCNAE`);
            break;        
        case 'tddescripcionCNAE_':
            result = await pool.request()
            .input('descripcionCNAE', sql.VarChar, valor)
            .input('idCNAE', sql.VarChar, id)
            .query(`UPDATE CNAE SET descripcionCNAE=@descripcionCNAE  WHERE idCNAE=@idCNAE`);
            break;     
        case 'tdtarifaCNAE_':
            result = await pool.request()
            .input('tarifa', sql.Decimal(12,2), valor)
            .input('idCNAE', sql.VarChar, id)
            .query(`UPDATE CNAE SET tarifa=@tarifa  WHERE idCNAE=@idCNAE`);
            break;
        case 'tdcomplejidadPreventiva_':
            
            result = await pool.request()
            .input('complejidadPreventiva', sql.Int, valor)
            .input('idCNAE', sql.Int, id)
            .query(`UPDATE CNAE SET complejidadPreventiva=@complejidadPreventiva  WHERE idCNAE=@idCNAE`);
            break;
        case 'tdcodigoComplejidad_':
            result = await pool.request()
            .input('codigoComplejidad', sql.VarChar, valor)
            .input('idCNAE', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET codigoComplejidad = @codigoComplejidad WHERE idEmpresa = @idEmpresa`);
            break;
        case 'tdgrupo_':
            result = await pool.request()
            .input('grupo', sql.VarChar, valor)
            .input('idCNAE', sql.VarChar, id)
            .query(`UPDATE EMPRESA SET grupo = @grupo WHERE idEmpresa = @idEmpresa`);
            break;      
        default:
            result ='Error';
    }
    res.json(result);           
    
    
}