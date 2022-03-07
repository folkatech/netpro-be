const express = require('express'),
    router = express.Router(),
    loginServces = require('../services/loginServices');
const multer = require('multer');
const imgFilter = require('../middleware/imageFilter');
const upload = multer({ dest: 'public/tmp/', fileFilter: imgFilter.imageFIlter });
const uploadData = upload.fields([{ name: 'picture', maxCount: 2 }]);
const authApp = require('../middleware/authMiddleware');

// router list
router.post('/login', loginServces.login);
router.get('/profile', authApp, loginServces.profile);

module.exports = router;