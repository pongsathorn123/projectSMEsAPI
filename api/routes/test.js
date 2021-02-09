const express = require('express');
const router = express.Router();
const connect = require('../../core/connect');

router.get("/login/:username/:password", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;

    const sql = `SELECT user_id,name
                FROM user 
                WHERE ( username='${username}' )
                AND ( password='${password}');`;
    let response = await connect.promiseQuery(sql);
    if(response.length === 1){
        res.status(200).json( {   
            check: response.length,
            id: response[0].user_id,
            name: response[0].name
        });
    }else{
        res.status(200).json( {   
            check: "not found"
        });
    }


});

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

router.get("/insert/:username/:password/:name", async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const name = req.params.name;
    let sql = `INSERT INTO user(username, password, name) VALUES (?,?,?);`;
    let response;
    if (username === undefined || password === undefined || name === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    } 
    else {
        if (username != "") {
            sql = `INSERT INTO user(username, password, name) VALUES (?,?,?);`;
            response = await connect.promiseQuery(sql, [username, password, name]);
        }
        else {
            response = await connect.promiseQuery(sql, [username, password, name]);
        }
        res.status(200).json(response);
    }
});

module.exports = router;
