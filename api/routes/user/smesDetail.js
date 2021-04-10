const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');

router.get("/insert/:userId/:dateStart/:dateEnd/:moneyMax/:moneyMin/:detail/:tel/:email/:facebook/:lindid", async (req, res) => {

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
    

    let sql = `INSERT INTO smesdetail(userId, dateStart, dateEnd, moneyMax, moneyMin, detail, tel, email, facebook, lineid) VALUES (?,?,?,?,?,?,?,?,?,?);`;
    let response;
    if (dateStart === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    } 
    else {
        if (dateStart != "") {
            sql = `INSERT INTO smesdetail(userId, dateStart, dateEnd, moneyMax, moneyMin, detail, tel, email, facebook, lineid) VALUES (?,?,?,?,?,?,?,?,?,?);`;
            response = await connect.promiseQuery(sql, [userId, dateStart, dateEnd, moneyMax, moneyMin, detail, tel, email, facebook, lineid]);
        
        }
        else {
            response = await connect.promiseQuery(sql, [dateStart, dateEnd, moneyMax, moneyMin, detail, tel, email, facebook, lineid]);
        }
        res.status(200).json(response);
    }
});




module.exports = router;
