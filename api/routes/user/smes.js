const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');

router.get("/insert/:userId/:title/:description/:smesType", async (req, res) => {
    const userId = req.params.userId;
    const title = req.params.title;
    const description = req.params.description;
    const smesType = req.params.smesType;

    let sql = `INSERT INTO smes(userId, title, description, smesType) VALUES (?,?,?,?);`;
    let response;
    if (userId === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    } 
    else {
        if (userId != "") {
            sql = `INSERT INTO smes(userId, title, description, smesType) VALUES (?,?,?,?);`;
            response = await connect.promiseQuery(sql, [userId, title, description, smesType]);
        }
        else {
            response = await connect.promiseQuery(sql, [userId, title, description, smesType]);
        }
        res.status(200).json(response);
    }
});


module.exports = router;
