const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');

router.get("/inveslist", async (req, res) => {
    
    const sql = `SELECT *
                FROM invesment
                ORDER BY typeinves ;`;

    let response = await connect.promiseQuery(sql);
    let list = [];
    response.map((x,index) => {
        list.push({ 
            seq: index+1,
            idinvesment: x.idinvesment,
            smesId: x.smesId,
            year: x.year,
            m1: x.Jan,
            m2: x.Feb,
            m3: x.Mar,
            m4: x.Apr,
            m5: x.May,
            m6: x.Jun,
            m7: x.Jul,
            m8: x.Aug,
            m9: x.Sep,
            m10: x.Oct,
            m11: x.Nov,
            m12: x.Dece,
            typeinves: x.typeinves,
        })
    })
    res.status(200).json(list);
});



router.get("/addinvescount/:year/:smesId/:month/:invesmentcount", async (req, res) => {
    let smesId = req.params.smesId;
    let year = req.params.year;
    let month = req.params.month;
    let invesmentcount = req.params.invesmentcount;


    const sql = `SELECT ${month}, ${smesId} 
                FROM invesment 
                WHERE ( smesId='${smesId}') AND (year = '${year}')`;
    let response = await connect.promiseQuery(sql);
    console.log(response)
    if(response.length === 0){
        let sql = `INSERT INTO invesment(smesId, year, ${month}) VALUES ('${smesId}','${year}','${invesmentcount}');`;
            const response = await connect.promiseQuery(sql, [smesId, year, month, invesmentcount]);
            res.status(200).json(response);
    }else if(response.smesId === this.smesId){
            let sql = `UPDATE invester 
                SET ${month} = '${invesmentcount}' , typeinves = 'unverifide'
                WHERE  smesId = '${smesId}' AND  year = '${year}'`;
                
        const response = await connect.promiseQuery(sql, [smesId, year, month, invesmentcount]);
        res.status(200).json(response);
    }else {
        res.status(200).json( {   
            check: "มีข้อมูลแล้ว"
        });
    }
});

router.get("/promote/:idinvesment", async (req, res) => {
    const idinvester = req.params.idinvester;
    const sql = `UPDATE invesment SET typeinves = 'verified' WHERE idinvesment = '${idinvesment}'`;
    if (idinvesment === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    }
    const response = await connect.promiseQuery(sql, [idinvesment]);
    res.status(200).json(response);
});


router.get("/demote/:idinvesment", async (req, res) => {
    const idinvester = req.params.idinvester;
    const sql = `UPDATE invesment SET typeinves = 'unverifide' WHERE idinvesment = '${idinvesment}'`;
    if (idinvesment === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    }
    const response = await connect.promiseQuery(sql, [idinvesment]);
    res.status(200).json(response);
});

router.get("/delete/:idinvesment", async (req, res) => {
    const idinvesment = req.params.idinvester;
    const sql = `DELETE FROM invester WHERE idinvesment = '${idinvesment}';`;
    if (idinvesment === undefined) {
        res.json({ error: "variable is undefined" });
        return;
    }
    const response = await connect.promiseQuery(sql, [idinvesment]);
    res.status(200).json(response);
});

router.get("/info/:year/:smesId", async (req, res) => {
    let smesId = req.params.smesId;
    let year = req.params.year;

    const sql = `SELECT *
                FROM invesment 
                WHERE ( smesId='${smesId}' AND year='${year}');`;
    let response = await connect.promiseQuery(sql);
    if(response.length === 1){
        res.status(200).json( {   
            check: response.length,
            idinvesment: response[0].idinvesment,
            smesId: response[0].smesId,
            year: response[0].year,
            m1: response[0].Jan,
            m2: response[0].Feb,
            m3: response[0].Mar,
            m4: response[0].Apr,
            m5: response[0].May,
            m6: response[0].Jun,
            m7: response[0].Jul,
            m8: response[0].Aug,
            m9: response[0].Sep,
            m10: response[0].Oct,
            m11: response[0].Nov,
            m12: response[0].Dec,
            typeinves: response[0].typeinves,
        });
    }else{
        res.status(200).json( {   
             check: "not found" 
        });
    }
});


module.exports = router;
