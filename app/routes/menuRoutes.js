const express = require('express');
const router = express.Router();
const config = require('../config/config');
const authApp = require('../middleware/authMiddleware');
const multer = require('multer');
const imgFilter = require('../middleware/imageFilter');
const upload = multer({ dest: 'public/tmp/', fileFilter: imgFilter.imageFIlter });
const uploadData = upload.fields([{ name: 'fileData', maxCount: 1 }]);
const menuService = require('../services/menuServices');
const projectService = require('../services/projectService');
const reportService = require('../services/reportServices');

router.post('/upload', uploadData, authApp, menuService.uploadFile);
router.get('/project', authApp, projectService.index);
router.get('/project/show', authApp, projectService.show);
router.post('/project', authApp, projectService.store);
router.post('/aprove', authApp, projectService.aprove);
router.post('/report', authApp, reportService.store);

module.exports = router;