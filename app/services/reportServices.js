const db = require('../models');
const logging = require('../libraries/logging');

async function index(req, res) {
    try {

    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "falied get data", log : err.message});       
    }
}

async function store(req, res) {
     try {
         let dataProject = await db.projects.findOne({ where: {id : req.body.project_id }, include : db.reports });
         if (dataProject == undefined) {
             return res.status(402).json({ success: false, message: 'data not found' });
         }
         
         let report = dataProject.reports.find((el) => el.id === parseInt(req.body.report_id));
         
         if (report == undefined || report.done != '2') {
             return res.status(403).json({
                 success: false,
                 message: 'report not found'
             });
         }
         nextStatus = '';
         //'propose', 'install','final', 'comptest','hand','close'
         if (report.status == 'propose') {
             nextStatus = 'install';
         } else if(report.status == 'install') {
            nextStatus = 'final';
         } else if(report.status == 'final') {
            nextStatus = 'comptest';
         } else if(report.status == 'comptest') {
            nextStatus = 'hand';
         } else if(report.status == 'hand') {
            nextStatus = 'close';
         }
         
         cekReport = await db.reports.findOne({
             where: {
                 project_id: req.body.project_id,
                 status: nextStatus
             }
         });

         if (cekReport == undefined) {
                await db.reports.create({
                    user_id: dataProject.user_id,
                    project_id: dataProject.id,
                    status: nextStatus,
                    done : '2'
                });
             
            await db.projects.update(
                {
                    done: '1',
                    status : nextStatus,
                }, {
                where: { id: report.project_id }
            });
         }

         await db.reports.update(
             {
                 done: '1',
                 detail : req.body.detail,
             }, {
             where: { id: report.id }
         });

         reportNew = await db.reports.findAll({ where: { project_id: req.body.project_id } });

         return res.json({
             success: true,
             message: 'success store data report',
             data: reportNew
         });
    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({ success: false, message: "falied get data", log : err.message});        
    }
}

module.exports = {
    index, store
}