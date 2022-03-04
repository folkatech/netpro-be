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

    if(!req.body.price || isNaN(req.body.price) ) {
        return res.json({
            success: false,
            messgae: "price can'nt by null and must by integer / float",
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

    if(!req.body.price || isNaN(req.body.price) ) {
        return res.json({
            success: false,
            messgae: "price can'nt by null and must by integer / float",
        });
    }
    return next();
}

module.exports = {
    store, update
}