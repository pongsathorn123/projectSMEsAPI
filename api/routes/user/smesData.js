const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');

router.get("/info", async (req, res) => {
    let userId = req.params.userId;
    const sql = `SELECT * FROM market ,export
                 WHERE seq = seqMarket;`
    let response = await connect.promiseQuery(sql);
    let list = [];
    response.map((x,index) => {
        list.push({ 
            seq: index+1,
            year: x.year,
            month: x.month,
            exportNo1: x.no1,
            exportNo2: x.no2,
            exportNo3: x.no3,
            asean: x.asean,
            china: x.china,
            usa: x.usa,
            japan: x.japan,
            eu27: x.eu27,
        })
    })
    res.status(200).json(list);
});

router.get("/info/:year/:month", async (req, res) => {
    let year = req.params.year;
    let month = req.params.month;

    const sql = `SELECT * FROM market ,export
                 WHERE market.month = '${month}' 
                 AND market.year = '${year}' 
                 AND export.month = '${month}' 
                 AND export.year = '${year}' ;`;
    let response = await connect.promiseQuery(sql);
    if(response.length === 1){
        res.status(200).json( {   
            check: response.length,
            year: response[0].year,
            month: response[0].month,
            exportNo1: response[0].no1,
            exportNo2: response[0].no2,
            exportNo3: response[0].no3,
            asean: response[0].asean,
            china: response[0].china,
            usa: response[0].usa,
            japan: response[0].japan,
            eu27: response[0].eu27,
        });
    }else{
        res.status(200).json( {   
             check: "not found"
         });
    }
});

router.get("/add/:year/:month/:no1/:no2/:no3/:asean/:china/:usa/:japan/:eu27", async (req, res) => {

    const year = req.params.year;
    const month = req.params.month;
    const no1 = req.params.no1;
    const no2 = req.params.no2;
    const no3 = req.params.no3;
    const asean = req.params.asean;
    const china = req.params.china;
    const usa = req.params.usa;
    const japan = req.params.japan;
    const eu27 = req.params.eu27;
 
    const sql = `SELECT export.year,export.month,market.year,market.month
                FROM market,export
                WHERE ( export.year='${year}' AND export.month='${month}' )
                AND ( market.year='${year}' AND market.month='${month}' );`;

    let response = await connect.promiseQuery(sql);
    if(response.length === 1){
        res.status(200).json( {   
            check: "มีข้อมูลแล้ว"
        });
        }else{
            let sql = `INSERT INTO export(year, month, no1, no2, no3) VALUES ('${year}','${month}','${no1}','${no2}','${no3}');
               INSERT INTO market(year, month, asean, china, usa, japan, eu27) VALUES ('${year}','${month}','${asean}','${china}','${usa}','${japan}','${eu27}');`;
            const response = await connect.promiseQuery(sql, [year, month, no1, no2, no3, asean, china, japan, eu27]);
            res.status(200).json(response);
        }
});


module.exports = router;
