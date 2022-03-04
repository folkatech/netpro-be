const imageFIlter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(null, false);
    }
    return cb(null, true);
}

module.exports = imageFIlter;
