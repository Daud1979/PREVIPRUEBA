import sql from 'mssql'
// const dbconfig = {
//    user: 'sa',
//    password: 'qwerty123456',
//    //server:'DESKTOP-M8N10JV\\MSSQLSERVER01',
//     server: `database-1.cikxfjk42bkw.eu-west-3.rds.amazonaws.com,1433`, // Puedes usar 'localhost\\nombre_instancia' para instancias locales
//     database: 'PREVIWORK',
//     options: {
//         encrypt: true, // volver a true si esta encryptada
//         trustServerCertificate: true // Cambia a true para evitar problemas de certificados en desarrollo
//      }
//     //  ,authentication: {
//     //      type: 'ntlm',
//     //      options: {
//     //          domain: 'DAUDGRUPO', // Dominio de Windows
//     //          userName: 'Daud', // Nombre de usuario de Windows
//     //          password: 'dautes1'  // Contraseña de usuario de Windows
//     //      }
//     // }
// };
const dbconfig = {
    user: 'sa',
    password: 'qwerty123456',
    server: `database-1.cikxfjk42bkw.eu-west-3.rds.amazonaws.com`, // Puede ser una dirección IP o un nombre de dominio
    database: 'PREVIWORK',
    options: {
        encrypt: true, // Usar true si estás conectándote a través de Internet
        trustServerCertificate: true // Usar true solo si la conexión falla debido a problemas de certificados SSL
    }
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
