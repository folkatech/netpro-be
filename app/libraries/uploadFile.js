const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const Logging = require('../libraries/logging');

async function uploadImg(file, dir) {
    if (file) {
        let filename = file.originalname;
        let fileType = filename.split(".").length == 2 ? filename.split(".")[1] : "jpg";
        let newname = Date.parse(new Date()) + '-' + Math.floor(Math.random() * 999) + '.' + fileType;
        const target = path.join(__dirname, config.ASSETS + "/", newname);
        fs.renameSync(file.path, target);
        return {
            status: true,
            name: `public/img/${newname}`
        };
    }else {
        return {
            status: false,
            name: null,
        };
    }
}

async function uploadXlsx(file, dir) {
    if (file) {
        let filename = file.originalname;
        let fileType = filename.split(".").length == 2 ? filename.split(".")[1] : "xlsx";
        let newname = Date.parse(new Date()) + '-' + Math.floor(Math.random() * 999) + '.' + fileType;
        const target = path.join(__dirname, config.ASSETS + "/", newname);
        fs.renameSync(file.path, target);
        return {
            status: true,
            name: `public/file/${newname}`
        };
    }else {
        return {
            status: false,
            name: null,
        };
    }
}


module.exports = {
    uploadImg, uploadXlsx
}