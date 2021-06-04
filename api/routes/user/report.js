const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');


router.get("/insert/:smesId/:title/:report/:username/:userId", async (req, res) => {
    const smesId = req.params.smesId;
    const title = req.params.title;
    const report = req.params.report;
    const username = req.params.username;
    const userId = req.params.userId;
 
    let sql = `INSERT INTO report(smesId, title, report, username, userId) VALUES (?,?,?,?,?);`;
    let response;
    if (smesId === undefined ) {
        res.json({ error: "variable is undefined" });
        return;
    } 
    else {
        if (smesId != "") {
            sql = `INSERT INTO report(smesId, title, report, username, userId) VALUES (?,?,?,?,?);`;
            response = await connect.promiseQuery(sql, [smesId, title, report, username, userId]);
        }
        else {
            response = await connect.promiseQuery(sql, [smesId, title, report, username, userId]);
        }
        res.status(200).json(response);
    }
});

router.get("/show", async (req, res) => {
    const sql = `SELECT report.idreport ,report.smesId ,report.title ,smes.authorize ,count(report.idreport) AS count_id 
                FROM report,smes 
                WHERE report.smesId = smes.smesId 
                group by report.smesId`
    let response = await connect.promiseQuery(sql);
    let list = [];
    response.map((x,index) => {
        list.push({ 
            seq: index+1,
            smesId: x.smesId,
            title: x.title,
            count: x.count_id,
            authorize: x.authorize
        })
    })
    res.status(200).json(list);
});

router.get("/show/:smesId", async (req, res) => {
    const smesId = req.params.smesId;

    const sql = `SELECT smesId, username, report FROM report WHERE smesId = '${smesId}'`
    let response = await connect.promiseQuery(sql);
    let list = [];
    response.map((x,index) => {
        list.push({ 
            seq: index+1,
            smesId: x.smesId,
            username: x.username,
            report: x.report
        })
    })
    res.status(200).json(list);
});


module.exports = router;
