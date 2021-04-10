const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');

router.get("/show", async (req, res) => {

    const sql = `SELECT *
                 FROM smes 
                 WHERE authorize = 'verified' 
                 ORDER BY smesId DESC`
    let response = await connect.promiseQuery(sql);
    let list = [];
    response.map((x,index) => {
        list.push({ 
            seq: index+1,
            smesId: x.smesId,
            userId: x.userId,
            title: x.title,
            dateStart: x.dateStart,
            dateEnd: x.dateEnd,
            moneyMax: x.moneyMax,
            moneyMin: x.moneyMin,
            description: x.description,
            smesType: x.smesType,
            authorize:x.authorize
        })
    })
    res.status(200).json(list);
});

router.get("/show/:smesId", async (req, res) => {
    let smesId = req.params.smesId;
    const sql = `SELECT smesdetail.*, smes.*, user.* 
                 FROM smesdetail, smes, user
                 WHERE smesdetail.detailId = smes.smesId
                 AND smes.smesId = '${smesId}'
                 AND smes.userId = user.userId`
    let response = await connect.promiseQuery(sql);
    res.status(200).json( { 
        userId: response[0].userId,
        name: response[0].name,
        email: response[0].email,
        title: response[0].title,
        tel: response[0].tel,
        userType: response[0].userType,
        dateStart: response[0].dateStart,
        dateEnd: response[0].dateEnd,
        moneyMax: response[0].moneyMax,
        moneyMin: response[0].moneyMin,
        detail: response[0].detail,
        tel: response[0].tel,
        email: response[0].email,
        facebook: response[0].facebook,
        lineid: response[0].lineid,

    });
});

module.exports = router;
