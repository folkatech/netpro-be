const express = require('express');
const router = express.Router();
const config = require('../config/config');
const authApp = require('../middleware/authMiddleware');
const multer = require('multer');
const imgFilter = require('../middleware/imageFilter');
const upload = multer({ dest: 'public/tmp/', fileFilter: imgFilter.imageFIlter });
const uploadData = upload.fields([{ name: 'fileData', maxCount: 1 }]);
const menuService = require('../services/menuServices');

router.post('/upload', uploadData, authApp, menuService.uploadFile);


module.exports = router;