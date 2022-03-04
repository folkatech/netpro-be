const express = require('express');
const router = express.Router();
const config = require('../config/config');
const authApp = require('../middleware/authMiddleware');
const multer = require('multer');
const imgFilter = require('../middleware/imageFilter');
const upload = multer({ dest: 'public/tmp/', fileFilter: imgFilter.imageFIlter });
const uploadData = upload.fields([{ name: 'fileData', maxCount: 1 }]);
// get services
const boardService = require('../services/boardServices');
const menuService = require('../services/menuServices');

router.get('/board', authApp, boardService.index);
router.post('/board', authApp, boardService.store);
router.put('/board/:id', authApp, boardService.update);
router.delete('/board/:id', authApp, boardService.destroy);

router.get('/expand', authApp, menuService.index);
router.get('/witel', authApp, menuService.witel);
router.get('/sto/:id', authApp, menuService.sto);
router.get('/assets', authApp, menuService.assets);

module.exports = router;
