const db = require('../models');
const Looging = require('../libraries/logging');

async function index(req, res) {
    try {
       console.log(req.user);
        role = req.user.role != 'netar' ? 'nonneter' : 'netar';
        boardData = await db.board.findAll({ where: { active: 1, type : role } });

        return res.json({
            success: true,
            message: 'success get data',
            data: boardData
        });
    } catch (err) {
        Looging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "falied get data", log : err.message});
    }
}

async function store(req, res) {
    try {
        let payload = re.body;
        let boardData = await db.board.create({
            name: payload.name,
            active: '1',
            number : parseInt(payload.number)
        });

        return res.json({
            success: true,
            message: 'success get data',
            data : boardData
        })
    } catch (err) {
        Looging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "falied store data", log : err.message});
    }
}

async function update(req, res) {
    try {
        let payload = re.body;
        let boardData = await db.board.update({
            name: payload.name,
            number : parseInt(payload.number)
        }, {
            where : { id : req.params.id}
        });

        return res.json({
            success: true,
            message: 'success get data',
            data : boardData
        })
    } catch (err) {
        Looging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "falied store data", log : err.message});
    }
}

async function destroy(req, res) {
    try {
        await db.board.update({
            active: '1',
        }, {
            where : { id : req.params.id}
        });

        return res.json({
            success: true,
            message: 'success get data',
        })
    } catch (err) {
        Looging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "falied store data", log : err.message});
    }
}


module.exports = { index, store, update, destroy }