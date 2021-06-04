const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');


router.get("/edit/:smesId/:title/:description/:dateStart/:dateEnd/:moneyMin/:moneyMax/:detail/:name/:tel/:email/:facebook/:lineid", async (req, res) => {

    const smesId = req.params.smesId;
    const title = req.params.title;
    const description = req.params.description;
    const dateStart = req.params.dateStart;
    const dateEnd = req.params.dateEnd;
    const moneyMin = req.params.moneyMin;
    const moneyMax = req.params.moneyMax;
    const detail = req.params.detail;
    const name = req.params.name;
    const tel = req.params.tel;
    const email = req.params.email;
    const facebook = req.params.facebook;
    const lineid = req.params.lineid;
 
    let sql = `UPDATE smes 
               SET title = '${title}', description = '${description}', authorize = 'unverified'
               WHERE  smesId = '${smesId}';
               UPDATE smesdetail 
               SET dateStart = '${dateStart}', dateEnd = '${dateEnd}', moneyMin = '${moneyMin}', moneyMax = '${moneyMax}', detail = '${detail}', name = '${name}', tel = '${tel}', email = '${email}', facebook = '${facebook}', lineid = '${lineid}'
               WHERE  smesId = '${smesId}';`;
    const response = await connect.promiseQuery(sql, [title, description, smesId, dateStart, dateEnd, moneyMin, moneyMax, detail, name, tel, email, facebook, lineid]);
    res.status(200).json(response);

    // let sql2 = `UPDATE smesdetail 
    //            SET dateStart = ?, dateEnd = ?, moneyMin = ?, moneyMax = ?, detail = ?, tel = ?, email = ?, facebook = ?, lineid = ?
    //            WHERE  detailId = ?`;
    // const response2 = await connect.promiseQuery(sql2, [dateStart, dateEnd, moneyMin, moneyMax, detail, tel, email, facebook, lineid]);
    // res.status(200).json(response2);
});

module.exports = router;
