const express = require('express'),
    router = express.Router(),
    loginServces = require('../services/loginServices');
const multer = require('multer');
const imgFilter = require('../middleware/imageFilter');
const upload = multer({ dest: 'public/tmp/', fileFilter: imgFilter.imageFIlter });
const uploadData = upload.fields([{ name: 'picture', maxCount: 2 }]);

// router list
router.post('/login', loginServces.login);

module.exports = router;