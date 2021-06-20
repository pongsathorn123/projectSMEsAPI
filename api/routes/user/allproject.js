const express = require('express');
const router = express.Router();
const connect = require('../../../core/connect');

router.get("/show", async (req, res) => {
    const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                user.name
                FROM smes 
                LEFT JOIN  user  ON user.userId = smes.userId
                LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                LEFT JOIN invester  ON invester.smesId = smes.smesId 
                WHERE smes.authorize = 'verified'
                ORDER BY smes.smesId DESC;`
    let response = await connect.promiseQuery(sql);
    let list = [];
    response.map((x,index) => {
        list.push({ 
            seq: index+1,
            smesId: x.smesId,
            userId: x.userId,
            name: x.name,
            countinvesment:x.countinvesment,
            countinvester:x.countinvester,
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

router.get("/show2/:smesType", async (req, res) => {
    let smesType = req.params.smesType;
    if (smesType == "ธุรกิจทั้งหมด"){
        const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                user.name
                FROM smes 
                LEFT JOIN  user  ON user.userId = smes.userId
                LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                LEFT JOIN invester  ON invester.smesId = smes.smesId 
                WHERE smes.authorize = 'verified'
                ORDER BY smes.smesId DESC;`
    let response = await connect.promiseQuery(sql);
    let list = [];
    response.map((x,index) => {
        list.push({ 
            seq: index+1,
            smesId: x.smesId,
            userId: x.userId,
            name: x.name,
            countinvesment:x.countinvesment,
            countinvester:x.countinvester,
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
    }else {
        const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                    (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                    user.name
                    FROM smes 
                    LEFT JOIN  user  ON user.userId = smes.userId
                    LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                    LEFT JOIN invester  ON invester.smesId = smes.smesId 
                    WHERE smes.authorize = 'verified'
                    AND smes.smesType = '${smesType}'
                    ORDER BY smes.smesId DESC;`
        let response = await connect.promiseQuery(sql);
        let list = [];
        response.map((x,index) => {
            list.push({ 
                seq: index+1,
            smesId: x.smesId,
            userId: x.userId,
            name: x.name,
            countinvesment:x.countinvesment,
            countinvester:x.countinvester,
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
    res.status(200).json(list);}
        
    });
    router.get("/show3/:category", async (req, res) => {
        let category = req.params.category;
        if (category == "ธุรกิจทั้งหมด"){
            const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                    (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                    user.name
                    FROM smes 
                    LEFT JOIN  user  ON user.userId = smes.userId
                    LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                    LEFT JOIN invester  ON invester.smesId = smes.smesId 
                    WHERE smes.authorize = 'verified'
                    ORDER BY smes.smesId DESC;`
        let response = await connect.promiseQuery(sql);
        let list = [];
        response.map((x,index) => {
            list.push({ 
                seq: index+1,
                smesId: x.smesId,
                userId: x.userId,
                name: x.name,
                countinvesment:x.countinvesment,
                countinvester:x.countinvester,
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
        }else {
            const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                        (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                        user.name
                        FROM smes 
                        LEFT JOIN  user  ON user.userId = smes.userId
                        LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                        LEFT JOIN invester  ON invester.smesId = smes.smesId 
                        WHERE smes.authorize = 'verified'
                        AND smes.category = '${category}'
                        ORDER BY smes.smesId DESC;`
            let response = await connect.promiseQuery(sql);
            let list = [];
            response.map((x,index) => {
                list.push({ 
                    seq: index+1,
                smesId: x.smesId,
                userId: x.userId,
                name: x.name,
                countinvesment:x.countinvesment,
                countinvester:x.countinvester,
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
        res.status(200).json(list);}
            
        });

        router.get("/show4/:category", async (req, res) => {
            let category = req.params.category;
            if (category == "ธุรกิจทั้งหมด"){
                const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                        (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                        user.name
                        FROM smes 
                        LEFT JOIN  user  ON user.userId = smes.userId
                        LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                        LEFT JOIN invester  ON invester.smesId = smes.smesId 
                        WHERE smes.authorize = 'verified'
                        AND smes.smesType = 'ธุรกิจด้านการค้า'
                        ORDER BY smes.smesId DESC;`
            let response = await connect.promiseQuery(sql);
            let list = [];
            response.map((x,index) => {
                list.push({ 
                    seq: index+1,
                    smesId: x.smesId,
                    userId: x.userId,
                    name: x.name,
                    countinvesment:x.countinvesment,
                    countinvester:x.countinvester,
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
            }else {
                const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                            (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                            user.name
                            FROM smes 
                            LEFT JOIN  user  ON user.userId = smes.userId
                            LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                            LEFT JOIN invester  ON invester.smesId = smes.smesId 
                            WHERE smes.authorize = 'verified'
                            AND smes.smesType = 'ธุรกิจด้านการค้า'
                            AND smes.category = '${category}'
                            ORDER BY smes.smesId DESC;`
                let response = await connect.promiseQuery(sql);
                let list = [];
                response.map((x,index) => {
                    list.push({ 
                        seq: index+1,
                    smesId: x.smesId,
                    userId: x.userId,
                    name: x.name,
                    countinvesment:x.countinvesment,
                    countinvester:x.countinvester,
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
            res.status(200).json(list);}
                
            });

            router.get("/show5/:category", async (req, res) => {
                let category = req.params.category;
                if (category == "ธุรกิจทั้งหมด"){
                    const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                            (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                            user.name
                            FROM smes 
                            LEFT JOIN  user  ON user.userId = smes.userId
                            LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                            LEFT JOIN invester  ON invester.smesId = smes.smesId 
                            WHERE smes.authorize = 'verified'
                            AND smes.smesType = 'ธุรกิจด้านการผลิต'
                            ORDER BY smes.smesId DESC;`
                let response = await connect.promiseQuery(sql);
                let list = [];
                response.map((x,index) => {
                    list.push({ 
                        seq: index+1,
                        smesId: x.smesId,
                        userId: x.userId,
                        name: x.name,
                        countinvesment:x.countinvesment,
                        countinvester:x.countinvester,
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
                }else {
                    const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                                (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                                user.name
                                FROM smes 
                                LEFT JOIN  user  ON user.userId = smes.userId
                                LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                                LEFT JOIN invester  ON invester.smesId = smes.smesId 
                                WHERE smes.authorize = 'verified'
                                AND smes.smesType = 'ธุรกิจด้านการผลิต'
                                AND smes.category = '${category}'
                                ORDER BY smes.smesId DESC;`
                    let response = await connect.promiseQuery(sql);
                    let list = [];
                    response.map((x,index) => {
                        list.push({ 
                            seq: index+1,
                        smesId: x.smesId,
                        userId: x.userId,
                        name: x.name,
                        countinvesment:x.countinvesment,
                        countinvester:x.countinvester,
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
                res.status(200).json(list);}
                    
                });
                router.get("/show6/:category", async (req, res) => {
                    let category = req.params.category;
                    if (category == "ธุรกิจทั้งหมด"){
                        const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                                (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                                user.name
                                FROM smes 
                                LEFT JOIN  user  ON user.userId = smes.userId
                                LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                                LEFT JOIN invester  ON invester.smesId = smes.smesId 
                                WHERE smes.authorize = 'verified'
                                AND smes.smesType = 'ธุรกิจด้านการบริการ'
                                ORDER BY smes.smesId DESC;`
                    let response = await connect.promiseQuery(sql);
                    let list = [];
                    response.map((x,index) => {
                        list.push({ 
                            seq: index+1,
                            smesId: x.smesId,
                            userId: x.userId,
                            name: x.name,
                            countinvesment:x.countinvesment,
                            countinvester:x.countinvester,
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
                    }else {
                        const sql = `SELECT smes.smesId,smes.title, smes.smesType, (invesment.Jan+invesment.Feb+invesment.Mar+invesment.Apr+invesment.May+invesment.Jun+invesment.Jul+invesment.Aug+invesment.Sep+invesment.Oct+invesment.Nov+invesment.Dece)as countinvesment,
                                    (invester.Jan+invester.Feb+invester.Mar+invester.Apr+invester.May+invester.Jun+invester.Jul+invester.Aug+invester.Sep+invester.Oct+invester.Nov+invester.Dece)as countinvester,
                                    user.name
                                    FROM smes 
                                    LEFT JOIN  user  ON user.userId = smes.userId
                                    LEFT JOIN invesment  ON invesment.smesId = smes.smesId
                                    LEFT JOIN invester  ON invester.smesId = smes.smesId 
                                    WHERE smes.authorize = 'verified'
                                    AND smes.smesType = 'ธุรกิจด้านการบริการ'
                                    AND smes.category = '${category}'
                                    ORDER BY smes.smesId DESC;`
                        let response = await connect.promiseQuery(sql);
                        let list = [];
                        response.map((x,index) => {
                            list.push({ 
                                seq: index+1,
                            smesId: x.smesId,
                            userId: x.userId,
                            name: x.name,
                            countinvesment:x.countinvesment,
                            countinvester:x.countinvester,
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
                    res.status(200).json(list);}
                        
                    });

router.get("/show/:smesId", async (req, res) => {
    let smesId = req.params.smesId;
    const sql = `SELECT smesdetail.*, smes.*, user.name
                    FROM smesdetail, smes, user
                    WHERE smesdetail.smesId = ${smesId}
                    AND smes.smesId = ${smesId}
                    AND smes.userId = user.userId`;
    let response = await connect.promiseQuery(sql);
    res.status(200).json( { 
        smesId: response[0].smesId,
        userId: response[0].userId,
        name: response[0].name,
        email: response[0].email,
        title: response[0].title,
        description: response[0].description,
        tel: response[0].tel,
        authorize: response[0].authorize,
        smesType: response[0].smesType,
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
