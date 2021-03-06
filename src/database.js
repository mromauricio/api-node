let mysql = require('mysql');
let util = require('util');

// let pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'mysql-container', //172.17.0.2
//     user: 'root',
//     password: 'pwdmysql',
//     database: 'eprontuario',
//     insecureAuth: true 
// });

let pool = mysql.createPool({
  connectionLimit: 10,
  host: 'database-test.c1a7jytzvqfa.sa-east-1.rds.amazonaws.com', 
  user: 'admin',
  password: 'pwdmysql',
  database: 'eprontuario',
  insecureAuth: true 
});


pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
    }
  }   
  
  if (connection) connection.release() 
  return
});

pool.query = util.promisify(pool.query);

module.exports = pool