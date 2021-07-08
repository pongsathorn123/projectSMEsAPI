const mysql = require('mysql2');

// const pool = mysql.createPool({
//     connectionLimit : 10,
//     host     : 'test.cedtywdc51j1.us-east-2.rds.amazonaws.com',
//     // host     : '127.0.0.1',
//     user     : 'admin',
//     password : '11223344',
//     database : 'final-project',
//     port     : '3306',
//     debug    : false,
//     multipleStatements: true
// });      

const pool = mysql.createPool({
  connectionLimit : 10,
  host     : '127.0.0.1',
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
