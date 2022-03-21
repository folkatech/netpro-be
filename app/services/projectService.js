const db = require('../models');
const logging = require('../libraries/logging');
const sequelize = require('sequelize');
 const Op = require('sequelize').Op;

async function index(req, res) {
    try {
        if (req.query.type != 'list') {  
            if (req.user.role == 'netar') {
                whereClause = null;    
            } else {
                whereClause = {
                    role: req.user.role
                }
            }
           // console.log(whereData);
            let data = await db.projectsBoard.findAndCountAll({
                limit: parseInt(req.query.limit),
                offset: parseInt(req.query.offset),
                include: [{
                    model: db.projects,
                    required: true,
                    include: {
                        model: db.users,
                        as: 'user',
                        where : whereClause,
                       
                    },
                }],
                where: {
                    board_id: req.query.board_id,
                    
                },
                order : [
                    [sequelize.col('project.time'), 'DESC']]
            });

            return res.json({
                success: true,
                message: 'success get datas',
                data: data
            });
        } else {
          let  projectData = await db.projects.findAndCountAll({ 
                limit: parseInt(req.query.limit),
                offset: parseInt(req.query.offset),
                order : [['created_at', 'DESC']]
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

async function show(req, res) {
    try {
        if (req.query.type == 'last') {
            dataProject = await db.projects.findOne({ order: [['created_at', 'DESC']] });
        } else {
            dataProject = await db.projects.findOne({ where : { id: req.query.project_id }, include : db.reports });
        }

        return res.json({
            success : true,
            message : 'success get data',
            data: dataProject
        });
        
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
        //console.log(total.toString().length);
        let totalnull = 6 - total.toString().length;
        code = 'NP';
        for (let i = 0; i < totalnull; i++) {
            code = code + '' + 0;
        }
        return code + '' + total;

    } catch (err)  { console.log(err); }
}

async function aprove(req, res) {
    try {
        if (req.user.role != 'netar') {
            return res.status(403).json({
                success: false, message: "failed access"
            });
        }

        boardData = await db.projectsBoard.findOne({
            where: {
                project_id: parseInt(req.body.project_id),
                board_id : parseInt(req.body.board_id),
            },
            include: db.projects,
        });

        console.log(req.body);

        if (boardData == undefined) {
            return res.status(403).json({
                success: false, message: "project not found"
            });
        }

        if (boardData.project.netar_status != 'needaprove') {
            return res.status(403).json({ success : false, message : 'failed, status' })
        }

     //   return res.json({ projectData: boardData, payload: req.body });

        if (req.body.action == 'aprove') {
            let board = await db.board.findAll();
            let projectBoradNow = await db.projectsBoard.findAll({ where: { project_id: req.body.project_id }, include: db.board });
            boardNum = [];
            if (board.length > 1) {
                board.forEach((el) =>  {
                    if (el.number == 0) {
                        boardNum.push({ project_id: req.body.project_id, board_id: el.id });
                    }
                    if (el.number == 1) {
                        if (el.type == 'nonneter') {
                            boardNum.push({ project_id: req.body.project_id, board_id: el.id });
                        }
                    }
                    if (el.number == 2) {
                        boardNum.push({ project_id: req.body.project_id, board_id: el.id });
                    }

                });
               //  proses add data project 
                await db.projectsBoard.bulkCreate(boardNum);
            }

            // return res.json({ board: boardNum, projectBoradNow: projectBoradNow });

            projectBoradNow.forEach(async (el) => {        
                db.projectsBoard.destroy({
                    where: { id: el.id }
                });
            });

            await db.reports.create({
                user_id: boardData.project.user_id,
                project_id: boardData.project_id,
                status: 'propose',
                done : '2'
            });

            await db.projects.update(
                {
                    netar_status : 'aprove'
                },
                {
                    where: { id : req.body.project_id }
                }
            );
            return res.json({
                success: true,
                message: 'aprove success',
            });
        } else {
            let board = await db.board.findAll();
            let projectBoradNow = await db.projectsBoard.findAll({ where : { project_id : req.body.project_id}})
            boardNum = [];
            if (board.length > 1) {
                board.forEach((el) =>  {
                    if (el.number == 0) {
                        boardNum.push({ project_id: req.body.project_id, board_id: el.id });
                    }

                });
                await db.projectsBoard.bulkCreate(boardNum);
            }
           // return res.json({ board: boardNum, projectBoradNow: projectBoradNow });

            projectBoradNow.forEach( async (el) => {
                db.projectsBoard.destroy({
                    where: { id: el.id }
                });
            });

            await db.projects.update(
                {
                    netar_status : 'reject'
                },
                {
                    where: { id: req.body.project_id }
                }
            );
            return res.json({
                success: true,
                message: 'reject success',
            });
        }

    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "failed", log: err.message});
    }
}

module.exports = {
    index, store, aprove, show
}