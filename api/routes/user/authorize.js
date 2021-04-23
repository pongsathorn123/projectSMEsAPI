const express = require('express');
const router = express.Router();
const moment = require('moment');
const connect = require('../../../core/connect');

router.get("/list", async (req, res) => {
    const sql = `SELECT smes.smesId,smes.userId,smes.title,smes.description,smes.smesType,smes.authorize,user.username, user.name, user.email
    FROM smes INNER JOIN user ON smes.userId=user.userId  ORDER BY authorize ,smesId desc`;
    const response = await connect.promiseQuery(sql);
    res.status(200).json(response);
});

router.get("/promote/:smesId", async (req, res) => {
    const smesId = req.params.smesId;
    const sql = `UPDATE smes SET authorize = 'verified' WHERE smesId = '${smesId}'`;
    if (smesId === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    }
    const response = await connect.promiseQuery(sql, [smesId]);
    res.status(200).json(response);
});


router.get("/demote/:smesId", async (req, res) => {
    const smesId = req.params.smesId;
    const sql = `UPDATE smes SET authorize = 'NULL' WHERE smesId = '${smesId}'`;
    if (smesId === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    }
    const response = await connect.promiseQuery(sql, [smesId]);
    res.status(200).json(response);
});

router.get("/delete/:smesId", async (req, res) => {
    const smesId = req.params.smesId;
    const sql = `DELETE FROM smes WHERE smesId = '${smesId}';
                 DELETE FROM smesdetail WHERE detailId = '${smesId}'`;
    if (smesId === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    }
    const response = await connect.promiseQuery(sql, [smesId]);
    res.status(200).json(response);
});

module.exports = router;