const db = require('../models');
const logging = require('../libraries/logging');

async function index(req, res) {
     try {
        regionalData = await db.regional.findAndCountAll({ 
            limit: parseInt(req.query.limit),
            offset: parseInt(req.query.offset),
            where: {
                active : '1'
            }
         });

        return res.json({
            success: true,
            message: 'success upload data',
            data: regionalData
        });
    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "failed", log: err.message});
    }
}

async function store(req, res) {
    try {
        let payload = req.body;

        await db.regional.create({
            code: payload.code,
            name: payload.name,
            active: '1'
        });

        return res.json({
            success: true,
            message: 'success insert data',
        });
    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "failed", log: err.message});
    }
}

async function update(req, res) {
    try {
        let payload = req.body;
        await db.regional.update({
            code: payload.code,
            name: payload.name,
            witel: payload.witel,
            address: payload.address,
            region: payload.region,
        }, {
             where: { id : req.params.id } 
        });

        return res.json({
            success: true,
            message: 'success update data',
        });
    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "failed", log: err.message});
    }
}

async function destroy (req, res) {
    try {
         await db.regional.update({
           active : '0'
        }, {
            where : { id : req.params.id }
        });
        
        return res.json({
            success: true,
            message: 'success delete data'
        });
    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "failed", log: err.message});
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
}