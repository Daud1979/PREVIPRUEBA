import {getConnection} from '../database/connection.js';
import sql from 'mssql';
export const getEmpresas =async (req,res )=>{
    const pool = await getConnection();//funcion await
    const result = await pool.request().query('SELECT razonSocial,grupoEmpresarial,CIF,CNAE,descripcionCNAE,direccionEmpresa,encargadoEmpresa,email,telefono,ciudad,codigopostal,idEmpresa FROM EMPRESA ORDER BY razonSocial'); //consulta sql
    res.render('empresa', { empresas: result.recordset });
  
}
export const getAllEmpresas = async(req,res) => {// lista de todas las empresas de manera asincrona
    const pool = await getConnection();//funcion await
    const result = await pool.request().query('SELECT razonSocial,grupoEmpresarial,CIF,CNAE,direccionEmpresa,encargadoEmpresa,email,telefono,ciudad,codigopostal FROM EMPRESA ORDER BY razonSocial'); //consulta sql
    res.json(result);//retornamos el resultado en formato json
}

export const getEmpresa = async(req,res) => {// lista de todas las empresas de manera asincrona  
    const pool   = await getConnection();//funcion await
    const idActividad = req.params.id;
    const result = await pool.request().query(`SELECT * FROM ACTIVIDADES WHERE idActividad=${idActividad}`); //consulta sql
    res.json(result);//retornamos el resultado en formato json
}
export const postverificarempresa = async (req,res)=>{
    const pool   = await getConnection();//funcion await
    const { razonsocial,CIF } = req.body;
    const result = await pool.request().input('CIF', sql.VarChar, CIF).input('razonSocial', sql.VarChar, razonsocial).query(`SELECT * FROM EMPRESA WHERE CIF=@CIF and razonSocial=@razonsocial`); //consulta sql
    res.json(result);//retornamos el resultado en formato json
}
export const postregistrarempresa = async (req, res)=>{
    const pool = await getConnection();
    const {
        razonsocial,
        CIF,
        grupoempresarial,
        CNAE,
        descripcionCNAE,
        ciudad,
        codigopostal,
        direccionempresa,
        encargado,
        emailempresa,
        ntrabajadoresempresa,
        telefonoempresa  } =req.body;
         const result = await pool.request()
         .input('razonSocial', sql.VarChar, razonsocial)
         .input('CIF', sql.VarChar, CIF)
         .input('grupoEmpresarial', sql.VarChar, grupoempresarial)
         .input('CNAE', sql.VarChar, CNAE)
         .input('descripcionCNAE', sql.VarChar, descripcionCNAE)
         .input('direccionEmpresa', sql.VarChar, direccionempresa)
         .input('encargadoEmpresa', sql.VarChar, encargado)
         .input('email', sql.VarChar, emailempresa)
         .input('telefono', sql.VarChar, telefonoempresa)
         .input('ntrabajadorEmpresa', sql.VarChar, ntrabajadoresempresa)
         .input('ciudad', sql.VarChar, ciudad)
         .input('codigopostal', sql.VarChar, codigopostal)
         .query(`INSERT INTO EMPRESA ( 
            razonSocial,
            grupoEmpresarial,
            CIF,
            CNAE,
            descripcionCNAE,
            direccionEmpresa,
            encargadoEmpresa,
            email,
            telefono,
            ntrabajadorEmpresa,
            fechaRegistro,
            ciudad,
            codigopostal
            ) VALUES (
            ltrim(rtrim(@razonSocial)),
            ltrim(rtrim(@grupoEmpresarial)),
            ltrim(rtrim(@CIF)),
            ltrim(rtrim(@CNAE)),
            ltrim(rtrim(@descripcionCNAE)),
            ltrim(rtrim(@direccionEmpresa)),
            ltrim(rtrim(@encargadoEmpresa)),
            ltrim(rtrim(@email)),
            ltrim(rtrim(@telefono)),
            ltrim(rtrim(@ntrabajadorEmpresa)),
            getdate(),
            ltrim(rtrim(@ciudad)),
            ltrim(rtrim(@codigopostal))
         ); SELECT SCOPE_IDENTITY() AS idEmpresa`);
        res.json(result);
} 