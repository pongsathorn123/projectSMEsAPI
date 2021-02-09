const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');

router.get("/:username/:password", async (req, res) => {
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

module.exports = router;
