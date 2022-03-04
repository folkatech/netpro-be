async function register(req, res, next) {
    if (!req.body.name) {
        return res.json({
            success: false,
            messgae: "name can'nt by null",
        });
    }
    if (!req.body.email) {
        return res.json({
            success: false,
            messgae: "email can'nt by null",
        });
    }

    if (!req.body.password) {
        return res.json({
            success: false,
            messgae: "name can'nt by null",
        });
    }

    return next();
}

module.exports = {
    register
}