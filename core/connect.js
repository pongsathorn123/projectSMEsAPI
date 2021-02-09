const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'final-project',
    port     : '3306',
    debug    : false,
    multipleStatements: true
});      

const promiseQuery = (sql, prepared_arr = []) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err, con) => {
        if (err) reject(err);
        con.query(sql, prepared_arr, (err, result) => {
          if (err) reject(err)
            resolve(result);
            con.release();
        });
      });
    });
  }
  

module.exports = {
    promiseQuery: promiseQuery,
    promiseQuery: promiseQuery
}
