import sql from 'mssql'
const dbconfig = {
   user: 'sa',
   password: '123456',
   server:'DESKTOP-M8N10JV\\MSSQLSERVER01',
    //server: 'PROPIO\\SQLEXPRESS01', // Puedes usar 'localhost\\nombre_instancia' para instancias locales
    database: 'PREVIWORK',
    options: {
        encrypt: false, // volver a true si esta encryptada
        trustServerCertificate: true // Cambia a true para evitar problemas de certificados en desarrollo
     }
     //,authentication: {
    //     type: 'ntlm',
    //     options: {
    //         domain: 'DAUDGRUPO', // Dominio de Windows
    //         userName: 'Daud', // Nombre de usuario de Windows
    //         password: 'dautes1'  // Contraseña de usuario de Windows
    //     }
    //}
};
export const getConnection = async()=>{
    try {
        const pool = await sql.connect(dbconfig);               
        return pool;
    } catch (error) {
        console.log(`se produjo un error ${error}`);                
    }
}
getConnection();
