const db = require('../models');
const Logging = require('../libraries/logging');
const uploadLib = require('../libraries/uploadFile');

async function index(req, res) {
    try {
        expandData = await db.expand.findAll({ where: { active: 1, type : req.query.type } });

        return res.json({
            success: true,
            message: 'success get data',
            data: expandData
        });
    } catch (err) {
        Logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "falied get data", log : err.message});
    }
}

async function witel(req, res) {
    try {
        witelData = await db.witel.findAll({ where: { active: 1 } });

        return res.json({
            success: true,
            message: 'success get data',
            data: witelData
        });
    } catch (err) {
        Logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "falied get data", log : err.message});
    }
}

async function sto(req, res) {
    try {
        stoData = await db.sto.findAll({ where: { active: 1, witel_id : req.params.id } });

        return res.json({
            success: true,
            message: 'success get data',
            data: stoData
        });
    } catch (err) {
        Logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "falied get data", log : err.message});
    }
}

async function uploadFile(req, res) {
    try {
        file = await uploadLib.uploadImg(req.files.fileData[0], 'img');
        return res.json({
            success: true,
            message: 'success upload data',
            url: file.name
        });
    } catch (err) {
        Logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "failed", log: err.message});
    }
}

async function assets(req, res) {
    try {
        assetsData = await db.asset.findAndCountAll({ 
            limit: parseInt(req.query.limit),
            offset: parseInt(req.query.offset),
            where: {
                active : '1'
            }
         });

        return res.json({
            success: true,
            message: 'success upload data',
            data: assetsData
        });
    } catch (err) {
        Logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "failed", log: err.message});
    }
}

module.exports = {
   index, witel, sto, uploadFile, assets
}