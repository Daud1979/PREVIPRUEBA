import {getConnection} from '../database/connection.js';
import sql from 'mssql';
let result;

export const getEmpresas =async (req,res )=>{
    const pool = await getConnection();//funcion await
    const result = await pool.request().query('SELECT razonSocial,grupoEmpresarial,CIF,CNAE,descripcionCNAE,ntrabajadorEmpresa,direccionEmpresa,encargadoEmpresa,email,telefono,ciudad,codigopostal,idEmpresa FROM EMPRESA ORDER BY razonSocial'); //consulta sql
    res.render('empresa');
  
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
//buscado de empresa por cif, nombre empresa y encargado
export const postEmpresaSearch = async (req,res)=>{
    const pool = await getConnection();//funcion await
    const {search} = req.body;     
    const result = await pool.request().input('search',sql.VarChar,search).query(`SELECT razonSocial,grupoEmpresarial,CIF,CNAE,descripcionCNAE,ntrabajadorEmpresa,direccionEmpresa,encargadoEmpresa,email,telefono,ciudad,codigopostal,idEmpresa FROM EMPRESA WHERE razonSocial LIKE '%' + @search + '%' or CIF LIKE '%' + @search + '%' or encargadoEmpresa LIKE '%' + @search + '%' ORDER BY razonSocial`); //consulta sql
    res.json(result.recordset);
    //res.render('empresa', { empresas: result.recordset });
}

export const postverificarempresa = async (req,res)=>{
    const pool   = await getConnection();//funcion await
    const { razonsocial,CIF } = req.body;
    const result = await pool.request().input('CIF', sql.VarChar, CIF).input('razonSocial', sql.VarChar, razonsocial).query(`SELECT * FROM EMPRESA WHERE razonSocial=@razonSocial and CIF=@CIF and razonSocial=@razonSocial`); //consulta sql
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
            .input('idEmpresa', sql.VarChar, id)
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

export const postempresaobtenerempresa = async (req,res)=>{
    const pool   = await getConnection();//funcion await
    const { idEmpresa } = req.body;
    const result = await pool.request().input('idEmpresa', sql.VarChar, idEmpresa).query(`SELECT * FROM EMPRESA WHERE  idEmpresa=@idEmpresa`); //consulta sql
    res.json(result.recordset);//retornamos el resultado en formato json
}

export const verificarCentro = async (req,res)=>{
    const pool   = await getConnection();//funcion await
    const { razonSocial,CIF,nombreCentro } = req.body;
    
    const result = await pool.request()
    .input('nombreCentro',sql.VarChar,nombreCentro)
    .input('CIF', sql.VarChar, CIF)
    .input('razonSocial', sql.VarChar, razonSocial)
    .query(`SELECT * FROM CENTROSEMPRESAS c inner join EMPRESA e on (c.idEmpresa=e.idEmpresa) WHERE  CIF=@CIF and razonSocial=@razonSocial`); //consulta sql
    res.json(result);//retornamos el resultado en formato json
}

export const postregistrarCentro = async (req, res)=>{
    const pool = await getConnection();
    const {
        nombreCentro,
        encargadoCentro,
        ciudadCentro,
        telefonoCentro,
        codigopostalCentro,
        direccionCentro,
        emailCentro,
        ntrabajadorCentro,
        idEmpresa
        } =req.body;
        
         const result = await pool.request()
         .input('nombreCentro', sql.VarChar,  nombreCentro)
         .input('encargadoCentro', sql.VarChar,  encargadoCentro)
         .input('ciudadCentro', sql.VarChar, ciudadCentro)
         .input('telefonoCentro', sql.VarChar, telefonoCentro)
         .input('codigopostal', sql.Int, codigopostalCentro)
         .input('direccionCentro', sql.VarChar, direccionCentro)
         .input('emailCentro', sql.VarChar,  emailCentro)
         .input('ntrabajadorCentro', sql.Int, ntrabajadorCentro)
         .input('idEmpresa', sql.Int, idEmpresa)        
         .query(`INSERT INTO CENTROSEMPRESAS ( 
            nombreCentro,
            direccionCentro,           
            ntrabajadorCentro,
            idEmpresa,
            estado,
            ciudad,  
            codigopostal,        
            encargadoCentro,
            emailCentro,
            telefonoCentro            
            ) VALUES (
            ltrim(rtrim(@nombreCentro)),
            ltrim(rtrim(@direccionCentro)),
            ltrim(rtrim(@ntrabajadorCentro)),
            ltrim(rtrim(@idEmpresa)),
            'H',    
            ltrim(rtrim(@ciudadCentro)),      
            ltrim(rtrim(@codigopostal)),           
            ltrim(rtrim(@encargadoCentro)),
            ltrim(rtrim(@emailCentro)),            
            ltrim(rtrim(@telefonoCentro))      
        ); SELECT SCOPE_IDENTITY() AS idCentro`);
        res.json(result);
} 

export const postlistarCentro= async (req,res)=>{
    const {idEmpresa}=req.body;
    const pool = await getConnection();
    const result = await pool.request().input('idEmpresa',sql.Int,idEmpresa).query('select nombreCentro,encargadoCentro,ciudad,codigopostal,direccionCentro,telefonoCentro,emailCentro,ntrabajadorCentro,estado,idCentro from CENTROSEMPRESAS where idEmpresa=@idEmpresa'); //consulta sql
    res.json(result.recordset);//retornamos el resultado en formato json
}

export const postupdateCentro = async (req,res)=>{
    const {atributo,id,valor} = req.body;    
    
     const pool = await getConnection();    
    switch(atributo) {
         case 'tdnombreCentro_':            
             result = await pool.request()
             .input('nombreCentro', sql.VarChar, valor)
             .input('idCentro', sql.Int, id)
             .query(`UPDATE CENTROSEMPRESAS SET nombreCentro = @nombreCentro WHERE idCentro = @idCentro`);
             break;        
         case 'tdencargadocentro_':
             result = await pool.request()
             .input('encargadoCentro', sql.VarChar, valor)
             .input('idCentro', sql.Int, id)
             .query(`UPDATE CENTROSEMPRESAS SET encargadoCentro = @encargadoCentro WHERE idCentro = @idCentro`);
             break;     
         case 'tdciudadcentro_':
             result = await pool.request()
             .input('ciudad', sql.VarChar, valor)
             .input('idCentro', sql.Int, id)
             .query(`UPDATE CENTROSEMPRESAS SET ciudad = @ciudad WHERE idCentro = @idCentro`);
             break;
         case 'tdcp_':
             result = await pool.request()
             .input('codigopostal', sql.VarChar, valor)
             .input('idCentro', sql.Int, id)
             .query(`UPDATE CENTROSEMPRESAS SET codigopostal = @codigopostal WHERE idCentro = @idCentro`);
             break;
         case 'tddireccioncentro_':
             result = await pool.request()
             .input('direccionCentro', sql.VarChar, valor)
             .input('idCentro', sql.Int, id)
             .query(`UPDATE CENTROSEMPRESAS SET direccionCentro = @direccionCentro WHERE idCentro = @idCentro`);
             break;
         case 'tdtelefonocentro_':
             result = await pool.request()
             .input('telefonoCentro', sql.VarChar, valor)
             .input('idCentro', sql.Int, id)
             .query(`UPDATE CENTROSEMPRESAS SET telefonoCentro = @telefonoCentro WHERE idCentro = @idCentro`);
             break;
         case 'tdemailcentro_':
             result = await pool.request()
             .input('emailCentro', sql.VarChar, valor)
             .input('idCentro', sql.Int, id)
             .query(`UPDATE CENTROSEMPRESAS SET emailCentro = @emailCentro WHERE idCentro = @idCentro`);
             break;      
         default:
             result ='Error';
    }
    res.json(result);           
    
    
}