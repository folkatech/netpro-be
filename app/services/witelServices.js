const db = require('../models');
const logging = require('../libraries/logging');

async function store(req, res) {
    try {
        let payload = req.body;

        await db.witel.create({
            name: payload.name,
            code: payload.code,
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
        await db.witel.update({
            name: payload.name,
            code: payload.code,
        }, {
            where : { id : req.params.id}
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
        await db.witel.update({
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
    store,
    update,
    destroy
}