const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');


router.get("/edit/:smesId/:detailId/:title/:description/:dateStart/:dateEnd/:moneyMin/:moneyMax/:detail/:tel/:email/:facebook/:lineid", async (req, res) => {

    const smesId = req.params.smesId;
    const detailId = req.params.detailId;
    const title = req.params.title;
    const description = req.params.description;
    const dateStart = req.params.dateStart;
    const dateEnd = req.params.dateEnd;
    const moneyMin = req.params.moneyMin;
    const moneyMax = req.params.moneyMax;
    const detail = req.params.detail;
    const tel = req.params.tel;
    const email = req.params.email;
    const facebook = req.params.facebook;
    const lineid = req.params.lineid;
 
    let sql = `UPDATE smes 
               SET title = ?, description = ?, authorize = 'unverified'
               WHERE  smesId = ?;
               UPDATE smesdetail 
               SET dateStart = ?, dateEnd = ?, moneyMin = ?, moneyMax = ?, detail = ?, tel = ?, email = ?, facebook = ?, lineid = ?
               WHERE  detailId = ?;`;
    const response = await connect.promiseQuery(sql, [title, description, smesId, dateStart, dateEnd, moneyMin, moneyMax, detail, tel, email, facebook, lineid, detailId]);
    res.status(200).json(response);

    // let sql2 = `UPDATE smesdetail 
    //            SET dateStart = ?, dateEnd = ?, moneyMin = ?, moneyMax = ?, detail = ?, tel = ?, email = ?, facebook = ?, lineid = ?
    //            WHERE  detailId = ?`;
    // const response2 = await connect.promiseQuery(sql2, [dateStart, dateEnd, moneyMin, moneyMax, detail, tel, email, facebook, lineid]);
    // res.status(200).json(response2);
});

module.exports = router;
