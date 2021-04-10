const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');

router.get("/login/:username/:password", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;

    const sql = `SELECT userId,name,userType,username
                FROM user 
                WHERE ( username='${username}' )
                AND ( password='${password}');`;
    let response = await connect.promiseQuery(sql);
    if(response.length === 1){
        res.status(200).json( {   
            check: response.length,
            userId: response[0].userId,
            username: response[0].username,
            name: response[0].name,
            userType: response[0].userType
        });
    }else{
        res.status(200).json( {   
            check: "not found"
        });
    }
});

router.get("/info/:userId", async (req, res) => {
    let userId = req.params.userId;

    const sql = `SELECT userId,name,userType,username,password,tel,email,address,citizenId
                FROM user 
                WHERE ( userId='${userId}' );`;
    let response = await connect.promiseQuery(sql);
    if(response.length === 1){
        res.status(200).json( {   
            check: response.length,
            userId: response[0].userId,
            username: response[0].username,
            password: response[0].password,
            name: response[0].name,
            email: response[0].email,
            tel: response[0].tel,
            address: response[0].address,
            citizenId: response[0].citizenId,
            userType: response[0].userType
        });
    }else{
        res.status(200).json( {   
             check: "not found"
         });
    }
});

router.get("/edit/:userId/:password/:name/:email/:tel/:address", async (req, res) => {

    const userId = req.params.userId;
    const password = req.params.password;
    const name = req.params.name;
    const email = req.params.email;
    const tel = req.params.tel;
    const address = req.params.address;
 
    let sql = `UPDATE user 
               SET password = ?, name = ?, email = ?, tel = ?, address = ?
               WHERE  userId = ?`;
    const response = await connect.promiseQuery(sql, [password, name, email, tel, address, userId]);
    res.status(200).json(response);
});

module.exports = router;
