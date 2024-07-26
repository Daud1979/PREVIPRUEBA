import { application } from 'express';
import {getConnection} from '../database/connection.js';
import sql from 'mssql';
let result;

export const postespecialidad =async (req,res)=>{
    const pool = await getConnection();//funcion await
    const result = await pool.request().query('select * from ESPECIALIDAD ORDER BY Especialidad'); //consulta sql
    res.json(result.recordset);
}

export const postregistrarUsuario =async (req,res)=>{
    const pool = await getConnection();//funcion await
    const {
        nif,
        nombre,
        apellidos,
        telefono,
        email,
        titulacion,
        especialidad,
        ubicacion,
        hrsanual
    }=req.body;
    console.log(req.body);
    const result = await pool.request()
    .input('nif',sql.VarChar,nif)
    .input('nombre',sql.VarChar,nombre)
    .input('apellidos',sql.VarChar,apellidos)
    .input('telefono',sql.VarChar,telefono)
    .input('email',sql.VarChar,email)
    .input('titulacion',sql.VarChar,titulacion)
    .input('Especialidad',sql.VarChar,especialidad)
    .input('Ubicacion',sql.VarChar,ubicacion)
    .input('HrAnual',sql.Decimal(12,2),hrsanual)
    .query(`INSERT INTO USUARIO (nif,nombre,apellidos,telefono,email,titulacion,Especialidad,Ubicacion,HrAnual,registro,estado) VALUES (@nif,@nombre,@apellidos,@telefono,@email,@titulacion,@Especialidad,@Ubicacion,@HrAnual,GETDATE(),'H')`); //consulta sql
    res.json(result);
}

export const postsearchUsuario = async (req,res)=>{
    const pool = await getConnection();//funcion await
    const {search} = req.body;     
    const result = await pool.request().input('search',sql.VarChar,search).query(`select nif,nombre,apellidos,telefono,email,titulacion,Especialidad=e.Especialidad,Ubicacion,HrAnual,registro=FORMAT(registro, 'yyyy-MM-dd'),estado=case when estado='H' then 'Habilitado' else 'Deshabilitado' end,idUsuario from USUARIO u inner join ESPECIALIDAD e on (u.Especialidad = e.idEspecialidad) WHERE nombre LIKE '%' + @search + '%' or apellidos LIKE '%' + @search + '%' or nif LIKE '%' + @search + '%' order by nombre,apellidos`); //consulta sql
    res.json(result.recordset);
    //res.render('empresa', { empresas: result.recordset });
}

export const postupdateUsuario = async (req,res)=>{
    const {atributo,id,valor} = req.body;    
    const pool = await getConnection();
// nif,nombre,apellidos,telefono,email,titulacion,Ubicacion,HrAnual       
    switch(atributo) {
        case 'tdnif_':
            console.log(id);   
            result = await pool.request()
            .input('nif', sql.VarChar, valor)
            .input('idUsuario', sql.VarChar, id)
            .query(`UPDATE USUARIO SET nif=@nif WHERE idUsuario=@idUsuario`);
            break;        
        case 'tdnombre_':
            result = await pool.request()
            .input('nombre', sql.VarChar, valor)
            .input('idUsuario', sql.VarChar, id)
            .query(`UPDATE USUARIO SET nombre=@nombre WHERE idUsuario=@idUsuario`);
            break;     
        case 'tdapellidos_':
            result = await pool.request()
            .input('apellidos', sql.VarChar, valor)
            .input('idUsuario', sql.VarChar, id)
            .query(`UPDATE USUARIO SET apellidos=@apellidos WHERE idUsuario=@idUsuario`);
            break;
        case 'tdtelefono_':            
            result = await pool.request()
            .input('telefono', sql.VarChar, valor)
            .input('idUsuario', sql.Int, id)
            .query(`UPDATE USUARIO SET telefono=@telefono WHERE idUsuario=@idUsuario`);
            break;
        case 'tdemail_':
            result = await pool.request()
            .input('email', sql.VarChar, valor)
            .input('idUsuario', sql.VarChar, id)
            .query(`UPDATE USUARIO SET email=@email WHERE idUsuario=@idUsuario`);
            break;
        case 'tdtitulacion_':
            result = await pool.request()
            .input('titulacion', sql.VarChar, valor)
            .input('idUsuario', sql.VarChar, id)
            .query(`UPDATE USUARIO SET titulacion=@titulacion WHERE idUsuario=@idUsuario`);
            break;
        case 'tdUbicacion_':
            result = await pool.request()
            .input('Ubicacion', sql.VarChar, valor)
            .input('idUsuario', sql.VarChar, id)
            .query(`UPDATE USUARIO SET Ubicacion=@Ubicacion WHERE idUsuario=@idUsuario`);
            break;
        case 'tdHrAnual_':
            result = await pool.request()
            .input('HrAnual', sql.Decimal(12,2), valor)
            .input('idUsuario', sql.VarChar, id)
            .query(`UPDATE USUARIO SET HrAnual=@HrAnual WHERE idUsuario=@idUsuario`);
            break;       
        default:
            result ='Error';
    }
    res.json(result);           
    
    
}

export const postcargarEspecialidad = async (req,res)=>{
    const pool   = await getConnection();//funcion await
    const result = await pool.request().query(`select * from ESPECIALIDAD order by Especialidad`); //consulta sql
    res.json(result.recordset);//retornamos el resultado en formato json
}
export const postupdateEstadoEspeacialidadUsuario = async (req,res)=>{
    const {idEspecialidad,estado,idUsuario} = req.body;      
    const pool = await getConnection();    
    result = await pool.request()
    .input('idEspecialidad', sql.Int, idEspecialidad)
    .input('idUsuario', sql.Int, idUsuario)
    .input('estado', sql.VarChar, estado)
    .query(`UPDATE USUARIO SET estado=@estado,Especialidad=@idEspecialidad WHERE idUsuario = @idUsuario`);
    res.json(req.body);               
}
