const db = require('../models');
const logging = require('../libraries/logging');

async function index(req, res) {
    try {
        if (req.query.type != 'list') {
            let data = await db.projectsBoard.findAndCountAll({
                limit: parseInt(req.query.limit),
                offset: parseInt(req.query.offset),
                where: { board_id: req.query.board_id },
                // attributes: ['id', 'board_id'],
                include : db.projects
            });

            return res.json({
                success: true,
                message: 'success get data',
                data: data
            });
        } else {
          let  projectData = await db.projects.findAndCountAll({ 
                limit: parseInt(req.query.limit),
                offset: parseInt(req.query.offset)
            });
             return res.json({
                success: true,
                message: 'success get data',
                data: projectData
            });
        }
    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "failed", log: err.message});
    }
}

async function store(req, res) {
    try {
        let code = await genCode();

        let projectNew = await db.projects.create({
            user_id: req.user.id,
            sto_id: req.body.sto_id,
            expand_id: req.body.expand_id,
            witel_id: req.body.witel_id,
            title: req.body.title,
            code: code,
            progress: req.body.progress,
            detail: req.body.detail,
            label: req.body.label,
            type: req.body.type,
            time: req.body.time,
            status: 'propose',
            netar_status : 'needaprove'
        });

        let board = await db.board.findAll();
        boardNum = [];
        if (board.length > 1) {
            board.forEach((el) =>  {
                if (el.type == 'netar' && el.number == 1) {
                    boardNum.push({ project_id: projectNew.id, board_id: el.id });
                }
                
                if (el.type == 'nonneter' && el.number == 2) {
                    boardNum.push({ project_id: projectNew.id, board_id: el.id });
                }

            });
            await db.projectsBoard.bulkCreate(boardNum);
        }
        return res.json({ success : true, message : 'success store data' });
    } catch (err) {
        console.log(err);
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "failed", log: err.message});
    }
}

async function genCode()
{
    try {
        let total = await db.projects.count() + 1;
        let count = total.toString().length;
        console.log(total.toString().length);
        let totalnull = 6 - total.toString().length;
        code = 'NP';
        for (let i = 0; i < totalnull; i++) {
            code = code + '' + 0;
        }
        return code + '' + count;

    } catch (err)  { console.log(err); }
}

async function aprove(req, res) {
    try {
        if (req.type != 'netar') {
            return res.status(403).json({
                success: false, message: "failed access"
            });
        }
        

    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "failed", log: err.message});
    }
}

module.exports = {
    index, store, aprove
}