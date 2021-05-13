const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');


router.get("/data", async (req, res) => {
    const sql = `SELECT MAX(smesId) AS LastID FROM smes;`;
    let response = await connect.promiseQuery(sql);
    if(response.length === 1){
        res.status(200).json( {   
            check: response.length,
            smesId: response[0].LastID
        });
    }else{
        res.status(200).json( {   
            check: "not found"
        });
    }
});
  

router.get("/insert/:smesId/:userId/:dateStart/:dateEnd/:moneyMax/:moneyMin/:detail/:tel/:email/:facebook/:lineid", async (req, res) => {

    const smesId = req.params.smesId;
    const userId = req.params.userId;
    const dateStart = req.params.dateStart;
    const dateEnd = req.params.dateEnd;
    const moneyMax = req.params.moneyMax;
    const moneyMin = req.params.moneyMin;
    const detail = req.params.detail;
    const tel = req.params.tel;
    const email = req.params.email;
    const facebook = req.params.facebook;
    const lineid = req.params.lineid;


    let sql = `INSERT INTO smesdetail(smesId, userId, dateStart, dateEnd, moneyMax, moneyMin, detail, tel, email, facebook, lineid) VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
    let response;
    if (dateStart === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    } 
    else {
        if (dateStart != "") {
            sql = `INSERT INTO smesdetail(smesId, userId, dateStart, dateEnd, moneyMax, moneyMin, detail, tel, email, facebook, lineid) VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
            response = await connect.promiseQuery(sql, [smesId,userId, dateStart, dateEnd, moneyMax, moneyMin, detail, tel, email, facebook, lineid]);
        
        }
        else {
            response = await connect.promiseQuery(sql, [smesId,userId, dateStart, dateEnd, moneyMax, moneyMin, detail, tel, email, facebook, lineid]);
        }
        res.status(200).json(response);
    }
});




module.exports = router;
