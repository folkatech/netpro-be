const db = require('../models');
const logging = require('../libraries/logging');

async function index(req, res) {

}

async function store(req, res) {
    try {
        let payload = req.body;

        await db.asset.create({
            code: payload.code,
            name: payload.name,
            witel: payload.witel,
            address: payload.address,
            region: payload.region,
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
        await db.asset.update({
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
        await db.asset.destroy({ where: { id: req.params.id } });
        
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