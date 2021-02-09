const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');

router.get("/check/:username", async (req, res) => {
    let username = req.params.username;

    const sql = `SELECT username,name 
                 FROM user 
                 WHERE username = '${username}'`;
    if (username === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    } 
    else {
        const response = await connect.promiseQuery(sql);
        if(response.length === 0){
            console.log("Not Found!");
            res.json(response);
          }else{
            res.json(response);
          }
          res.end();
    }
});

router.get("/insert/:username/:password/:name/:email/:tel/:address/:citizen_id/:user_type", async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const name = req.params.name;
    const email = req.params.email;
    const tel = req.params.tel;
    const address = req.params.address;
    const citizen_id = req.params.citizen_id;
    const user_type = req.params.user_type;
 
    let sql = `INSERT INTO user(username, password, name, email, tel, address, citizenId, userType) VALUES (?,?,?,?,?,?,?,?);`;
    let response;
    if (username === undefined || password === undefined || name === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    } 
    else {
        if (username != "") {
            sql = `INSERT INTO user(username, password, name, email, tel, address, citizenId, userType) VALUES (?,?,?,?,?,?,?,?);`;
            response = await connect.promiseQuery(sql, [username, password, name, email, tel, address, citizenId, userType]);
        }
        else {
            response = await connect.promiseQuery(sql, [username, password, name, email, tel, address, citizenId, userType]);
        }
        res.status(200).json(response);
    }
});

// router.get("/insert/:username/:password/:name/:email", async (req, res) => {
//     const username = req.params.username;
//     const password = req.params.password;
//     const name = req.params.name;
//     const email = req.params.email;
   
//     let sql = `INSERT INTO user(username, password, name, email, tel) VALUES (?,?,?,?);`;
//     let response;
//     if (username === undefined || password === undefined || name === undefined || email === undefined) {
//         res.json({ error: "variable is undefined" });
//         return;
//     } 
//     else {
//         if (username != "") {
//             sql = `INSERT INTO user(username, password, name, email) VALUES (?,?,?,?);`;
//             response = await connect.promiseQuery(sql, [username, password, name, email,]);
//         }
//         else {
//             response = await connect.promiseQuery(sql, [username, password, name, email]);
//         }
//         res.status(200).json(response);
//     }
// });

module.exports = router;
