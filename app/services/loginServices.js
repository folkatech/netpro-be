const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const logging = require('../libraries/logging');
const db = require('../models');
const config = require('../config/config');
const os = require('os');

async function login(req, res) {
    try {
        const payload = req.body;
        let loginData = await db.users.findOne({
            where: {
                username: payload.username,
                active : '1',
                password : crypto.createHash('sha256').update(payload.password).digest('hex'),
            }
        });

        if (loginData == undefined) {
            return res.status(401).json({
                success: false,
                message: 'user not found'
            });
        }

        if (parseInt(loginData.active) != 1) {
            return res.json({
                success: false,
                message: 'user not active'
            });
        }
        let token = jwt.sign({
            id: loginData.id,
            role: loginData.role,
            hostname: os.hostname()
        }, config.JWT_SECRET);

        return res.json({
            success: true,
            message: 'login success',
            token: token,
            role : loginData.role,
        });

    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({
            success: false,
            message: "failed : err",
            log: err.stack
        });
    }
}



async function register(req, res) {
    try {
        const payload = req.body;
        await db.users.create({
            name: payload.name,
            email: payload.email,
            password: crypto.createHash('sha256').update(payload.password).digest('hex'),
        });

        return res.json({
            success: true,
            message: 'success register',
        });

    } catch (err) {
        logging.errorLog(err, req.connection.remoteAddress, req.get('User-Agent'), req.body, req.originalUrl);
        return res.json({
            success: "false",
            message: "failed : err",
            log: err.message
        });
    }
}

module.exports = {
    login, register
}