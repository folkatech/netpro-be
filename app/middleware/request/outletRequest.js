async function store(req, res, next) {
    if (!req.body.name) {
        return res.json({
            success: false,
            messgae: "name can'nt by null",
        });
    }

    if (!req.files.picture) {
        return res.json({
            success: false,
            messgae: "picture can'nt by null",
        });
    }

    if (!req.body.latitude || !req.body.longitude) {
        return res.json({
            success: false,
            messgae: "latitude or longitude can'nt by null or empty",
        });
    }

    return next();
}

async function update(req, res, next) {
     if (!req.body.name) {
        return res.json({
            success: false,
            messgae: "name can'nt by null",
        });
    }

    if (!req.body.latitude || !req.body.longitude) {
        return res.json({
            success: false,
            messgae: "latitude or longitude can'nt by null",
        });
    }
    return next();
}

module.exports = {
    store, update
}