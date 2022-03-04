const fs = require('fs');
const moment = require('moment');

async function errorLog(errData, ip, ua, req_body, path) {
    try {
        let arrData = {
            message: errData.message != undefined ? errData.message : null,
            line: errData.stack != undefined ? errData.stack.substring(0, 180) : null,
            time: moment(new Date()).format('YYYY-MM-DD H:mm:ss'),
            ip_adreess: ip,
            ua: ua,
            req_body: req_body,
            path : path
        };
        if (!fs.existsSync('public/log')) {
            fs.mkdirSync('public/log');
        }
        let data = JSON.stringify(arrData) + ' \n';
        if (fs.existsSync('public/log/error.log')) {
            fs.appendFileSync('public/log/error.log', data);  
        } else {
            fs.writeFileSync('public/log/error.log', '');
            fs.appendFileSync('public/log/error.log', data); 
        }
        //fs.appendFileSync('error.log', data);
        return true;
    } catch (err) {
        
    }
}




module.exports = {
    errorLog
}