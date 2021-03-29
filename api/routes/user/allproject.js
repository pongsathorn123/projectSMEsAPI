const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');

router.get("/show", async (req, res) => {

    const sql = `SELECT smesId, userId,title,description,smesType,authorize
                FROM smes WHERE authorize = 'verified' ORDER BY smesId DESC`
    let response = await connect.promiseQuery(sql);
    let list = [];
    response.map((x,index) => {
        list.push({ 
            seq: index+1,
            userId: x.userId,
            title: x.title,
            description: x.description,
            smesType: x.smesType,
            authorize:x.authorize
        })
    })
    res.status(200).json(list);
});

module.exports = router;
